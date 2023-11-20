module.exports = {
  async redirects() {
    return [
      {
        source: "/:slug",
        destination: "https://vbonews.com/:slug",
        permanent: true,
        has: [
          {
            type: "header",
            key: "user-agent",
            value: "(^(?!.*facebook).*$)",
          },
        ],
      },
      {
        source: "/doc-bao/:slug",
        destination: "https://vbonews.com/doc-bao/:slug",
        permanent: true,
        has: [
          {
            type: "header",
            key: "user-agent",
            value: "(^(?!.*facebook).*$)",
          },
        ],
      },
    ];
  },
};
