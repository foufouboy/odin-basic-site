const http = require("node:http");
const fs = require("node:fs/promises");

const hostname = "127.0.0.1";
const port = 2509;
const server = http.createServer((req, res) => {
    const page = getPage(req.url);

    (async () => {
        try {
            const data = await fs.readFile(page, { encoding: "utf8" });  
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(data);
            res.end();
        } catch (e) {
            console.error(e);
        }
    })();

});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});

function getPage(url) {
    url = url.replaceAll("/", "");

    switch(url) {
        case "":
            return "index.html";
        case "contact-me": 
            return "contact-me.html";
        case "about":
            return "about.html";
        default:
            return "404.html";
    }
}

