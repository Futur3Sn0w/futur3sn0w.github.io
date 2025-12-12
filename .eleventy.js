module.exports = function (eleventyConfig) {
    // Passthrough static assets so Eleventy doesn't try to process them
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("scripts");
    eleventyConfig.addPassthroughCopy("external");
    eleventyConfig.addPassthroughCopy("img");
    eleventyConfig.addPassthroughCopy("music");
    eleventyConfig.addPassthroughCopy("projects");
    eleventyConfig.addPassthroughCopy("futur3sn0w");
    eleventyConfig.addPassthroughCopy("roundr");
    eleventyConfig.addPassthroughCopy("vercel.json");

    // Re-run build when CSS/JS change
    eleventyConfig.addWatchTarget("css");
    eleventyConfig.addWatchTarget("scripts");

    return {
        dir: {
            input: "src",
            includes: "_includes",
            data: "_data",
            output: "_site"
        },
        templateFormats: ["njk", "html", "md"],
        chokidarConfig: {
            usePolling: true,
            useFsEvents: false,
            interval: 500
        }
    };
};
