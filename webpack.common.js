const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");

module.exports = (env) => {
    return {
        mode: "development",
        entry: {
            index: "./src/index.js",
        },
        output: {
            // 打包文件根目录
            path: path.resolve(__dirname, "dist/"),
        },
        resolve: {
            extensions: [".ts", ".js"],
        },
        plugins: [
            // 生成 index.html
            new HtmlWebpackPlugin({
                filename: "index.html",
                template: "./public/index.html",
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.(jsx|js)?$/,
                    use: ["babel-loader"],
                    include: path.resolve(__dirname, "src"),
                },
                {
                    test: /\.less$/,
                    exclude: /\.module\.less$/,
                    use: [
                        "style-loader",
                        "css-loader",
                        "postcss-loader",
                        "less-loader",
                    ],
                    sideEffects: true,
                },
                {
                    test: /\.module\.less$/,
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                modules: {
                                    getLocalIdent: getCSSModuleLocalIdent,
                                },
                            },
                        },
                        "postcss-loader",
                        "less-loader",
                    ],
                },
                {
                    test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf|otf)$/i,
                    type: "asset/resource",
                },
            ],
        },
        devServer: {
            port: 3000,
            host: "0.0.0.0",
            historyApiFallback: true, // 可以直接通过 url 访问
        },
        cache: {
            type: "filesystem",
            // 可选配置
            buildDependencies: {
                config: [__filename], // 当构建依赖的 config 文件（通过 require 依赖）内容发生变化时，缓存失效
            },
            name: "development-cache",
        },
    };
};
