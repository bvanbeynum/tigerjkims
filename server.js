// Imports =======================================================================

import { fileURLToPath } from "url";
import path, { dirname } from "path";
import express from "express";
import bodyParser from "body-parser";
import config from "./server/config.js";
import api from "./server/api.js";

// Setup =======================================================================

const app = express();
const { json, urlencoded } = bodyParser;
const port = config.port;
const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = dirname(currentFile);

// Config =======================================================================

app.set("x-powered-by", false);
app.set("root", currentDirectory);
app.use(json());
app.use(urlencoded({ extended: true }));

// Routes =======================================================================

app.use(express.static(path.join(currentDirectory, "./client/static")));

if (config.mode === "development") {
	Promise.all([
			import("webpack"),
			import("webpack-dev-middleware"),
			import("./webpack.dev.js")
	])
	.then(([webpack, webpackDevMiddleware, webpackConfig]) => {
			const webpackLoader = webpack.default;
			const middleware = webpackDevMiddleware.default;

			const compilier = webpackLoader(webpackConfig.default);
			app.use(middleware(compilier, { publicPath: "/" }));
	});
}
else {
	app.use(express.static(path.join(currentDirectory, "./client/build")));
}

app.use("/api", api);

app.get("/robots.txt", (request, response) => {
	response.send(
		"User-Agent: *\r\n" +
		"Allow: *"
	);
});

// listen (start app with node server.js) ======================================

app.listen(port, () => {
	console.log("App listening on port " + port);
});
