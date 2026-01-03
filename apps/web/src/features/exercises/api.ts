import { fetchApi, safetry } from "@lift-logic/utils";
import type { Exercise, ExerciseInput, ApiExercise } from "@lift-logic/types";

const API_BASE = "http://localhost:3000";

const exerciseTransformer = {
  fromAPI: (apiExercise: ApiExercise): Exercise => ({
    id: apiExercise._id,
    title: apiExercise.title,
    thumbnailUrl: apiExercise.thumbnail_url,
    videoUrl: apiExercise.video_url,
    description: apiExercise.description,
    createdAt: new Date(apiExercise.created_at),
    updatedAt: new Date(apiExercise.updated_at),
  }),
};

export async function getExercises(): Promise<Exercise[]> {
  const [fetchError, data] = await safetry(fetchApi<{ exercises: ApiExercise[] }>(`${API_BASE}/api/exercises`));
  if (fetchError) {
    throw new Error(`Failed to fetch exercises: ${fetchError.message}`);
  }

  const [transformError, exercises] = safetry(() => data.exercises.map(exerciseTransformer.fromAPI));
  if (transformError) {
    throw new Error(`Failed to transform exercises: ${transformError.message}`);
  }

  return exercises;
}

export async function getExercise(id: string): Promise<Exercise> {
  const [fetchError, apiExercise] = await safetry(fetchApi<ApiExercise>(`${API_BASE}/api/exercises/${id}`));
  if (fetchError) {
    throw new Error(`Failed to fetch exercise: ${fetchError.message}`);
  }

  const [transformError, exercise] = safetry(() => exerciseTransformer.fromAPI(apiExercise));
  if (transformError) {
    throw new Error(`Failed to transform exercise: ${transformError.message}`);
  }

  return exercise;
}

export async function createExercise(input: ExerciseInput): Promise<Exercise> {
  const payload: Record<string, string> = {
    title: input.title,
    description: input.description,
  };

  if (input.thumbnailUrl) {
    payload.thumbnailUrl = input.thumbnailUrl;
  }

  if (input.videoUrl) {
    payload.videoUrl = input.videoUrl;
  }

  const [fetchError, apiExercise] = await safetry(
    fetchApi<ApiExercise>(`${API_BASE}/api/exercises`, {
      method: "POST",
      body: JSON.stringify(payload),
    })
  );
  if (fetchError) {
    throw new Error(`Failed to create exercise: ${fetchError.message}`);
  }

  const [transformError, exercise] = safetry(() => exerciseTransformer.fromAPI(apiExercise));
  if (transformError) {
    throw new Error(`Failed to transform exercise: ${transformError.message}`);
  }

  return exercise;
}

export async function updateExercise(id: string, input: ExerciseInput): Promise<Exercise> {
  const payload: Record<string, string> = {
    title: input.title,
    description: input.description,
  };

  if (input.thumbnailUrl) {
    payload.thumbnailUrl = input.thumbnailUrl;
  }

  if (input.videoUrl) {
    payload.videoUrl = input.videoUrl;
  }

  const [fetchError, apiExercise] = await safetry(
    fetchApi<ApiExercise>(`${API_BASE}/api/exercises/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    })
  );
  if (fetchError) {
    throw new Error(`Failed to update exercise: ${fetchError.message}`);
  }

  const [transformError, exercise] = safetry(() => exerciseTransformer.fromAPI(apiExercise));
  if (transformError) {
    throw new Error(`Failed to transform exercise: ${transformError.message}`);
  }

  return exercise;
}

export async function deleteExercise(id: string): Promise<void> {
  const [error] = await safetry(
    fetchApi(`${API_BASE}/api/exercises/${id}`, {
      method: "DELETE",
    })
  );
  if (error) {
    throw new Error(`Failed to delete exercise: ${error.message}`);
  }
}
