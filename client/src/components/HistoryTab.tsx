import { Copy, ExternalLink, Trash2, Check, Trash } from 'lucide-react';
import { useState } from 'react';
import type { ShortenedUrl } from '../App';

interface HistoryTabProps {
  urls: ShortenedUrl[];
  onDelete: (id: string) => void;
  onClearAll: () => void;
  customDomain: string;
}

export function HistoryTab({ urls, onDelete, onClearAll, customDomain }: HistoryTabProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getShortUrl = (shortCode: string) => {
    return `https://${customDomain}/${shortCode}`;
  };

  const handleCopy = async (shortCode: string, id: string) => {
    const shortUrl = getShortUrl(shortCode);
    await navigator.clipboard.writeText(shortUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (urls.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Copy className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-xl text-gray-700 mb-2">No shortened URLs yet</h3>
        <p className="text-gray-500">Start by shortening your first URL above</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl text-gray-800">Your Shortened URLs</h2>
        <button
          onClick={onClearAll}
          className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
        >
          <Trash className="h-4 w-4" />
          Clear All
        </button>
      </div>

      <div className="space-y-4">
        {urls.map((url) => (
          <div
            key={url.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                {/* Short URL */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg text-indigo-600 font-mono">
                    {getShortUrl(url.shortCode)}
                  </span>
                  <button
                    onClick={() => handleCopy(url.shortCode, url.id)}
                    className="p-1 hover:bg-gray-100 rounded transition"
                    title="Copy to clipboard"
                  >
                    {copiedId === url.id ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>

                {/* Original URL */}
                <div className="flex items-center gap-2 mb-2">
                  <ExternalLink className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <a
                    href={url.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-indigo-600 truncate"
                  >
                    {url.originalUrl}
                  </a>
                </div>

                {/* Date */}
                <p className="text-xs text-gray-500">{formatDate(url.createdAt)}</p>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => onDelete(url.id)}
                className="p-2 hover:bg-red-50 rounded transition text-gray-400 hover:text-red-600"
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
