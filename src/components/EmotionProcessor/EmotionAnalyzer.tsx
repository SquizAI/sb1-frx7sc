import React, { useState } from 'react';
import { analyzeEmotion } from '../../services/openai';
import { Loader2, Heart, BarChart3 } from 'lucide-react';
import { EmotionChart } from './EmotionChart';

export const EmotionAnalyzer: React.FC = () => {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const result = await analyzeEmotion(text);
      setAnalysis(result);
    } catch (err) {
      setError('Failed to analyze emotions. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Heart className="w-6 h-6 text-pink-500" />
        <h2 className="text-xl font-semibold">Emotion Analyzer</h2>
      </div>

      <div className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to analyze emotions..."
          rows={4}
          className="w-full rounded-md bg-gray-800 border-gray-700 text-gray-200 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        />

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Analyzing...
            </>
          ) : (
            <>
              <BarChart3 className="mr-2 h-4 w-4" />
              Analyze Emotions
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="mt-4 bg-red-900/50 border border-red-700 rounded-lg p-4 text-red-200">
          {error}
        </div>
      )}

      {analysis && (
        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-200 mb-2">Overall Sentiment</h3>
            <p className="text-gray-300 bg-gray-800 rounded-lg p-3">
              {analysis.overall_sentiment}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-200 mb-3">Emotional Analysis</h3>
            <EmotionChart emotions={analysis.emotions} />
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-200 mb-2">Emotional Triggers</h3>
            <ul className="list-disc list-inside space-y-1">
              {analysis.emotional_triggers.map((trigger: string, index: number) => (
                <li key={index} className="text-gray-300">{trigger}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};