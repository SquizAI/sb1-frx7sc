import React, { useEffect, useCallback } from 'react';
import { useCollaborationStore } from '../../store/useCollaborationStore';
import { socket } from '../../services/socket';
import { ChatPanel } from './ChatPanel';
import { CursorOverlay } from './CursorOverlay';
import { UserList } from './UserList';

export const CollaborationOverlay: React.FC = () => {
  const { updateCursor, removeCursor, addMessage, addActiveUser, removeActiveUser } = useCollaborationStore();

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    socket.emit('cursor:move', { x, y });
  }, []);

  useEffect(() => {
    socket.connect();

    socket.on('cursor:update', ({ userId, x, y }) => {
      updateCursor(userId, x, y);
    });

    socket.on('cursor:remove', ({ userId }) => {
      removeCursor(userId);
    });

    socket.on('user:join', ({ userId }) => {
      addActiveUser(userId);
    });

    socket.on('user:leave', ({ userId }) => {
      removeActiveUser(userId);
      removeCursor(userId);
    });

    socket.on('chat:message', (message) => {
      addMessage(message);
    });

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      socket.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove, updateCursor, removeCursor, addMessage, addActiveUser, removeActiveUser]);

  return (
    <div className="fixed inset-0 pointer-events-none">
      <CursorOverlay />
      <div className="absolute right-0 top-0 bottom-0 w-80 pointer-events-auto">
        <div className="h-full flex flex-col bg-gray-900 border-l border-gray-800">
          <UserList />
          <ChatPanel />
        </div>
      </div>
    </div>
  );
};