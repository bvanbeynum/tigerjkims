import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
		entry: {
				moreInfo: "./client/src/moreinfo.jsx"
		},
		plugins: [
				new HtmlWebpackPlugin({ 
						filename: "index.html",
						favicon: "./client/static/media/favicon.ico",
						chunks: [ "moreInfo" ],
						template: "./client/src/index.html"
				}),
				new HtmlWebpackPlugin({ 
						filename: "adultstkd.html",
						favicon: "./client/static/media/favicon.ico",
						chunks: [ "moreInfo" ],
						template: "./client/src/adultstkd.html"
				}),
				new HtmlWebpackPlugin({ 
						filename: "familiestkd.html",
						favicon: "./client/static/media/favicon.ico",
						chunks: [ "moreInfo" ],
						template: "./client/src/familiestkd.html"
				}),
				new HtmlWebpackPlugin({ 
						filename: "kidstkd.html",
						favicon: "./client/static/media/favicon.ico",
						chunks: [ "moreInfo" ],
						template: "./client/src/kidstkd.html"
				}),
				new HtmlWebpackPlugin({ 
						filename: "littletigerstkd.html",
						favicon: "./client/static/media/favicon.ico",
						chunks: [ "moreInfo" ],
						template: "./client/src/littletigerstkd.html"
				}),
				new HtmlWebpackPlugin({ 
						filename: "masterjkim.html",
						favicon: "./client/static/media/favicon.ico",
						chunks: [ "moreInfo" ],
						template: "./client/src/masterjkim.html"
				}),
				new HtmlWebpackPlugin({ 
						filename: "testimonials.html",
						favicon: "./client/static/media/favicon.ico",
						chunks: [ "moreInfo" ],
						template: "./client/src/testimonials.html"
				})
		],
		module: {
				rules: [
						{
								test: /\.(js|jsx)$/i,
								exclude: /(node_modules|bower_components)/i,
								loader: "babel-loader",
								options: { presets: [ "@babel/env" ]}
						},
						{
								test: /\.css$/i,
								use: [
									"style-loader",
									{
										loader: "css-loader",
										options: { url: false }
									} 
								]
						},
						{
								test: /\.(png|gif|jpg|ico)$/i,
								type: "asset/resource"
						}
				]
		},
		resolve: { extensions: [ "*", ".js", ".jsx" ]}
};
