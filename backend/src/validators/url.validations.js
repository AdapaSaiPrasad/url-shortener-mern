
import {z} from "zod";
const createShortUrlSchema = z.object({
  originalUrl: z.string().url("Please provide a valid URL"),
  customAlias:z.string().optional()
});

export {
  createShortUrlSchema
};