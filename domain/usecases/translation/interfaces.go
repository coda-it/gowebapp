package translation

// IRepository - translations repository interface
type IRepository interface {
	FetchTranslation(lang string) map[string]string
}
