const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

const dev_domains = ["", "127.0.0.1"];

const prod_domains = [process.env.NEXT_PUBLIC_BACKEND_ROOT];

module.exports = withBundleAnalyzer({
    images: {
        domains:
            !process.env.NODE_ENV || process.env.NODE_ENV === "development"
                ? dev_domains
                : prod_domains,
    },
});
