require("dotenv").config();
const app = require("./app");
const http = require("http");

// create server
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

// listening server
server.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
