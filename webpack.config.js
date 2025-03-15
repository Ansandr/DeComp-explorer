const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true, // Очищає папку dist перед збіркою
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
        }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'], // для обробки CSS
        },
        {
          test: /\.js$/,
          exclude: /node_modules/, // Виключаємо папку node_modules
          use: {
            loader: 'babel-loader', // Використовуємо babel-loader для транспіляції
            options: {
              presets: ['@babel/preset-env'], // Використовуємо preset-env для підтримки сучасних стандартів JavaScript
            },
          },
        },
      ],
    },
    devServer: {
        static: "./dist",
        open: true, // Автоматично відкриває браузер
        port: 8080,
    },
};