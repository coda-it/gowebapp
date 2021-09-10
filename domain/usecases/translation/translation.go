package translation

// Usecase - translations usecases
type Usecase struct {
	repository IRepository
}

// New - creates translactions usecases instance
func New(r IRepository) *Usecase {
	return &Usecase{
		r,
	}
}

// Fetch - fetch translation for particular language
func (u *Usecase) Fetch(lang string) map[string]string {
	return u.repository.FetchTranslation(lang)
}
