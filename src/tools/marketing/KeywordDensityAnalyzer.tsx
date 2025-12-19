import { useState } from 'react'
import ToolPage from '../../components/ToolPage/ToolPage'
import { Copy, Download, BarChart3 } from 'lucide-react'
import { copyToClipboard } from '../../utils/copyToClipboard'
import toast from 'react-hot-toast'
import { analyzeKeywordDensity, analyzeNGrams, type AnalysisResult } from '../../utils/marketing/keywordAnalysis'

export default function KeywordDensityAnalyzer() {
  const [text, setText] = useState('')
  const [removeStopWords, setRemoveStopWords] = useState(false)
  const [topN, setTopN] = useState(20)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [ngrams, setNgrams] = useState<{ word: string; count: number; density: number }[]>([])
  const [showNGrams, setShowNGrams] = useState(false)

  const handleAnalyze = () => {
    if (!text.trim()) {
      toast.error('Please enter some text to analyze')
      return
    }

    const result = analyzeKeywordDensity(text, {
      removeStopWords,
      topN,
    })
    setAnalysis(result)

    // Analyze bigrams
    const bigrams = analyzeNGrams(text, 2, 10)
    setNgrams(bigrams)
  }

  const handleCopy = () => {
    if (analysis) {
      const summary = `Keyword Density Analysis\n\nTotal Words: ${analysis.totalWords}\nUnique Words: ${analysis.uniqueWords}\nAverage Word Length: ${analysis.averageWordLength}\nAverage Sentence Length: ${analysis.averageSentenceLength}\n\nTop Keywords:\n${analysis.topKeywords.map(k => `${k.word}: ${k.count} (${k.density.toFixed(2)}%)`).join('\n')}`
      copyToClipboard(summary, 'Analysis copied to clipboard!')
    } else {
      toast.error('No analysis to copy')
    }
  }

  const handleDownload = () => {
    if (!analysis) {
      toast.error('No analysis to download')
      return
    }

    const data = {
      totalWords: analysis.totalWords,
      uniqueWords: analysis.uniqueWords,
      averageWordLength: analysis.averageWordLength,
      averageSentenceLength: analysis.averageSentenceLength,
      topKeywords: analysis.topKeywords,
      ngrams: ngrams,
    }

    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'keyword-analysis.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    toast.success('Analysis downloaded!')
  }

  return (
    <ToolPage
      title="Keyword Density Analyzer"
      description="Analyze keyword frequency and density in your content for SEO optimization."
      keywords="keyword density, SEO analysis, keyword frequency, content analysis"
    >
      <div className="space-y-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Content to Analyze *
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your content here..."
              rows={10}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {text.length} characters, {text.split(/\s+/).filter(w => w).length} words
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={removeStopWords}
                  onChange={(e) => setRemoveStopWords(e.target.checked)}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Remove stop words</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Top Keywords to Show
              </label>
              <input
                type="number"
                value={topN}
                onChange={(e) => setTopN(parseInt(e.target.value) || 20)}
                min={5}
                max={50}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md flex items-center gap-2 transition-colors"
          >
            <BarChart3 className="h-4 w-4" />
            Analyze Keywords
          </button>
        </div>

        {/* Statistics */}
        {analysis && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Analysis Results</h2>
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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Words</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{analysis.totalWords}</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Unique Words</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{analysis.uniqueWords}</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Avg Word Length</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{analysis.averageWordLength}</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Avg Sentence Length</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{analysis.averageSentenceLength}</p>
              </div>
            </div>

            {/* Top Keywords Table */}
            <div>
              <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-2">Top Keywords</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 dark:border-gray-700">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-900">
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Rank</th>
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Keyword</th>
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Count</th>
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Density</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysis.topKeywords.map((keyword, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm text-gray-900 dark:text-white">{index + 1}</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-900 dark:text-white">{keyword.word}</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm text-gray-900 dark:text-white">{keyword.count}</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm text-gray-900 dark:text-white">{keyword.density.toFixed(2)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* N-Grams */}
            {ngrams.length > 0 && (
              <div>
                <button
                  onClick={() => setShowNGrams(!showNGrams)}
                  className="text-sm text-purple-600 dark:text-purple-400 hover:underline mb-2"
                >
                  {showNGrams ? 'Hide' : 'Show'} Bigrams (2-word phrases)
                </button>
                {showNGrams && (
                  <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Top Bigrams</h4>
                    <div className="space-y-1">
                      {ngrams.map((ngram, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-700 dark:text-gray-300">"{ngram.word}"</span>
                          <span className="text-gray-600 dark:text-gray-400">{ngram.count} times ({ngram.density.toFixed(2)}%)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </ToolPage>
  )
}

