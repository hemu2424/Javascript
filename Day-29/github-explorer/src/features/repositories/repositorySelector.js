export const selectRepositories = (state) => state.repositories.repositories;

export const selectRepository = (state) => state.repositories.repository;

export const selectRepositoryLoading = (state) =>
  state.repositories.loading;

export const selectRepositoryError = (state) =>
  state.repositories.error;