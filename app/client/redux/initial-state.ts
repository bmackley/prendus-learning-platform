export const InitialState = {
    currentUser: {
      uid: '',
      firstName: '',
      lastName: '',
      institution: '',
      email: '',
      permissions: '',
    },
    concepts: {
      concept: {},
      // uid: '',
      // title: '',
      // pos: 0,
      // creator: '',
      // subjects: [],
    },
    error: {
      message: '',
    },
    success: {
      message: '',
    },
    newConcept: '',
    deletedConcept: '',
    URL: '',
    conceptVideos: {},
    currentConceptVideoId: '',
    currentConceptVideoTitle: '',
    currentConceptVideoUrl: ''
};
