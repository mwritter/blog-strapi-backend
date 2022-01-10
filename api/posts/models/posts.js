"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

/**
 * @method saveImages
 * @description pulls all the images out of the markup
 * credit to msoler75 https://forum.strapi.io/t/markdown-content-with-media-images-info-saved-in-another-field/9994
 * @param {*} data
 */
const saveImages = async (data) => {
  const regexp = /!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/g;
  const images = data.content.matchAll(regexp);
  console.log(images);
  // images is a field with multiple media, we only need to store id's of upload files
  data.media = [];

  for (const src of images) {
    const img = await strapi.plugins.upload.services.upload.fetch({
      url: src[1],
    });
    if (img && img.id) data.media.push(img.id);
  }
};

const slugify = require("slugify");
module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      if (data.title) {
        data.slug = slugify(data.title.toLowerCase());
        await saveImages(data);
      }
    },
    beforeUpdate: async (params, data) => {
      console.log(data);
      if (data.title) {
        data.slug = slugify(data.title);
        await saveImages(data);
      }
    },
  },
};
