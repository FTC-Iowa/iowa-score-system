package main

import "net/http"
import "log"
import "os"
import "fmt"
import "strings"

import "github.com/dimfeld/httptreemux"

// make a config struc or pull your vars from a file or however you want, these are here as an example
var wwwRoot = "../../browser/dist/"
var domain = "localhost"
var httpPort = "8080"


// Serve your index file
func indexHandler(w http.ResponseWriter, r *http.Request, params map[string]string) {
  http.ServeFile(w, r, wwwRoot+"index.html")
}

// Handle Static Files (files containing a .extension)
// Send a not found error for any requests containing a .extension where the file does not exist
// Redirect any requests that were not for files to your to your SPA
func staticHandler(w http.ResponseWriter, r *http.Request, params map[string]string) {
  requestPath := r.URL.Path
  fileSystemPath := wwwRoot + r.URL.Path
  endURIPath := strings.Split(requestPath, "/")[len(strings.Split(requestPath, "/"))-1]
  splitPath := strings.Split(endURIPath, ".")
  if len(splitPath) > 1 {
    if f, err := os.Stat(fileSystemPath); err == nil && !f.IsDir() {
      http.ServeFile(w, r, fileSystemPath)
      return
    }
    http.NotFound(w, r)
    return
  }
  http.ServeFile(w, r, wwwRoot+"index.html")
}

// Handle a simple healthcheck url for loadbalancers or whatnot
func healthCheckHandler(w http.ResponseWriter, r *http.Request, params map[string]string) {
  fmt.Fprintf(w, "OK!\r")
}

// Terminate any API requests that are not defined, so that calls to /api do not respond from your SPA
func apiTerminationHandler(w http.ResponseWriter, r *http.Request, params map[string]string) {
  http.NotFound(w, r)
}

func main() {
  log.Printf("Starting Ember Frontend Server")
  log.Printf("Listening for HTTP connections at: http://%v:%v", domain, httpPort)

  router := httptreemux.New()
  router.GET("/", indexHandler)
  router.GET("/*", staticHandler)
  router.GET("/healthcheck", healthCheckHandler)
  router.GET("/api/*", apiTerminationHandler)
  router.GET("/api/endpointname", healthCheckHandler)
  router.GET("/api/endpointname/:id", healthCheckHandler)

  if err := http.ListenAndServe(":"+httpPort, router); err != nil {
    log.Fatalf("ListenAndServe error: %v", err)
  }
}