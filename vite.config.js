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
const virtualPatentsId = 'virtual:patents'
const resolvedVirtualPatentsId = `\0${virtualPatentsId}`
const virtualAwardsId = 'virtual:awards'
const resolvedVirtualAwardsId = `\0${virtualAwardsId}`

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

const normalizeDate = (value) => {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return value || null
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
      const date = normalizeDate(data.date || dateFromFilename(filename))
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
        date: normalizeDate(data.date || dateFromFilename(filename)),
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

const patentsPlugin = () => ({
  name: 'local-markdown-patents',
  resolveId(id) {
    return id === virtualPatentsId ? resolvedVirtualPatentsId : null
  },
  load(id) {
    if (id !== resolvedVirtualPatentsId) return null

    const projectRoot = path.dirname(fileURLToPath(import.meta.url))
    const patentsDir = path.resolve(projectRoot, 'public/patent')
    const files = fs.existsSync(patentsDir)
      ? fs.readdirSync(patentsDir).filter((file) => file.endsWith('.md'))
      : []

    const patents = files.map((filename) => {
      const filePath = path.join(patentsDir, filename)
      this.addWatchFile(filePath)
      const source = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(source)
      const slug = filename.replace(/\.md$/, '')
      const patentNumber = data.patentNumber || slug.split('-')[0]
      const heading = content.match(/^#\s+(.+)$/m)?.[1]?.trim()
      const officialUrl = data.link || content.match(/https:\/\/patents\.google\.com\/\S+/)?.[0] || null
      const withoutHeading = heading ? content.replace(/^\s*#\s+.+\r?\n/, '') : content
      const markdown = withoutHeading
        .replace(/^###\s+link\s*$/gim, '')
        .replace(/https:\/\/patents\.google\.com\/\S+/g, '')
        .trim()
      const text = plainText(markdown).replace(/^Abstract\s*/i, '')

      return {
        slug,
        patentNumber,
        title: data.title || heading || slug.replace(`${patentNumber}-`, ''),
        summary: data.summary || `${text.slice(0, 220)}${text.length > 220 ? '…' : ''}`,
        officialUrl,
        published: data.published !== false,
        content: markdown,
      }
    }).filter((patent) => patent.published)
      .sort((a, b) => b.patentNumber.localeCompare(a.patentNumber))

    return `export default ${JSON.stringify(patents)}`
  },
})

const awardsPlugin = () => ({
  name: 'local-markdown-awards',
  resolveId(id) {
    return id === virtualAwardsId ? resolvedVirtualAwardsId : null
  },
  load(id) {
    if (id !== resolvedVirtualAwardsId) return null

    const projectRoot = path.dirname(fileURLToPath(import.meta.url))
    const awardsDir = path.resolve(projectRoot, 'public/award')
    const files = fs.existsSync(awardsDir)
      ? fs.readdirSync(awardsDir).filter((file) => file.endsWith('.md'))
      : []

    const awards = files.map((filename) => {
      const filePath = path.join(awardsDir, filename)
      this.addWatchFile(filePath)
      const source = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(source)
      const slug = filename.replace(/\.md$/, '')
      const filenameTitle = slug
        .replace(/^\d{4}(?:\d{2})?[._-]?/, '')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .trim()
      const imageReference = content.match(/!\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/)?.[1] || null
      const markdown = content.replace(
        /!\[\[([^\]]+)\]\]/g,
        (_, reference) => {
          const [image, alt = image] = reference.split('|')
          return `![${alt}](/award/image/${encodeURIComponent(image)})`
        },
      )
      const text = plainText(markdown)

      return {
        slug,
        title: data.title || filenameTitle || slug,
        date: normalizeDate(data.date || dateFromFilename(filename)),
        summary: data.summary || `${text.slice(0, 180)}${text.length > 180 ? '…' : ''}`,
        organization: data.organization || null,
        cover: data.cover || (imageReference ? `/award/image/${encodeURIComponent(imageReference)}` : null),
        published: data.published !== false,
        content: markdown,
      }
    }).filter((award) => award.published)
      .sort((a, b) => (b.date || '').localeCompare(a.date || ''))

    return `export default ${JSON.stringify(awards)}`
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), articlesPlugin(), projectsPlugin(), photographyPlugin(), patentsPlugin(), awardsPlugin()],
})
