interface ApiExercise {
  _id: string;
  title: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  description: string;
}

export interface Exercise {
  id: string;
  title: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  description: string;
}

export const exerciseTransformer = {
  fromAPI(apiData: ApiExercise): Exercise {
    return {
      id: apiData._id,
      title: apiData.title,
      thumbnailUrl: apiData.thumbnailUrl,
      videoUrl: apiData.videoUrl,
      description: apiData.description,
    };
  },

  listFromAPI(apiData: ApiExercise[]): Exercise[] {
    return apiData.map((exercise) => exerciseTransformer.fromAPI(exercise));
  },
};
