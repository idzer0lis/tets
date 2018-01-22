const API_ROOT_URL = process.env.API_ROOT_URL || '';

export const loadProject = async ({ commit }, {
  trackerCode, $http,
}) => {
  commit('START_GLOBAL_ACTION', null, { root: true });

  try {
    const { body } = await $http.get(API_ROOT_URL + '/api/project/details/' + trackerCode);
    if (body.success) {
      commit('LOAD_PROJECT', { project: body.payload });
    } else {
      return Promise.reject(new Error(body.message));
    }
  } catch (err) {
    return Promise.reject(new Error('An error has occurred! Please try again!'));
  }

  commit('END_GLOBAL_ACTION', null, { root: true });
};

export const loadSearchProjects = async ({ commit }, {
  filter, page, offset, limit, $http,
}) => {
  commit('START_GLOBAL_ACTION', null, { root: true });
  try {
    const { body } = await $http.get(API_ROOT_URL + `/api/listing/projects?filter=${encodeURIComponent(filter)}&page=${encodeURIComponent(page)}&offset=${encodeURIComponent(offset)}&limit=${encodeURIComponent(limit)}`);
    if (body.success) {
      commit('LOAD_SEARCH_PROJECTS', { searchProjects: body.payload });
    } else {
      return Promise.reject(new Error(body.message));
    }
  } catch (err) {
    return Promise.reject(new Error('An error has occurred! Please try again!'));
  }

  commit('END_GLOBAL_ACTION', null, { root: true });
};


export const loadRecommendedProjects = async ({ commit }, {
  $http,
}) => {
  commit('START_GLOBAL_ACTION', null, { root: true });

  try {
    const { body } = await $http.get(API_ROOT_URL + `/api/listing`);
    if (body.success) {
      commit('LOAD_RECOMMENDED_PROJECTS', { recommendedProjects: body.payload });
    } else {
      return Promise.reject(new Error(body.message));
    }
  } catch (err) {
    return Promise.reject(new Error('An error has occurred! Please try again!'));
  }

  commit('END_GLOBAL_ACTION', null, { root: true });
};

