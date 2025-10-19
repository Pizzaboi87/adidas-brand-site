/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://weiser-adidas.vercel.app",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ["/not-found", "/api/*"],
  changefreq: "weekly",
  priority: 0.8,
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: "weekly",
      priority: path === "/" ? 1.0 : 0.8,
      lastmod: new Date().toISOString(),
    };
  },
};
