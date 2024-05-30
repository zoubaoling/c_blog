/**
 * @description 扫地机器人问题
 * 题目描述：房间（用格栅表示）中有一个扫地机器人。格栅中的每一个格子有空和障碍物两种可能。
 * 扫地机器人提供4个API，可以向前进，向左转或者向右转。每次转弯90度。
 * 当扫地机器人试图进入障碍物格子时，它的碰撞传感器会探测出障碍物，使它停留在原地。
 * 请利用提供的4个API编写让机器人清理整个房间的算法
 * 
 * 示例:
 * 输入:
 * room = [
 * [1,1,1,1,1,0,1,1],
 * [1,1,1,1,1,0,1,1],
 * [1,0,1,1,1,1,1,1],
 * [0,0,0,1,0,0,0,0],
 * [1,1,1,1,1,1,1,1]
 * ],
 * row = 1,
 * col = 3
 * 解析: 房间格栅用0或1填充。0表示障碍物，1表示可以通过。 机器人从row=1，col=3的初始位置出发。在左上角的一行以下，三列以右。
 * 
 * 注意:
 * 输入只用于初始化房间和机器人的位置。你需要“盲解”这个问题。换而言之，你必须在对房间和机器人位置一无所知的情况下，只使用4个给出的API解决问题。 
 * 扫地机器人的初始位置一定是空地。
 * 扫地机器人的初始方向向上。
 * 所有可抵达的格子都是相连的，亦即所有标记为1的格子机器人都可以抵达。
 * 可以假定格栅的四周都被墙包围。
 * 
 */
interface Robot {
  // 若下一个方格为空，则返回true，并移动至该方格
  // 若下一个方格为障碍物，则返回false，并停留在原地
  move(): boolean
  // 在调用turnLeft/turnRight后机器人会停留在原位置
  // 每次转弯90度
  turnLeft(): void
  turnRight(): void
  // 清理所在方格
  clean(): void
}
export const cleanRoom = (robot: Robot): void => {
  const cleanSet = new Set()
  // 机器人方向 上-0 右-90 下-180 左-270
  let curDir: number = 0

  interface DirStragetyType {
    [key: number]: (x: number, y: number) => number[]
  }

  const dirStragety: DirStragetyType = {
    0 (x, y) { // 方向上
      return [x - 1, y]
    },
    90 (x, y) { // 方向右
      return [x, y + 1]
    },
    180 (x, y) { // 方向下
      return [x - 1, y]
    },
    270 (x, y) { // 方向左
      return [x, y - 1]
    }
  }

  const dfs = (robot: Robot, i: number, j: number): void => {
    const indexStr: string = `${i}-${j}`
    // 网格已清除，不必再清扫
    if (cleanSet.has(indexStr)) return
    // 清除
    robot.clean()
    // 标记网格已清除
    cleanSet.add(indexStr)

    // 探索四个方向, 默认向上
    for (let k = 0; k < 4; k++) {
      if (robot.move()) { // 如果前面没有障碍物，那么前进递归处理，最终调整方向前进回退到到原点，再调整回之前的方向，仿佛没有改变过
        // 已经前进，递归处理当前网格：清理 + 递归四个方向
        dfs(robot, ...dirStragety[curDir](i, j) as [number, number])
        // 掉头，旋转180
        robot.turnRight() // 一次旋转90
        robot.turnRight()
        // 前进，回到原来的位置
        robot.move()
        // 调整方向，回到最开始前进之前的方向
        robot.turnRight()
        robot.turnRight()
      }
      // 不能前进，或者前进已经递归处理完并回退回来并调整会原来的方向
      // 向右旋转探索下一个方向 上 右 下 左
      robot.turnRight()
      // 修改机器人的方向 限制在360度以内 固定四个值
      curDir = (curDir + 90) % 360
    }
  }
  dfs(robot, 0, 0)
}
