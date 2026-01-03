interface ApiExercise {
  _id: string;
  title: string;
  thumbnail_url?: string;
  video_url?: string;
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
      thumbnailUrl: apiData.thumbnail_url,
      videoUrl: apiData.video_url,
      description: apiData.description,
    };
  },

  listFromAPI(apiData: ApiExercise[]): Exercise[] {
    return apiData.map((exercise) => exerciseTransformer.fromAPI(exercise));
  },
};
