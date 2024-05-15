import fs from 'fs'
import path from 'path'

export const createEntryMd = (dir) => {
  const fullPath = path.join(dir, 'index.md')
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, '# 目录\n')
  }
}

export const getDir = (dir = '', hasFile = true, baseUrl = '../src') => {
  const fullPath  = path.join(__dirname, `${baseUrl}${dir}`)
  const files = fs.readdirSync(fullPath)
  return files.reduce((acc, file) => {
    const fillPath = path.join(fullPath, file)
    const stat = fs.statSync(fillPath)
    if (hasFile || stat.isDirectory()) {
      acc.push({
        text: file.replace('.md', ''),
        link: `${dir}/${file.replace(/\.md$/, '')}`
      })
    }
    return acc
  }, [])

}

export const getSideBar = () => {
  const excludeDirs = ['program_topic']
  const dirs = getDir('', false)
  const valuableDirs = dirs.filter(dir => !excludeDirs.includes(dir.text))
  return valuableDirs.reduce((sidebar, dir) => {
    const items = getDir(`/${dir.text}`)
    createEntryMd(path.resolve(__dirname, '../src', dir.text))
    sidebar[`/${dir.text}/`] = {
      text: dir.text,
      items: [{ text: 'index', link: `/${dir.text}/`}, ...items]
    }
    return sidebar
  }, {})
}