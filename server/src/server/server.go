package main

import "net/http"
import "encoding/json"
import "log"
import "os"
import "fmt"
import "strings"
import "io/ioutil"

import "github.com/dimfeld/httptreemux"

// make a config struc or pull your vars from a file or however you want, these are here as an example
var wwwRoot = "./browser/dist/"
var domain = "localhost"
var httpPort = "3000"

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

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

func apiGetEventListHandler(w http.ResponseWriter, r *http.Request, params map[string]string) {
  log.Printf("Get event list")
  enableCors(&w)

  files, err := ioutil.ReadDir("./")
  if err != nil {
    http.Error(w, err.Error(), 500)
    return
  }

  fmt.Fprintf(w, "[")

  flag := false
  for _, f := range files {
    name := f.Name()
    if (strings.HasPrefix(name, "event_")){
      id := strings.TrimPrefix(name, "event_")
      id = strings.TrimSuffix(id, ".json")
      name = strings.Replace(id, "_", " ", -1)
      if(flag) {
        fmt.Fprintf(w, ",{\"id\": \"%s\", \"name\": \"%s\"}", id, name)
      } else {
        fmt.Fprintf(w, "{\"id\": \"%s\", \"name\": \"%s\"}", id, name)
        flag = true
      }
    }
  }
  fmt.Fprintf(w, "]")
  w.Header().Set("content-type", "application/json")
}

func apiGetEventHandler(w http.ResponseWriter, r *http.Request, params map[string]string) {
  enableCors(&w)
  log.Printf("Load event")
  id := r.URL.Query()["id"][0]
  name := "event_" + id + ".json"
  http.ServeFile(w, r, name)
}

func apiPostEventHandler(w http.ResponseWriter, r *http.Request, params map[string]string) {
  enableCors(&w)
  log.Printf("Save event")
  
  // read body
  b, err := ioutil.ReadAll(r.Body)
  defer r.Body.Close()
  if err != nil {
    http.Error(w, err.Error(), 500)
    return
  }

  // Unmarshal
  var result map[string]interface{}
  err = json.Unmarshal(b, &result)
  if err != nil {
    http.Error(w, err.Error(), 500)
    return
  }

  // Save to fs
  var name string = "event_" + result["id"].(string) + ".json"
  err = ioutil.WriteFile(name, b, 0644)
  if err != nil {
    http.Error(w, err.Error(), 500)
    return
  }

  fmt.Fprintf(w, "Saved")
}

func apiGetMatchlist(w http.ResponseWriter, r *http.Request, params map[string]string) {
  enableCors(&w)
  log.Printf("Generate Matchlist")

  matchesPerTeam := r.URL.Query()["matchesPerTeam"]
  numberTeams := r.URL.Query()["numberTeams"][0]

  cmd := ""
  if runtime.GOOS == "linux" {
    cmd += "wine "
  }

  cmd += "./MatchMaker.exe -a 2 -t " + numberTeams + " -r " + matchesPerTeam + " -o -s"
}

func main() {
  log.Printf("Starting Iowa Score System Server")
  log.Printf("Listening for HTTP connections at: http://%v:%v", domain, httpPort)

  router := httptreemux.New()
  router.GET("/", indexHandler)
  router.GET("/*", staticHandler)
  router.GET("/healthcheck", healthCheckHandler)
  router.GET("/api/*", apiTerminationHandler)
  router.GET("/api/event/list", apiGetEventListHandler)
  router.GET("/api/event", apiGetEventHandler)
  router.POST("/api/event", apiPostEventHandler)

  router.GET("/api/endpointname", healthCheckHandler)
  router.GET("/api/endpointname/:id", healthCheckHandler)

  if err := http.ListenAndServe(":"+httpPort, router); err != nil {
    log.Fatalf("ListenAndServe error: %v", err)
  }
}