/**
 * @description 数组转换成树对象数组; 扁平 > 父子关系 children
 * [{id, name, pid }] -->> [{id, name, pid, children: [{id, name, pid, children]}]
 * 使用Map存储映射关系
 */
const arrayToTree = (arr = []) => {
  const resArr = []
  const tmpMap = new Map()
  arr.forEach((item) => {
    const curObj = { ...item, children: [] }
    tmpMap.set(item.id, curObj)
    const hasParent = tmpMap.has(item.pid) 
    if (!hasParent) {
      resArr.push(curObj)
    } else {
      const parentObj = tmpMap.get(item.pid)
      parentObj.children.push(curObj)
    }
  })
  return resArr
}
const list = [
  {id: 1, name: '部门1', pid: 0},
  {id: 2, name: '部门1-1', pid: 1},
  {id: 3, name: '部门1-2', pid: 1},
  {id: 4, name: '部门1-1-1', pid: 2},
  {id: 5, name: '部门1-2-1', pid: 3},
  {id: 6, name: '部门2', pid: 0},
  {id: 7, name: '部门2-1', pid: 6},
  {id: 8, name: '部门3', pid: 0},
]
const treeList = arrayToTree(list)
console.log(treeList)