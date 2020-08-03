package utils

const (
	// SessionKey - session key
	SessionKey = "webapp-sid"
)

// CreateSessionID - creates a new session ID
func CreateSessionID(user string, pass string, time string) string {
	return HashString(user + pass + time)
}
