import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2023-06-13",
  useCdn: true,
  token: import.meta.env.VITE_SANITY_API_TOKEN,
});

console.log("TEST");

const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source: any) => builder.image(source);
