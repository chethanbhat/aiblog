import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

import { Configuration, OpenAIApi } from "openai";

export const openAIClient = new OpenAIApi(
  new Configuration({
    apiKey: import.meta.env.VITE_OPEN_API_KEY,
  })
);

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2023-06-13",
  useCdn: false,
  token: import.meta.env.VITE_SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source: any) => builder.image(source);

// Queries

// Get Categories
export const getCategoriesQuery = `*[_type == "categories"]`;

// Get Keywords
export const getKeywordsQuery = `*[_type == "keywords"] | order(_createdAt desc)`;

// Get Topics
export const getTopicsQuery = `*[_type == "topic"] | order(_createdAt desc){
  _id,
  title,
  category->{
    category
  },
  keywords[]->{
    _id,
    keyword
  }
}`;

// Get Topics by Category
export const getTopicsByCategoryQuery = (
  categoryID: string
) => `*[_type == "topic" && category._ref == "${categoryID}"] | order(_createdAt desc){
    _id,
    title,
    category->{
      category
    },
    keywords[]->{
      _id,
      keyword
    }
  }`;
// Get Topic by ID
export const getTopicByIDQuery = (topicID: string) => {
  return `*[_type == "topic" && _id == "${topicID}"]{
    _id,
    title,
    category->{
      _id,
      category
    },
    keywords[]->{
      _id,
      keyword
    }
  } `;
};

// Get Blog
export const getBlogQuery = `*[_type == "blog"]`;
