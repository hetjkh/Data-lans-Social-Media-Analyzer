import React from 'react';

const AILoader: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="text-sm font-medium">AI is thinking</div>
      <div className="flex space-x-1">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="h-2 w-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: `${index * 0.2}s` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default AILoader;

