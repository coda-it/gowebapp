GOCMD=go
GOLINT=golint
GOFMT=gofmt
MAKE=make
NPM=npm
ENV=prod
FULL_IMAGE_NAME=oszura/$(IMAGE_NAME)

.DEFAULT_GOAL := all

WEBAPP_MONGO_URI=mongodb://localhost:27017
WEBAPP_MONGO_DB=webapp
WEBAPP_HTTP_PORT=3000

.PHONY: install
install:
	$(shell cd /; $(GOCMD) get -u golang.org/x/lint/golint)
	$(GOCMD) mod vendor
	$(NPM) install

.PHONY: all
all:
	$(MAKE) build-frontend
	$(MAKE) build-backend

.PHONY: build-frontend
build-frontend:
	$(NPM) run build:$(ENV)

.PHONY: build-backend
build-backend:
	$(GOCMD) build -mod=vendor -o gowebapp

.PHONY: test
test:
	$(NPM) run test
	$(GOCMD) test -mod=vendor ./...

.PHONY: integration-test
integration-test:
	$(NPM) run cypress:run

.PHONY: lint
lint:
	$(NPM) run tsc
	$(NPM) run lint
	$(NPM) run csslint
	./scripts/gofmt_test.sh
	$(GOLINT) ./... | grep -v vendor/ && exit 1 || exit 0
	$(GOCMD) vet -mod=vendor ./... | grep -v vendor/ && exit 1 || exit 0

.PHONY: fix
fix:
	$(NPM) run prettify
	$(NPM) run lint:fix
	$(NPM) run csslint:fix
	$(GOFMT) -w .

.PHONY: run
run:
	WEBAPP_MONGO_URI=$(WEBAPP_MONGO_URI) \
	WEBAPP_MONGO_DB=$(WEBAPP_MONGO_DB) \
	WEBAPP_HTTP_PORT=$(WEBAPP_HTTP_PORT) \
	./gowebapp

### Containerization
.PHONY: image
image:
ifdef ENV
	docker build --tag $(FULL_IMAGE_NAME)-$(ENV):$(V) --file=./docker/$(IMAGE_NAME)/$(ENV)/Dockerfile .
else
	docker build --tag $(FULL_IMAGE_NAME):$(V) --file=./docker/$(IMAGE_NAME)/Dockerfile .
endif

.PHONY: run-services
run-services:
	cd docker/webapp/dev && docker-compose --verbose up

### Utilities
.PHONY: version
version:
	git tag $(V)
	./scripts/changelog.sh
	go generate
	$(NPM) version $(V) --no-git-tag-version
	git add package.json
	git add package-lock.json
	sed -i "" "s/APP_VERSION:.*/APP_VERSION: $(V)/g" ./github/workflows/test.yml
	git add ./github/workflows/test.yml
	sed -i "" "s/APP_VERSION:.*/APP_VERSION: $(V)/g" ./github/workflows/build.yml
	git add ./github/workflows/build.yml
	git add ./version.go || true
	git add ./docs/changelogs/CHANGELOG_$(V).md
	git commit --allow-empty -m "Build $(V)"
	git tag --delete $(V)
	git tag $(V)
