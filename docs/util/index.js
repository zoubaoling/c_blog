import fs from 'fs'
import path from 'path'
const isDirectory = (file) => {
  const stat = fs.statSync(file)
  return stat.isDirectory()
}
const parseTreeObj2Arr = (treeObj) => {
  let resArr = []
  treeObj.forEach(item => {
    if (item.items && item.items.length > 0) {
      resArr = resArr.concat(parseTreeObj2Arr(item.items))
    } else if (item.link) {
      resArr.push(item)
    }
  })
  return resArr
}
export const createEntryMd = (dir, contents = []) => {
  const fullPath = path.join(dir, 'index.md')
  const flatList = parseTreeObj2Arr(contents)
  const lists = flatList.reduce((content, { text, link }, index) => content + '\n' + `[${index+1}. ${text}](${link})\n`, '')
  const renderContents = `# 目录 ${lists}`
  fs.writeFileSync(fullPath, renderContents)
}

export const getDir = (dir = '', hasFile = true, deep = false, baseUrl = '../src') => {
  const fullPath  = path.join(__dirname, `${baseUrl}${dir}`)
  const files = fs.readdirSync(fullPath)
  return files.reduce((acc, file) => {
    const subFillPath = path.join(fullPath, file)
    if (hasFile || isDirectory(subFillPath)) {
      // 获取一层目录或者获取一级目录下的所有文件
      let curData = {
        text: file.replace('.md', ''),
        link: `${dir}/${file.replace(/\.md$/, '')}`
      }
      if (deep && hasFile) {
        if (isDirectory(subFillPath)) {
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
  const excludeDirs = ['program_topic', 'assets']
  const dirs = getDir('', false)
  const valuableDirs = dirs.filter(dir => !excludeDirs.includes(dir.text))
  return valuableDirs.reduce((sidebar, dir) => {
    const items = getDir(`/${dir.text}`, true, true)
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