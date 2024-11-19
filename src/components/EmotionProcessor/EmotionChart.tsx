import React from 'react';

interface Emotion {
  name: string;
  intensity: number;
  confidence: number;
}

interface EmotionChartProps {
  emotions: Emotion[];
}

export const EmotionChart: React.FC<EmotionChartProps> = ({ emotions }) => {
  return (
    <div className="space-y-3">
      {emotions.map((emotion, index) => (
        <div key={index} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">{emotion.name}</span>
            <span className="text-gray-400">{emotion.intensity}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-pink-500 to-purple-600 h-2.5 rounded-full"
              style={{ width: `${emotion.intensity}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 text-right">
            Confidence: {emotion.confidence}%
          </div>
        </div>
      ))}
    </div>
  );
};