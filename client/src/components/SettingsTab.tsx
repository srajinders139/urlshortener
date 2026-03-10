import { Globe, Check } from 'lucide-react';
import { useState } from 'react';

interface SettingsTabProps {
  customDomain: string;
  onDomainChange: (domain: string) => void;
}

const PRESET_DOMAINS = [
  'short.ly',
  'link.to',
  'go.to',
  'tiny.url',
  'sn.ip',
];

export function SettingsTab({ customDomain, onDomainChange }: SettingsTabProps) {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customInput, setCustomInput] = useState('');

  const handlePresetSelect = (domain: string) => {
    onDomainChange(domain);
    setShowCustomInput(false);
  };

  const handleCustomDomain = () => {
    if (customInput.trim()) {
      onDomainChange(customInput.trim());
      setCustomInput('');
      setShowCustomInput(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl text-gray-800 mb-6">Settings</h2>

      {/* Domain Settings */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm text-gray-700 mb-3">
            Custom Domain
          </label>
          <p className="text-sm text-gray-500 mb-4">
            Choose a domain for your shortened URLs
          </p>

          {/* Preset Domains */}
          <div className="space-y-2 mb-4">
            {PRESET_DOMAINS.map((domain) => (
              <button
                key={domain}
                onClick={() => handlePresetSelect(domain)}
                className={`w-full flex items-center justify-between px-4 py-3 border rounded-lg transition ${
                  customDomain === domain
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{domain}</span>
                </div>
                {customDomain === domain && (
                  <Check className="h-5 w-5 text-indigo-600" />
                )}
              </button>
            ))}
          </div>

          {/* Custom Domain Input */}
          {!showCustomInput ? (
            <button
              onClick={() => setShowCustomInput(true)}
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              + Use custom domain
            </button>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="yourdomain.com"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
              <button
                onClick={handleCustomDomain}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowCustomInput(false);
                  setCustomInput('');
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Current Preview */}
        <div className="border-t border-gray-200 pt-6">
          <label className="block text-sm text-gray-700 mb-2">
            Preview
          </label>
          <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm text-gray-600">
            https://{customDomain}/abc123
          </div>
        </div>

        {/* Additional Settings */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-sm text-gray-700 mb-3">Additional Options</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-600">Auto-copy shortened URLs</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-600">Show URL preview before opening</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
