import { useState, useEffect } from 'react'
import ToolPage from '../../components/ToolPage/ToolPage'
import { Copy, Download, Image as ImageIcon } from 'lucide-react'
import { copyToClipboard } from '../../utils/copyToClipboard'
import toast from 'react-hot-toast'

export default function OpenGraphGenerator() {
  const [ogData, setOgData] = useState({
    title: '',
    description: '',
    image: '',
    url: '',
    type: 'website',
    siteName: '',
    locale: 'en_US',
  })
  const [generatedHTML, setGeneratedHTML] = useState('')
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (ogData.title || ogData.description) {
      const tags: string[] = []
      
      if (ogData.title) {
        tags.push(`<meta property="og:title" content="${escapeHtml(ogData.title)}">`)
      }
      if (ogData.description) {
        tags.push(`<meta property="og:description" content="${escapeHtml(ogData.description)}">`)
      }
      if (ogData.image) {
        tags.push(`<meta property="og:image" content="${escapeHtml(ogData.image)}">`)
      }
      if (ogData.url) {
        tags.push(`<meta property="og:url" content="${escapeHtml(ogData.url)}">`)
      }
      if (ogData.type) {
        tags.push(`<meta property="og:type" content="${escapeHtml(ogData.type)}">`)
      }
      if (ogData.siteName) {
        tags.push(`<meta property="og:site_name" content="${escapeHtml(ogData.siteName)}">`)
      }
      if (ogData.locale) {
        tags.push(`<meta property="og:locale" content="${escapeHtml(ogData.locale)}">`)
      }

      setGeneratedHTML(tags.join('\n'))
    } else {
      setGeneratedHTML('')
    }
  }, [ogData])

  const escapeHtml = (text: string): string => {
    const map: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    }
    return text.replace(/[&<>"']/g, (m) => map[m])
  }

  const handleInputChange = (field: string, value: string) => {
    setOgData(prev => ({ ...prev, [field]: value }))
    if (field === 'image') {
      setImageError(false)
    }
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const handleCopy = () => {
    if (generatedHTML) {
      copyToClipboard(generatedHTML, 'Open Graph tags copied to clipboard!')
    } else {
      toast.error('No tags to copy')
    }
  }

  const handleDownload = () => {
    if (!generatedHTML) {
      toast.error('No tags to download')
      return
    }

    const blob = new Blob([generatedHTML], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'open-graph-tags.html'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    toast.success('Open Graph tags downloaded!')
  }

  return (
    <ToolPage
      title="Open Graph Tag Generator"
      description="Generate Open Graph tags for optimal social media sharing previews."
      keywords="Open Graph, og tags, social media, Facebook, LinkedIn, Twitter"
    >
      <div className="space-y-6">
        {/* Input Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Required Tags</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                og:title *
              </label>
              <input
                type="text"
                value={ogData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Page Title"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                og:description *
              </label>
              <textarea
                value={ogData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Page description for social sharing"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                og:image *
              </label>
              <input
                type="url"
                value={ogData.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Recommended: 1200x630px (1.91:1 ratio)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                og:url *
              </label>
              <input
                type="url"
                value={ogData.url}
                onChange={(e) => handleInputChange('url', e.target.value)}
                placeholder="https://example.com/page"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Optional Tags</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                og:type
              </label>
              <select
                value={ogData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="website">Website</option>
                <option value="article">Article</option>
                <option value="product">Product</option>
                <option value="book">Book</option>
                <option value="profile">Profile</option>
                <option value="video">Video</option>
                <option value="music">Music</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                og:site_name
              </label>
              <input
                type="text"
                value={ogData.siteName}
                onChange={(e) => handleInputChange('siteName', e.target.value)}
                placeholder="Your Site Name"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                og:locale
              </label>
              <input
                type="text"
                value={ogData.locale}
                onChange={(e) => handleInputChange('locale', e.target.value)}
                placeholder="en_US"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Format: language_COUNTRY (e.g., en_US, fr_FR)
              </p>
            </div>

            {/* Image Preview */}
            {ogData.image && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Image Preview
                </label>
                <div className="border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-gray-50 dark:bg-gray-800">
                  {!imageError ? (
                    <img
                      src={ogData.image}
                      alt="OG Image Preview"
                      onError={handleImageError}
                      className="max-w-full h-auto rounded"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-32 text-gray-400">
                      <ImageIcon className="h-8 w-8" />
                      <span className="ml-2 text-sm">Unable to load image</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Generated HTML */}
        {generatedHTML && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Generated Open Graph Tags</h2>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md flex items-center gap-2 text-sm transition-colors"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </button>
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md flex items-center gap-2 text-sm transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            </div>
            <pre className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md overflow-x-auto text-sm">
              <code className="text-gray-800 dark:text-gray-200">{generatedHTML}</code>
            </pre>
          </div>
        )}
      </div>
    </ToolPage>
  )
}

