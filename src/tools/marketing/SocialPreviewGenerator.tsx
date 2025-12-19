import { useState } from 'react'
import ToolPage from '../../components/ToolPage/ToolPage'
import { Facebook, Twitter, Linkedin, Instagram, Image as ImageIcon } from 'lucide-react'

export default function SocialPreviewGenerator() {
  const [platform, setPlatform] = useState<'facebook' | 'twitter' | 'linkedin' | 'instagram'>('facebook')
  const [previewData, setPreviewData] = useState({
    title: '',
    description: '',
    image: '',
    url: '',
  })
  const [imageError, setImageError] = useState(false)

  const platformSpecs = {
    facebook: {
      name: 'Facebook',
      icon: Facebook,
      imageSize: '1200x630px',
      titleMax: 100,
      descriptionMax: 200,
      color: 'bg-blue-600',
    },
    twitter: {
      name: 'Twitter/X',
      icon: Twitter,
      imageSize: '1200x675px',
      titleMax: 70,
      descriptionMax: 200,
      color: 'bg-black dark:bg-gray-800',
    },
    linkedin: {
      name: 'LinkedIn',
      icon: Linkedin,
      imageSize: '1200x627px',
      titleMax: 150,
      descriptionMax: 300,
      color: 'bg-blue-700',
    },
    instagram: {
      name: 'Instagram',
      icon: Instagram,
      imageSize: '1080x1080px',
      titleMax: 150,
      descriptionMax: 2200,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    },
  }

  const currentSpec = platformSpecs[platform]

  const handleInputChange = (field: string, value: string) => {
    setPreviewData(prev => ({ ...prev, [field]: value }))
    if (field === 'image') {
      setImageError(false)
    }
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <ToolPage
      title="Social Media Preview Generator"
      description="Preview how your content will look on Facebook, Twitter, LinkedIn, and Instagram."
      keywords="social media preview, Facebook, Twitter, LinkedIn, Instagram, og tags"
    >
      <div className="space-y-6">
        {/* Platform Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Platform
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Object.entries(platformSpecs).map(([key, spec]) => {
              const Icon = spec.icon
              return (
                <button
                  key={key}
                  onClick={() => setPlatform(key as any)}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    platform === key
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
                  }`}
                >
                  <Icon className={`h-6 w-6 mx-auto mb-2 ${platform === key ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400'}`} />
                  <p className={`text-xs font-medium ${platform === key ? 'text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400'}`}>
                    {spec.name}
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Input Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Content</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                value={previewData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Page Title"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {previewData.title.length} / {currentSpec.titleMax} characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={previewData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Page description"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {previewData.description.length} / {currentSpec.descriptionMax} characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Image URL
              </label>
              <input
                type="url"
                value={previewData.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Recommended: {currentSpec.imageSize}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                URL
              </label>
              <input
                type="url"
                value={previewData.url}
                onChange={(e) => handleInputChange('url', e.target.value)}
                placeholder="https://example.com/page"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Preview */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preview</h2>
            
            <div className={`${currentSpec.color} rounded-lg p-4 shadow-lg`}>
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                {/* Image */}
                {previewData.image ? (
                  <div className="w-full aspect-video bg-gray-200 dark:bg-gray-700 relative">
                    {!imageError ? (
                      <img
                        src={previewData.image}
                        alt="Preview"
                        onError={handleImageError}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <ImageIcon className="h-8 w-8" />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                  </div>
                )}

                {/* Content */}
                <div className="p-3 space-y-1">
                  {previewData.url && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {new URL(previewData.url || 'https://example.com').hostname}
                    </p>
                  )}
                  {previewData.title && (
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2">
                      {previewData.title}
                    </h3>
                  )}
                  {previewData.description && (
                    <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                      {previewData.description}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-md">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                <strong>Platform:</strong> {currentSpec.name}<br />
                <strong>Image Size:</strong> {currentSpec.imageSize}<br />
                <strong>Title Max:</strong> {currentSpec.titleMax} chars<br />
                <strong>Description Max:</strong> {currentSpec.descriptionMax} chars
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolPage>
  )
}

