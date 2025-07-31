import React from 'react';

const ProjectSearchLoader: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-lg shadow-md overflow-hidden animate-pulse h-48">
            <div className="h-3/4 bg-gray-300"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectSearchLoader;