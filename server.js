const server = require("express")();
const path = require("path");

const { removeHeaders } = require("./middleware/headers");
const indexRoute = require("./routes/indexRoute");
const apiRoute = require("./routes/apiRoute");

server.use(require("express").static(path.resolve(__dirname, "public")));
server.use("/", removeHeaders, indexRoute);
server.use("/api", apiRoute);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Server started on port", PORT));
