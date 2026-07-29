import api from "./axios";

export const getUser = (username) => {
  return api.get(`/users/${username}`);
};

export const getRepositories = (username) => {
  return api.get(`/users/${username}/repos`);
};

export const getRepository = (owner, repo) => {
  return api.get(`/repos/${owner}/${repo}`);
};
export const searchUsers = (query) => {
  return api.get(`/search/users?q=${query}`);
};