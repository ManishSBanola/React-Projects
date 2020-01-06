const path = require("path");
const express = require("express");
const port = process.env.PORT || 8081;
const app = express();

app.use(express.static(__dirname + "/dist"));

app.get(`*`, (req, res) => {
  res.sendFile(path.resolve(__dirname, "./dist/index.html"));
  console.log(__dirname, "dirname");
});
app.listen(port);
console.log("server started");
