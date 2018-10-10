all: server-linux server-windows.exe public 

server-linux: server/src/server/server.go
	env GOOS=linux GOARCH=amd64 go build -o $@ -ldflags="-s -w" $<

server-windows.exe: server/src/server/server.go
	env GOOS=windows GOARCH=386 go build -o $@ -ldflags="-s -w" $<

public: 
	mkdir -p public
	cp -R browser/dist/* public/

clean: 
	rm server-linux server-windows