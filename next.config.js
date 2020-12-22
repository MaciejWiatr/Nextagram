const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});
module.exports = withBundleAnalyzer({
    images: {
        domains: ["127.0.0.1"],
    },
});
