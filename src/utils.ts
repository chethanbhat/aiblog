import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2023-06-13",
  useCdn: true,
  token: import.meta.env.VITE_SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source: any) => builder.image(source);

// Queries

// Get Categories
export const getCategoriesQuery = `*[_type == "categories"]`;

// Get Keywords
export const getKeywordsQuery = `*[_type == "keywords"]`;

// Get Topics
export const getTopicsQuery = `*[_type == "topics"]`;

// Get Blog
export const getBlogQuery = `*[_type == "blog"]`;
