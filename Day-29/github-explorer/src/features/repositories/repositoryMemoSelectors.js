
import { selectRepositoryLanguage, selectRepositorySearch, selectRepositorySort } from "./repositoryFilterSelector";

import { createSelector } from "@reduxjs/toolkit";
import { selectRepositories } from "./repositorySelector";



export const selectFilteredRepositories = createSelector(
  [
    selectRepositories,
    selectRepositorySearch,
    selectRepositoryLanguage,
    selectRepositorySort,
  ],
  (repositories = [], search = "", language = "all", sort = "default") => {
    const normalizedSearch = String(search ?? "").trim().toLowerCase();
    let filteredRepositories = Array.isArray(repositories)
      ? [...repositories]
      : [];

    filteredRepositories = filteredRepositories.filter((repo) => {
      const repoName = repo?.name ?? "";
      return repoName.toLowerCase().includes(normalizedSearch);
    });

    if (language !== "all") {
      filteredRepositories = filteredRepositories.filter((repo) => {
        const repoLanguage = repo?.language ?? "";
        return repoLanguage.toLowerCase() === String(language).toLowerCase();
      });
    }

    switch (sort) {
      case "stars":
        filteredRepositories.sort(
          (a, b) => (b?.stargazers_count ?? 0) - (a?.stargazers_count ?? 0)
        );
        break;

      case "forks":
        filteredRepositories.sort(
          (a, b) => (b?.forks_count ?? 0) - (a?.forks_count ?? 0)
        );
        break;

      case "updated":
        filteredRepositories.sort(
          (a, b) => new Date(b?.updated_at ?? 0) - new Date(a?.updated_at ?? 0)
        );
        break;

      case "name":
        filteredRepositories.sort((a, b) =>
          (a?.name ?? "").localeCompare(b?.name ?? "")
        );
        break;

      default:
        break;
    }

    return filteredRepositories;
  }
);
