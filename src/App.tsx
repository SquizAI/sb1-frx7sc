import React from 'react';
import { Header } from './components/Layout/Header';
import { IdeaForm } from './components/IdeaInput/IdeaForm';
import { IdeaList } from './components/IdeaInput/IdeaList';
import { ArchitectureAnalyzer } from './components/ArchitectureAnalyzer';
import { EmotionAnalyzer } from './components/EmotionProcessor/EmotionAnalyzer';
import { DiagramViewer } from './components/DiagramViewer';
import { CollaborationOverlay } from './components/Collaboration/CollaborationOverlay';

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Add New Idea</h2>
              <IdeaForm />
            </div>
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Your Ideas</h2>
              <IdeaList />
            </div>
            <EmotionAnalyzer />
          </div>
          <div>
            <ArchitectureAnalyzer />
          </div>
        </div>
      </main>
      <CollaborationOverlay />
    </div>
  );
}

export default App;