export const selectRepositorySearch = (state) =>{
    return state.repositoryFilter.search;
}
export const selectRepositorySort = (state) =>{
    return state.repositoryFilter.sortBy;
}
export const selectRepositoryLanguage = (state) =>{
    return state.repositoryFilter.language;
}
export const selectRepositoryFilters = (state) =>{
    return state.repositoryFilter
}