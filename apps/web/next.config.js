const path = require("path");
const withTM = require("next-transpile-modules")(["@repo/ui"]);

module.exports = withTM({
  reactStrictMode: true,
});

module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
};
