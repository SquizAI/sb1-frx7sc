import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SuggestionCardProps {
  suggestion: {
    category: string;
    title: string;
    description: string;
    impact: string;
    effort: string;
    priority: number;
  };
}

export const SuggestionCard: React.FC<SuggestionCardProps> = ({ suggestion }) => {
  const getPriorityColor = (priority: number) => {
    if (priority >= 8) return 'bg-red-500';
    if (priority >= 5) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            {suggestion.category}
          </span>
          <h3 className="text-lg font-medium text-purple-400 mt-1">{suggestion.title}</h3>
        </div>
        <div className={`w-8 h-8 rounded-full ${getPriorityColor(suggestion.priority)} flex items-center justify-center text-white font-bold`}>
          {suggestion.priority}
        </div>
      </div>
      <p className="mt-2 text-gray-300">{suggestion.description}</p>
      <div className="mt-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Impact:</span>
          <span className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-200">
            {suggestion.impact}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Effort:</span>
          <span className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-200">
            {suggestion.effort}
          </span>
        </div>
      </div>
      <button className="mt-4 text-sm text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center gap-1">
        Learn more
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};