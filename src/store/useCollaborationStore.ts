import create from 'zustand';
import { socket } from '../services/socket';

interface Cursor {
  userId: string;
  username: string;
  x: number;
  y: number;
}

interface Message {
  id: string;
  userId: string;
  username: string;
  text: string;
  timestamp: Date;
}

interface CollaborationState {
  cursors: Map<string, Cursor>;
  messages: Message[];
  activeUsers: Set<string>;
  username: string;
  setUsername: (username: string) => void;
  updateCursor: (userId: string, x: number, y: number) => void;
  removeCursor: (userId: string) => void;
  addMessage: (message: Message) => void;
  addActiveUser: (userId: string) => void;
  removeActiveUser: (userId: string) => void;
}

export const useCollaborationStore = create<CollaborationState>((set) => ({
  cursors: new Map(),
  messages: [],
  activeUsers: new Set(),
  username: 'Anonymous',
  
  setUsername: (username) => set({ username }),
  
  updateCursor: (userId, x, y) =>
    set((state) => ({
      cursors: new Map(state.cursors).set(userId, { userId, username: state.username, x, y }),
    })),
    
  removeCursor: (userId) =>
    set((state) => {
      const newCursors = new Map(state.cursors);
      newCursors.delete(userId);
      return { cursors: newCursors };
    }),
    
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
    
  addActiveUser: (userId) =>
    set((state) => ({
      activeUsers: new Set(state.activeUsers).add(userId),
    })),
    
  removeActiveUser: (userId) =>
    set((state) => {
      const newActiveUsers = new Set(state.activeUsers);
      newActiveUsers.delete(userId);
      return { activeUsers: newActiveUsers };
    }),
}));