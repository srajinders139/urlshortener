import { useState } from 'react';
import { Link2, Sparkles } from 'lucide-react';
import type { ShortenedUrl } from '../App';

interface UrlShortenerProps {
  onUrlShortened: (url: ShortenedUrl) => void;
  customDomain: string;
}

export function UrlShortener({ onUrlShortened, customDomain }: UrlShortenerProps) {
  const [longUrl, setLongUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateShortCode = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!longUrl.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!isValidUrl(longUrl)) {
      setError('Please enter a valid URL (include http:// or https://)');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const shortCode = generateShortCode();
      const newUrl: ShortenedUrl = {
        id: Date.now().toString(),
        originalUrl: longUrl,
        shortCode,
        createdAt: new Date(),
      };

      onUrlShortened(newUrl);
      setLongUrl('');
      setIsLoading(false);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="url-input" className="block text-sm text-gray-700 mb-2">
          Enter your long URL
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Link2 className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="url-input"
            type="text"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="https://example.com/very/long/url/that/needs/shortening"
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
          />
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Sparkles className="h-5 w-5" />
        {isLoading ? 'Shortening...' : 'Shorten URL'}
      </button>
    </form>
  );
}
