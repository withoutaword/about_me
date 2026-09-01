import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

const virtualArticlesId = 'virtual:articles'
const resolvedVirtualArticlesId = `\0${virtualArticlesId}`
const virtualProjectsId = 'virtual:projects'
const resolvedVirtualProjectsId = `\0${virtualProjectsId}`
const virtualPhotographyId = 'virtual:photography'
const resolvedVirtualPhotographyId = `\0${virtualPhotographyId}`

const plainText = (markdown) => markdown
  .replace(/^#{1,6}\s+/gm, '')
  .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
  .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
  .replace(/[*_>`~-]/g, '')
  .replace(/\s+/g, ' ')
  .trim()

const dateFromFilename = (filename) => {
  const value = filename.match(/^(\d{4})(\d{2})?/)
  if (!value) return null
  return `${value[1]}-${value[2] || '01'}-01`
}

const articlesPlugin = () => ({
  name: 'local-markdown-articles',
  resolveId(id) {
    return id === virtualArticlesId ? resolvedVirtualArticlesId : null
  },
  load(id) {
    if (id !== resolvedVirtualArticlesId) return null

    const projectRoot = path.dirname(fileURLToPath(import.meta.url))
    const writingDir = path.resolve(projectRoot, 'public/writing')
    const files = fs.existsSync(writingDir)
      ? fs.readdirSync(writingDir).filter((file) => file.endsWith('.md'))
      : []

    const articles = files.map((filename) => {
      const filePath = path.join(writingDir, filename)
      this.addWatchFile(filePath)
      const source = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(source)
      const heading = content.match(/^#{1,6}\s+(.+)$/m)?.[1]?.trim()
      const text = plainText(content)
      const date = data.date || dateFromFilename(filename)
      const slug = filename.replace(/\.md$/, '')

      return {
        slug,
        title: data.title || heading || slug,
        date,
        summary: data.summary || `${text.slice(0, 150)}${text.length > 150 ? '…' : ''}`,
        tags: Array.isArray(data.tags) ? data.tags : [],
        cover: data.cover || null,
        published: data.published !== false,
        readingTime: Math.max(1, Math.ceil(text.replace(/\s/g, '').length / 500)),
        content: heading ? content.replace(/^\s*#{1,6}\s+.+\r?\n/, '') : content,
      }
    }).filter((article) => article.published)
      .sort((a, b) => (b.date || '').localeCompare(a.date || ''))

    return `export default ${JSON.stringify(articles)}`
  },
})

const projectsPlugin = () => ({
  name: 'local-markdown-projects',
  resolveId(id) {
    return id === virtualProjectsId ? resolvedVirtualProjectsId : null
  },
  load(id) {
    if (id !== resolvedVirtualProjectsId) return null

    const projectRoot = path.dirname(fileURLToPath(import.meta.url))
    const projectsDir = path.resolve(projectRoot, 'public/project')
    const files = fs.existsSync(projectsDir)
      ? fs.readdirSync(projectsDir).filter((file) => file.endsWith('.md'))
      : []

    const projects = files.map((filename) => {
      const filePath = path.join(projectsDir, filename)
      this.addWatchFile(filePath)
      const source = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(source)
      const text = plainText(content)
      const slug = filename.replace(/\.md$/, '')
      const filenameTitle = slug.replace(/^\d{4}(?:\d{2})?[._-]?/, '').trim()
      const markdown = content.replace(
        /!\[\[([^\]]+)\]\]/g,
        (_, imageReference) => {
          const [image, alt = image] = imageReference.split('|')
          return `![${alt}](/project/image/${encodeURIComponent(image)})`
        },
      )

      return {
        slug,
        title: data.title || filenameTitle || slug,
        date: data.date || dateFromFilename(filename),
        summary: data.summary || `${text.slice(0, 150)}${text.length > 150 ? '…' : ''}`,
        techStack: Array.isArray(data.techStack)
          ? data.techStack
          : (Array.isArray(data.tags) ? data.tags : []),
        cover: data.cover || null,
        github: data.github || null,
        demo: data.demo || null,
        published: data.published !== false,
        content: markdown,
      }
    }).filter((project) => project.published)
      .sort((a, b) => (b.date || '').localeCompare(a.date || ''))

    return `export default ${JSON.stringify(projects)}`
  },
})

const photographyPlugin = () => ({
  name: 'local-photography',
  resolveId(id) {
    return id === virtualPhotographyId ? resolvedVirtualPhotographyId : null
  },
  load(id) {
    if (id !== resolvedVirtualPhotographyId) return null

    const projectRoot = path.dirname(fileURLToPath(import.meta.url))
    const photographyDir = path.resolve(projectRoot, 'public/photography')
    const imagePattern = /\.(?:avif|gif|jpe?g|png|webp)$/i
    const files = fs.existsSync(photographyDir)
      ? fs.readdirSync(photographyDir)
        .filter((file) => imagePattern.test(file))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      : []

    const images = files.map((filename) => {
      this.addWatchFile(path.join(photographyDir, filename))
      return {
        src: `/photography/${encodeURIComponent(filename)}`,
        alt: path.basename(filename, path.extname(filename)).replace(/[-_]+/g, ' '),
      }
    })

    return `export default ${JSON.stringify(images)}`
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), articlesPlugin(), projectsPlugin(), photographyPlugin()],
})
