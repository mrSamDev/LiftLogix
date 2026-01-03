import { useState } from "react";
import type { Exercise, ExerciseInput } from "@lift-logic/types";

interface CreateExerciseFormProps {
  onCancel: () => void;
  onCreate: (input: ExerciseInput) => void;
  exercise?: Exercise;
}

export function CreateExerciseForm({
  onCancel,
  onCreate,
  exercise,
}: CreateExerciseFormProps) {
  const [title, setTitle] = useState(exercise?.title || "");
  const [thumbnailUrl, setThumbnailUrl] = useState(exercise?.thumbnailUrl || "https://placehold.co/600x400");
  const [videoUrl, setVideoUrl] = useState(exercise?.videoUrl || "");
  const [description, setDescription] = useState(exercise?.description || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const input: ExerciseInput = {
      title,
      thumbnailUrl,
      videoUrl,
      description,
    };

    onCreate(input);
  };

  return (
    <div className="p-8">
      <h2 className="mb-8 border-b-4 border-black pb-4 text-2xl font-bold uppercase tracking-tight">
        {exercise ? "Edit Exercise" : "New Exercise"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border-4 border-black bg-white px-4 py-3 font-bold outline-none focus:bg-lime-400"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider">
            Thumbnail URL
          </label>
          <input
            type="url"
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
            required
            className="w-full border-4 border-black bg-white px-4 py-3 font-bold outline-none focus:bg-lime-400"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider">
            Video URL
          </label>
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            required
            className="w-full border-4 border-black bg-white px-4 py-3 font-bold outline-none focus:bg-lime-400"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={6}
            className="w-full border-4 border-black bg-white px-4 py-3 font-bold outline-none focus:bg-lime-400"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 border-4 border-black bg-lime-400 px-6 py-3 font-bold uppercase tracking-tight transition-all hover:translate-x-1 hover:translate-y-1 active:translate-x-0 active:translate-y-0"
          >
            {exercise ? "Update" : "Create"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border-4 border-black bg-white px-6 py-3 font-bold uppercase tracking-tight transition-all hover:translate-x-1 hover:translate-y-1 active:translate-x-0 active:translate-y-0"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
