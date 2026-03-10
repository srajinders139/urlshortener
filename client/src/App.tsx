import { useState } from 'react';
import { UrlShortener } from './components/UrlShortener';
import { HistoryTab } from './components/HistoryTab';
import { SettingsTab } from './components/SettingsTab';
import { History, Settings } from 'lucide-react';
import { Navbar } from './components/Navbar';

export type ShortenedUrl = {
  id: string;
  originalUrl: string;
  shortCode: string;
  createdAt: Date;
}

type TabType = 'history' | 'settings';

export default function App() {
  const [urls, setUrls] = useState<ShortenedUrl[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('history');
  const [customDomain, setCustomDomain] = useState('short.ly');

  const handleUrlShortened = (newUrl: ShortenedUrl) => {
    setUrls([newUrl, ...urls]);
  };

  const handleDelete = (id: string) => {
    setUrls(urls.filter(url => url.id !== id));
  };

  const handleClearAll = () => {
    setUrls([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar/>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          {/* <h1 className="text-5xl mb-4 text-indigo-900">URL Shortener</h1> */}
          <p className="text-lg text-gray-600">Shorten your URLs in seconds</p>
        </div>

        {/* Single Page Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* URL Shortener Form */}
          <div className="p-8 border-b border-gray-200">
            <UrlShortener onUrlShortened={handleUrlShortened} customDomain={customDomain} />
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('history')}
                className={`flex-1 px-6 py-4 flex items-center justify-center gap-2 transition ${
                  activeTab === 'history'
                    ? 'border-b-2 border-indigo-600 text-indigo-600 bg-indigo-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <History className="h-5 w-5" />
                <span>History</span>
                {urls.length > 0 && (
                  <span className="ml-1 bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full text-sm">
                    {urls.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex-1 px-6 py-4 flex items-center justify-center gap-2 transition ${
                  activeTab === 'settings'
                    ? 'border-b-2 border-indigo-600 text-indigo-600 bg-indigo-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8 min-h-[400px]">
            {activeTab === 'history' && (
              <HistoryTab 
                urls={urls} 
                onDelete={handleDelete} 
                onClearAll={handleClearAll}
                customDomain={customDomain}
              />
            )}
            {activeTab === 'settings' && (
              <SettingsTab 
                customDomain={customDomain}
                onDomainChange={setCustomDomain}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
