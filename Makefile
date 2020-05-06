GOCMD=go
GOLINT=golint
GOFMT=gofmt
MAKE=make
NPM=npm
mode=prod

.DEFAULT_GOAL := all

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
	$(NPM) rebuild node-sass
	$(NPM) run build:$(mode)

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
	$(NPM) run flow
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
	GOWEBAPP_HTTP_PORT=3000 \
	./gowebapp

.PHONY: version
version:
	git tag $(V)
	./scripts/changelog.sh
	go generate
	$(NPM) version $(V) --no-git-tag-version
	git add package.json
	git add ./version.go || true
	git add ./docs/changelogs/CHANGELOG_$(V).md
	git commit --allow-empty -m "Build $(V)"
	git tag --delete $(V)
	git tag $(V)

.PHONY: build-image
build-image:
	docker build --no-cache --tag oszura/sh-panel --file=Dockerfile .

.PHONY: build-image-soft
build-image-soft:
	docker build --tag oszura/sh-panel --file=Dockerfile .
