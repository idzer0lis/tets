export const LOAD_PROJECT = (state, {project}) => {
  state.projectName = project.project_name;
  state.tokenName = project.published_token_name;
  state.trackerCode = project.published_tracker_code;
  state.logoThumbnail = project.published_project_logo_thumbnail;
  state.pageContents = project.page_contents || {};
  state.teamMembers = project.page_contents.teamMembers || [];
  /*
  [
    {
      name: 'John Doe',
      title: 'Big Kahuna',
      bio: 'He\'s a burger',
      social_media_linkedin: '',
      social_media_instagram: '',
      social_media_facebook: '',
      social_media_twitter: '',
    },
    {
      name: 'Cat Son',
      title: 'Son of Cat',
      bio: 'He\'s a son of a gun',
      social_media_linkedin: '',
      social_media_instagram: '',
      social_media_facebook: '',
      social_media_twitter: '',
    },
  ];
  */
};

export const LOAD_SEARCH_PROJECTS = (state, {searchProjects}) => {
  const { items = [], count = 0 } = searchProjects || {};
  state.searchProjects = items;
  state.searchProjectsTotal = count;
};

export const LOAD_RECOMMENDED_PROJECTS = (state, {recommendedProjects}) => {
  state.recommendedProjects = recommendedProjects.length > 0 ? recommendedProjects : [];
};
