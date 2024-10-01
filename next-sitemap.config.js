/** @type {import('next-sitemap').IConfig} */

export default {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,
  outDir: "dist",
  output: "export",
};
