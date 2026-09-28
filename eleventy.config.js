export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets", { filter: ["**/*", "!**/.gitkeep"] });
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    htmlTemplateEngine: "njk"
  };
};
