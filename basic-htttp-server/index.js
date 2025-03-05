const http = require("http");
const url = require("url");
const fs = require("fs").promises;
const { v4: uuid } = require("uuid");

const slideshow = require("./slideshow.json");
const port = 8080;

function handleHtml(req, res) {
  fs.readFile("./webpage.html", {
    encoding: "utf-8",
  })
    .then((htmlContent) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(htmlContent);
    })
    .catch((error) => {
      console.error("Error reading HTML file:", error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Unexpected Error");
    });
}

function handleJson(req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(slideshow));
}

function handleUuid(req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  const id = uuid();
  res.end(JSON.stringify({ uuid: id }));
}

function handleStatus(req, res, path) {
  const parts = path.split("/");
  const statusCode = Number(parts[2]) || 200;
  res.writeHead(statusCode, { "Content-Type": "text/plain" });
  res.end(`The response code is ${statusCode}`);
}

function handleDelay(req, res, path) {
  const parts = path.split("/");
  const delay = Number(parts[2]) || 0;
  res.writeHead(200, { "Content-Type": "text/plain" });
  setTimeout(() => {
    try {
      res.end(`Response after ${delay} seconds.`);
    } catch (error) {
      console.error("Error in delayed response:", error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Unexpected Error");
    }
  }, delay * 1000);
}

async function requestListener(req, res) {
  try {
    if (req.method !== "GET") {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Only GET requests allowed.");
      return;
    }

    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.path;

    if (path === "/html") {
      await handleHtml(req, res);
    } else if (path === "/json") {
      handleJson(req, res);
    } else if (path === "/uuid") {
      handleUuid(req, res);
    } else if (path.startsWith("/status/")) {
      handleStatus(req, res, path);
    } else if (path.startsWith("/delay/")) {
      handleDelay(req, res, path);
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  } catch (error) {
    console.error("Error in request handler:", error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Unexpected Error");
  }
}

http.createServer(requestListener).listen(port, () => {
  console.log(`Server started at port ${port}`);
});
