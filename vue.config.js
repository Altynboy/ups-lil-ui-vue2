const path = require("path");

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias.set("@", path.resolve(__dirname, "src/"));
    config.module
      .rule("svg")
      .exclude.add(path.resolve(__dirname, "src/assets/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, "src/assets/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      });
  },
  publicPath: process.env.NODE_ENV === "production" ? "./src/assets/" : "./",
};
