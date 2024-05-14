/**
 * @description 树对象转数组
 * [ { id: '', name: '', pid: '', children: [{ id, name, pid, children}] } ] -->> [{ id: '', pid: '', name: ' }]
 */
const treeToArr = (treeObjArr = {}) => {
  let resArr = []
  treeObjArr.forEach(item => {
    const { children = [], ...restInfo } = item
    resArr.push(restInfo)
    if (children.length) {
      const childArr = treeToArr(children)
      resArr = resArr.concat(childArr)
    }
  });
  return resArr
}
const listTree = [
  {
    id: 1,
    name: '部门1',
    pid: 0,
    children: [
      {
        id: 2,
        name: '部门1-1',
        pid: 1,
        children: [
          {
            id: 4, 
            name: '部门1-1-1', 
            pid: 2,
            children: []
          }
        ]
      },
      {
        id: 3,
        name: '部门1-2',
        pid: 1,
        children: [
          {
            id: 5, 
            name: '部门1-2-1', 
            pid: 3,
            children: []
          }
        ]
      }
    ]
  },
  {
    id: 6,
    name: '部门2',
    pid: 0,
    children: [
      {
        id: 7, 
        name: '部门2-1', 
        pid: 6,
        children: []
      }
    ]
  },
  {
    id: 8,
    name: '部门3',
    pid: 0,
    children: []
  }
]

const treeArray = treeToArr(listTree)
console.log(treeArray)