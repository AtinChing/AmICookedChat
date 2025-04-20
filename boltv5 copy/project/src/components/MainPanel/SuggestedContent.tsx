return (
  <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
    <h2 className="text-gray-700 text-lg font-medium mb-4">
      {t('suggestedContent')}
    </h2>
    
    <div className="space-y-3">
      {suggestedContent.map((content) => (
        <a 
          key={content.id}
          href={content.url}
          className="flex items-center justify-between p-3 rounded-md hover:bg-gray-50 transition-all transform hover:scale-[1.02] duration-200 ease-in-out border border-gray-100 hover:border-gray-200"
        >
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
              content.type === 'video' 
                ? 'bg-red-100 text-red-600' 
                : content.type === 'audio' 
                  ? 'bg-purple-100 text-purple-600' 
                  : 'bg-blue-100 text-blue-600'
            }`}>
              {getIcon(content.type)}
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-800">{content.title}</h3>
              <span className="text-xs text-gray-500">{content.duration}</span>
            </div>
          </div>
          
          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 capitalize">
            {content.type}
          </span>
        </a>
      ))}
    </div>
  </div>
);
