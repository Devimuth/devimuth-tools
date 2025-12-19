import { useState, useEffect } from 'react'
import ToolPage from '../../components/ToolPage/ToolPage'
import { Copy, Scissors, Trash2, QrCode, ExternalLink } from 'lucide-react'
import { copyToClipboard } from '../../utils/copyToClipboard'
import toast from 'react-hot-toast'
import { generateShortCode, validateURL, storeURLMapping, getURLMappings, deleteURLMapping, getURLFromCode } from '../../utils/marketing/urlUtils'

export default function URLShortener() {
  const [url, setUrl] = useState('')
  const [customAlias, setCustomAlias] = useState('')
  const [shortCode, setShortCode] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [history, setHistory] = useState<Record<string, { url: string; createdAt: string; clicks: number }>>({})
  const [validationError, setValidationError] = useState<string>('')

  useEffect(() => {
    const mappings = getURLMappings()
    setHistory(mappings)
  }, [])

  const handleShorten = () => {
    setValidationError('')
    const validation = validateURL(url)
    
    if (!validation.valid) {
      setValidationError(validation.error || 'Invalid URL')
      toast.error(validation.error || 'Invalid URL')
      return
    }

    try {
      const code = generateShortCode(url, customAlias || undefined)
      setShortCode(code)
      
      // Create short URL (client-side only - for demonstration)
      const baseUrl = window.location.origin
      const shortened = `${baseUrl}/s/${code}`
      setShortUrl(shortened)

      // Store mapping
      storeURLMapping(code, url)
      
      // Update history
      const mappings = getURLMappings()
      setHistory(mappings)

      toast.success('URL shortened!')
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to shorten URL'
      setValidationError(errorMsg)
      toast.error(errorMsg)
    }
  }

  const handleCopy = () => {
    if (shortUrl) {
      copyToClipboard(shortUrl, 'Short URL copied to clipboard!')
    } else {
      toast.error('No short URL to copy')
    }
  }

  const handleDelete = (code: string) => {
    deleteURLMapping(code)
    const mappings = getURLMappings()
    setHistory(mappings)
    toast.success('URL deleted from history')
  }

  const handleClear = () => {
    setUrl('')
    setCustomAlias('')
    setShortCode('')
    setShortUrl('')
    setValidationError('')
  }

  // Generate QR code data URL (simple implementation)
  const generateQRCode = (text: string): string => {
    // For a real implementation, you'd use a QR code library
    // This is a placeholder - in production, use qrcode library
    return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="12">QR Code</text></svg>`)}`
  }

  return (
    <ToolPage
      title="URL Shortener"
      description="Shorten URLs with custom aliases and generate QR codes. All processing happens client-side."
      keywords="URL shortener, link shortener, QR code, URL shortening"
    >
      <div className="space-y-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              URL to Shorten *
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value)
                setValidationError('')
              }}
              placeholder="https://example.com/very/long/url"
              className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                validationError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {validationError && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">{validationError}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Custom Alias (optional)
            </label>
            <input
              type="text"
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
              placeholder="my-custom-link"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Letters, numbers, and hyphens only
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleShorten}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md flex items-center gap-2 transition-colors"
            >
              <Scissors className="h-4 w-4" />
              Shorten URL
            </button>
            {(url || shortUrl) && (
              <button
                onClick={handleClear}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Shortened URL */}
        {shortUrl && (
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-md space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Short URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shortUrl}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button
                  onClick={handleCopy}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md flex items-center gap-2 transition-colors"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </button>
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Original URL:</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 break-all">{url}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Short Code:</p>
                <p className="text-sm font-mono text-gray-900 dark:text-white">{shortCode}</p>
              </div>
              <div className="p-3 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
                <QrCode className="h-8 w-8 text-gray-400" />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">QR Code</p>
                <p className="text-xs text-gray-400">(Feature coming soon)</p>
              </div>
            </div>

            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
              <p className="text-xs text-yellow-800 dark:text-yellow-200">
                <strong>Note:</strong> This is a client-side URL shortener. The shortened URLs only work if you have the mapping stored in your browser's localStorage. For production use, you would need a backend service.
              </p>
            </div>
          </div>
        )}

        {/* History */}
        {Object.keys(history).length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">URL History</h2>
            <div className="space-y-2">
              {Object.entries(history).map(([code, data]) => (
                <div
                  key={code}
                  className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md flex items-start justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <code className="text-sm font-mono text-purple-600 dark:text-purple-400">{code}</code>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {data.clicks} clicks
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 truncate">{data.url}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Created: {new Date(data.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(`${window.location.origin}/s/${code}`, 'URL copied!')}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                      title="Copy URL"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(code)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolPage>
  )
}

