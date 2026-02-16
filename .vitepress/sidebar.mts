import fs from 'fs'
import path from 'path'

interface SidebarItem {
  text: string
  link?: string
  items?: SidebarItem[]
}

function getMarkdownFiles(dir: string, basePath: string = ''): SidebarItem[] {
  const items: SidebarItem[] = []
  const fullPath = path.join(process.cwd(), dir)
  
  if (!fs.existsSync(fullPath)) return items
  
  const entries = fs.readdirSync(fullPath, { withFileTypes: true })
  
  // 先处理文件夹
  for (const entry of entries) {
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
      const subItems = getMarkdownFiles(
        path.join(dir, entry.name),
        path.join(basePath, entry.name)
      )
      if (subItems.length > 0) {
        items.push({
          text: entry.name,
          items: subItems
        })
      }
    }
  }
  
  // 再处理 md 文件
  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'index.md') {
      const name = entry.name.replace('.md', '')
      // 移除文件名开头的数字序号（如 "1.xxx" -> "xxx"）
      const displayName = name.replace(/^\d+\./, '')
      items.push({
        text: displayName,
        link: '/' + path.join(basePath, name).replace(/\\/g, '/')
      })
    }
  }
  
  return items
}

export function generateSidebar(): SidebarItem[] {
  return getMarkdownFiles('.')
}
