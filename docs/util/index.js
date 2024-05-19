import fs from 'fs'
import path from 'path'

export const createEntryMd = (dir, contents = []) => {
  const fullPath = path.join(dir, 'index.md')
    const lists = contents.reduce((content, { text, link }, index) => content + '\n' + `[${index+1}. ${text}](${link})\n`, '')
    const renderContents = `# 目录 ${lists}`
  fs.writeFileSync(fullPath, renderContents)
}

export const getDir = (dir = '', hasFile = true, deep = false, baseUrl = '../src') => {
  const fullPath  = path.join(__dirname, `${baseUrl}${dir}`)
  const files = fs.readdirSync(fullPath)
  return files.reduce((acc, file) => {
    const subFillPath = path.join(fullPath, file)
    const stat = fs.statSync(subFillPath)
    if (hasFile || stat.isDirectory()) {
      // 获取一层目录或者获取一级目录下的所有文件
      let curData = {
        text: file.replace('.md', ''),
        link: `${dir}/${file.replace(/\.md$/, '')}`
      }
      if (deep && hasFile) {
        const deepStat = fs.statSync(subFillPath)
        if (deepStat.isDirectory()) {
          const childList = fs.readdirSync(subFillPath).filter(file => file.endsWith('.md'))
          curData = {
            text: file,
            items: childList.map(childFile => {
              return { text: childFile, link: `${dir}/${file}/${childFile.replace(/\.md$/, '')}`}
            })
          }
        }
      }
      acc.push(curData)
    }
    return acc
  }, [])

}

export const getSideBar = () => {
  const excludeDirs = ['program_topic']
  const dirs = getDir('', false)
  const valuableDirs = dirs.filter(dir => !excludeDirs.includes(dir.text))
  return valuableDirs.reduce((sidebar, dir) => {
    const items = getDir(`/${dir.text}`, true, true)
    if (dir.text === 'algorithm') {
      console.log(2, items)
    }
    const existIndex = items.findIndex(({ text }) => text === 'index')
    if (existIndex !== -1) items.splice(existIndex, 1)
    createEntryMd(path.resolve(__dirname, '../src', dir.text), items)
    // 数组形式做侧会有多个分割线
    sidebar[`/${dir.text}/`] = [
      {
        text: dir.text,
        collapsed: true,
        items: [{ text: 'index', link: `/${dir.text}/`}, ...items]
      }
    ]
    return sidebar
  }, {})
}
getSideBar()