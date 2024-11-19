import React from 'react';
import { Trash2 } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const IdeaList: React.FC = () => {
  const ideas = useStore((state) => state.ideas);
  const removeIdea = useStore((state) => state.removeIdea);

  return (
    <div className="space-y-4">
      {ideas.map((idea) => (
        <div
          key={idea.id}
          className="bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-200">{idea.title}</h3>
              <p className="mt-1 text-gray-400">{idea.description}</p>
              <p className="mt-2 text-sm text-gray-500">
                {new Date(idea.createdAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => removeIdea(idea.id)}
              className="text-gray-400 hover:text-red-400 transition-colors"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};