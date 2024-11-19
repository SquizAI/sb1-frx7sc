import React from 'react';
import { useCollaborationStore } from '../../store/useCollaborationStore';
import { Users } from 'lucide-react';

export const UserList: React.FC = () => {
  const activeUsers = useCollaborationStore((state) => state.activeUsers);
  const cursors = useCollaborationStore((state) => state.cursors);

  return (
    <div className="p-4 border-b border-gray-800">
      <div className="flex items-center gap-2 mb-3">
        <Users className="w-5 h-5 text-purple-500" />
        <h3 className="font-medium text-gray-200">Active Users</h3>
      </div>
      <div className="space-y-2">
        {Array.from(activeUsers).map((userId) => {
          const cursor = cursors.get(userId);
          return (
            <div key={userId} className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm text-gray-300">
                {cursor?.username || 'Anonymous'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};