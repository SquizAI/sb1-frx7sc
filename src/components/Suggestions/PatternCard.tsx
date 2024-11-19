import React from 'react';
import { Code2 } from 'lucide-react';

interface PatternCardProps {
  pattern: {
    name: string;
    applicability: string;
    benefits: string;
  };
}

export const PatternCard: React.FC<PatternCardProps> = ({ pattern }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors">
      <div className="flex items-center gap-2">
        <Code2 className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-medium text-blue-400">{pattern.name}</h3>
      </div>
      <div className="mt-3 space-y-3">
        <div>
          <h4 className="text-sm font-medium text-gray-300">When to Apply</h4>
          <p className="mt-1 text-sm text-gray-400">{pattern.applicability}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-300">Benefits</h4>
          <p className="mt-1 text-sm text-gray-400">{pattern.benefits}</p>
        </div>
      </div>
    </div>
  );
};