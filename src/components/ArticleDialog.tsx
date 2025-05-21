import React, { useState, useEffect } from 'react'
import Dialog from './Dialog'
import { useEditor } from '../hooks/useEditor'
import { filterCache } from '../functions'

interface ArticleDialogProps {
  isOpen: boolean
  onClose: () => void
  articlePath: string
}

const ArticleDialog = ({ isOpen, onClose, articlePath }: ArticleDialogProps) => {
  const { cache } = useEditor()
  const [content, setContent] = useState<string>('')
  const [title, setTitle] = useState<string>('')

  // Load article content when the dialog opens
  useEffect(() => {
    if (!isOpen || !articlePath) return

    // Get the article from cache
    const article = cache.find(item => item.key === articlePath)
    
    if (article) {
      // Fetch the content of the article (assuming it's a text file)
      fetch(article.value)
        .then(response => response.text())
        .then(text => {
          setContent(text)
          
          // Extract title from the first line if it starts with # 
          const lines = text.split('\n')
          const firstLine = lines[0].trim()
          
          if (firstLine.startsWith('# ')) {
            setTitle(firstLine.substring(2))
          } else {
            // Use the filename as title
            const filename = articlePath.split('/').pop() || 'Article'
            setTitle(filename)
          }
        })
        .catch(error => {
          console.error('Error loading article:', error)
          setContent('Error loading article content.')
        })
    } else {
      setContent('Article not found.')
      setTitle('Error')
    }
  }, [isOpen, articlePath, cache])

  // Parse Markdown content to HTML (enhanced version)
  const parseMarkdown = (text: string): string => {
    if (!text) return ''
    
    // Skip the first line if it's a title (we're already displaying it separately)
    const lines = text.split('\n')
    if (lines[0].startsWith('# ')) {
      lines.shift()
      text = lines.join('\n')
    }
    
    // Replace headers
    let parsedText = text
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      
    // Replace bold text
    parsedText = parsedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    
    // Replace italic text
    parsedText = parsedText.replace(/\*(.*?)\*/g, '<em>$1</em>')
    
    // Replace links
    parsedText = parsedText.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
    
    // Replace ordered lists
    const olRegex = /^\d+\.\s+(.+)$/gm
    let match
    const olMatches = []
    while ((match = olRegex.exec(parsedText)) !== null) {
      olMatches.push(match[0])
    }
    
    if (olMatches.length > 0) {
      let inList = false
      let listContent = ''
      const lines = parsedText.split('\n')
      
      const newLines = lines.map(line => {
        if (line.match(olRegex)) {
          const content = line.replace(/^\d+\.\s+/, '')
          if (!inList) {
            inList = true
            return `<ol>\n<li>${content}</li>`
          }
          return `<li>${content}</li>`
        } else if (inList && line.trim() === '') {
          inList = false
          return '</ol>'
        }
        return line
      })
      
      if (inList) {
        newLines.push('</ol>')
      }
      
      parsedText = newLines.join('\n')
    }
    
    // Replace unordered lists
    const ulRegex = /^[\*\-]\s+(.+)$/gm
    parsedText = parsedText.replace(/^[\*\-]\s+(.+)$/gm, '<li>$1</li>')
    parsedText = parsedText.replace(/<li>(.+)<\/li>\n(?!<li>)/g, '<li>$1</li></ul>\n')
    parsedText = parsedText.replace(/(?<!<\/ul>\n)(<li>)/g, '<ul>$1')
    
    // Replace paragraphs (two newlines)
    parsedText = parsedText.replace(/\n\n/g, '</p><p>')
    
    // Replace images - use object-fit: contain to keep aspect ratio
    parsedText = parsedText.replace(/!\[(.*?)\]\((.*?)\)/g, 
      '<img src="$2" alt="$1" style="max-width: 100%; object-fit: contain;" />')
    
    // Wrap in paragraphs
    parsedText = `<p>${parsedText}</p>`
    
    return parsedText
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} maxWidth="lg">
      <div className="flex flex-col w-full max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">{title}</h2>
          <button 
            onClick={onClose}
            className="px-2 py-1 bg-gray-700 hover:bg-gray-600"
          >
            Close
          </button>
        </div>
        
        {/* Content */}
        <div 
          className="p-4 overflow-y-auto max-h-[70vh] article-content"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
        />
      </div>
    </Dialog>
  )
}

export default ArticleDialog