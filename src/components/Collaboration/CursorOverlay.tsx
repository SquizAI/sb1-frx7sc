import React from 'react';
import { useCollaborationStore } from '../../store/useCollaborationStore';
import { MousePointer2 } from 'lucide-react';

export const CursorOverlay: React.FC = () => {
  const cursors = useCollaborationStore((state) => state.cursors);

  return (
    <>
      {Array.from(cursors.values()).map((cursor) => (
        <div
          key={cursor.userId}
          className="absolute pointer-events-none"
          style={{
            left: cursor.x,
            top: cursor.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <MousePointer2 className="w-4 h-4 text-purple-500" />
          <div className="ml-2 px-2 py-1 bg-purple-500 rounded text-white text-xs whitespace-nowrap">
            {cursor.username}
          </div>
        </div>
      ))}
    </>
  );
};