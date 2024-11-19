import React, { useState } from 'react';
import { useCollaborationStore } from '../../store/useCollaborationStore';
import { socket } from '../../services/socket';
import { Send } from 'lucide-react';

export const ChatPanel: React.FC = () => {
  const [message, setMessage] = useState('');
  const messages = useCollaborationStore((state) => state.messages);
  const username = useCollaborationStore((state) => state.username);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: crypto.randomUUID(),
      userId: socket.auth.userId as string,
      username,
      text: message,
      timestamp: new Date(),
    };

    socket.emit('chat:message', newMessage);
    setMessage('');
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.userId === socket.auth.userId ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                msg.userId === socket.auth.userId
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-200'
              }`}
            >
              <div className="text-sm font-medium">{msg.username}</div>
              <div>{msg.text}</div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-800 border-gray-700 rounded-md"
          />
          <button
            type="submit"
            className="p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};