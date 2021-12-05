const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// less/less module 正则表达式
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");

module.exports = (env) => {
    return {
        mode: "development",
        // mode: "production",
        entry: {
            index: "./src/index.js",
        },
        output: {
            // 打包文件根目录
            path: path.resolve(__dirname, "dist/"),
        },
        resolve: {
            extensions: [".ts", ".js"], // 注意有个点，别看走眼
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
                    test: lessRegex,
                    exclude: lessModuleRegex,
                    use: [
                        "style-loader",
                        "css-loader",
                        "postcss-loader",
                        "less-loader",
                    ],
                    sideEffects: true,
                },
                {
                    test: lessModuleRegex,
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
            historyApiFallback: true,
        },
        cache: {
            type: "filesystem",
            // 可选配置
            buildDependencies: {
                config: [__filename], // 当构建依赖的config文件（通过 require 依赖）内容发生变化时，缓存失效
            },
            name: "development-cache",
        },
    };
};
