const { z } = require("zod");

const createShortUrlSchema = z.object({
  originalUrl: z
    .string()
    .url("Please provide a valid URL"),
});

module.exports = {
  createShortUrlSchema,
};