import React, { useState } from 'react';
import { analyzeArchitecture, getArchitectureSuggestions } from '../services/openai';
import { Loader2, Lightbulb, AlertTriangle, Gauge } from 'lucide-react';
import { SuggestionCard } from './Suggestions/SuggestionCard';
import { PatternCard } from './Suggestions/PatternCard';
import { RiskCard } from './Suggestions/RiskCard';

export const ArchitectureAnalyzer: React.FC = () => {
  const [description, setDescription] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!description.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const result = await analyzeArchitecture(description);
      setAnalysis(result);
      
      // Get AI-powered suggestions based on the analyzed components
      const suggestionsResult = await getArchitectureSuggestions(result.components);
      setSuggestions(suggestionsResult);
    } catch (err) {
      setError('Failed to analyze architecture. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Architecture Analyzer</h2>
        <div className="space-y-4">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your system architecture..."
            rows={5}
            className="w-full rounded-md bg-gray-800 border-gray-700 text-gray-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Analyzing...
              </>
            ) : (
              'Analyze Architecture'
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 text-red-200">
          {error}
        </div>
      )}

      {analysis && (
        <div className="bg-gray-900 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Analysis Results</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-md font-medium text-gray-300 mb-2">Components</h4>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                {analysis.components.map((component: any, index: number) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-4">
                    <h5 className="font-medium text-purple-400">{component.name}</h5>
                    <p className="text-sm text-gray-400 mt-1">{component.description}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300">
                        {component.type}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300">
                        {component.complexity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {suggestions && (
              <>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    <h4 className="text-md font-medium text-gray-300">Improvement Suggestions</h4>
                  </div>
                  <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                    {suggestions.suggestions.map((suggestion: any, index: number) => (
                      <SuggestionCard key={index} suggestion={suggestion} />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Gauge className="w-5 h-5 text-blue-500" />
                    <h4 className="text-md font-medium text-gray-300">Applicable Patterns</h4>
                  </div>
                  <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                    {suggestions.patterns.map((pattern: any, index: number) => (
                      <PatternCard key={index} pattern={pattern} />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    <h4 className="text-md font-medium text-gray-300">Potential Risks</h4>
                  </div>
                  <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                    {suggestions.risks.map((risk: any, index: number) => (
                      <RiskCard key={index} risk={risk} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};