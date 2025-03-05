const http = require("http");
const url = require("url");
const fs = require("fs").promises;
const { v4: uuid } = require("uuid");

const slideshow = require("./slideshow.json");
const port = 8080;
http
  .createServer((req, res) => {
    try {
      let path = url.parse(req.url, true).path;
      if (req.method !== "GET") {
        res.writeHead(400, { "content-type": "text" });
        res.end("Only Get request allowed.");
      }

      if (path === "/html") {
        fs.readFile("./webpage.html", { encoding: "utf-8" })
          .then((htmlContent) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(htmlContent);
          })
          .catch((error) => {
            console.log(error);
            res.writeHead(500, { "content-type": "text/plain" });
            res.end("Unexpected Error");
          });
      } else if (path === "/json") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(slideshow));
      } else if (path === "/uuid") {
        res.writeHead(200, { "Content-Type": "application/json" });
        const id = uuid();
        res.end(JSON.stringify({ uuid: id }));
      } else if (path.startsWith("/status/")) {
        const [, , statusCode] = path.split("/");
        http.statusCode;
        res.writeHead(statusCode);
        res.end(`The response code is ${statusCode}`);
      } else if (path.startsWith("/delay/")) {
        const [, , delay] = path.split("/");
        res.writeHead(200, { "Content-Type": "text/plain" });
        setTimeout(() => {
          try {
            res.end(`response after ${delay} seconds.`);
          } catch (error) {
            console.log(error);
            res.writeHead(500, { "content-type": "text/plain" });
            res.end("Unexpected Error");
          }
        }, delay * 1000);
      }
    } catch (error) {
      console.error(error);

      res.writeHead(500, { "content-type": "text/plain" });
      res.end("Unexpected Error");
    }
  })
  .listen(port, () => {
    console.error(`Started the server at port ${port}`);
  });
