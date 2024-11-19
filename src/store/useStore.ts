import create from 'zustand';

interface IdeaState {
  ideas: Idea[];
  addIdea: (idea: Idea) => void;
  removeIdea: (id: string) => void;
}

interface Idea {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
}

export const useStore = create<IdeaState>((set) => ({
  ideas: [],
  addIdea: (idea) => set((state) => ({ ideas: [...state.ideas, idea] })),
  removeIdea: (id) => set((state) => ({ ideas: state.ideas.filter((idea) => idea.id !== id) })),
}));