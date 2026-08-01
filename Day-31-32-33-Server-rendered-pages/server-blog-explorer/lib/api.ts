import { Album } from "@/types/album";
import { Post } from "@/types/post";
import { User } from "@/types/user";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function getPosts(): Promise<Post[]>  {
  const response = await fetch(`${BASE_URL}/posts`);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
}

export async function getPost(id: string): Promise<Post> {
  const response = await fetch(`${BASE_URL}/posts/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }

  return response.json();
}

export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${BASE_URL}/users`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}

export async function getAlbums(): Promise<Album[]> {
  const response = await fetch(`${BASE_URL}/albums`);

  if (!response.ok) {
    throw new Error("Failed to fetch albums");
  }

  return response.json();
}