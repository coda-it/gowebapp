package utils

import "os"

// IsTestEnv - check is application running in test ENV
func IsTestEnv() bool {
	return os.Getenv("WEBAPP_ENV") == "test"
}
