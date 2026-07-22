import { BASE_URL, PAGE_SIZE } from "../utils/constants";

const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;

async function fetchNews(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch news");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getTopHeadlines(page = 1) {
  return fetchNews(
    `${BASE_URL}/top-headlines?category=general&lang=en&page=${page}&max=${PAGE_SIZE}&apikey=${API_KEY}`
  );
}

export async function getNewsByCategory(category,page=1) {
  return fetchNews(
    `${BASE_URL}/top-headlines?category=${category}&lang=en&page=${page}&max=${PAGE_SIZE}&apikey=${API_KEY}`
  );
}

export async function searchNews(query,page=1) {
  return fetchNews(
    `${BASE_URL}/search?q=${query}&lang=en&page=${page}&max=${PAGE_SIZE}&apikey=${API_KEY}`
  );
}