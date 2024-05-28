# 排序算法
::: tip
可视网站：
1. [algorithm-visualizer](https://algorithm-visualizer.org/divide-and-conquer/quicksort)
2. 
:::
1. 基础排序算法：`冒泡排序、插入排序、选择排序`
2. 进阶排序算法：`归并排序、快速排序`、
  
## 冒泡排序
从第一个元素开始，重复比较相邻的两个项，若第一项比第二项大，则交换两者的位置，反之不动

数组元素有多少个，就要从头到尾循环多少轮：从头到尾遍历数组，对比+交换两个相邻元素
1. 优化版：每轮遍历完后，数组后面的元素已经排序了，不需要再处理了
2. 最佳版：每轮遍历时，添加标记，如果一轮遍历完没有交换数据，说明数组已经是有序的，可以直接退出遍历
:::details 展开查看冒泡代码
:::code-group
```ts [基本冒泡实现]
const bubbleSort = (arr: number[]): number[] => {
  const len: number = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
      }
    }
  }
  return arr
}
```

```ts [改进版]
// 外层循环进行时，数组尾部的元素会逐渐有序，有序部分的遍历是不必要的 时间复杂度O(n^2)
const betterBubbleSort = (arr: number[]): number[] => {
  const len: number = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
      }
    }
  }
}
```

```ts [最好版-时间复杂度o^n]
const bestBubbleSort = (arr: number[]): number[] => {
  const len: number = arr.length
  for (let i = 0; i < len; i++) {
    let flag = false
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
        flag = true
      }
    }
    // 如果一轮遍历中，一次都没有交换，那么数组是有序的，直接跳过返回有序数组即可
    if (!flag) return arr
  }
  return arr
}
```
<<< @/algorithm/Sort/BubbleSort.ts [综合文件版]
:::
### 冒泡的时间复杂度
1. **最好时间复杂度**: 数组本身有序，只需要比较n-1次，不需要交换，时间复杂度为O(n)
2. **最坏时间复杂度**: 数组完全逆序。每一轮的内循环都要执行，时间复杂度是O(n^2)
3. **平均时间复杂度**: O(n^2)

## 选择排序
循环遍历数组，每次都找出当前范围的最小值，放在当前范围的头部；然后缩小排序范围，继续重复执行以上操作，直到数组完全有序

### 排序过程
以[5, 3, 2, 4, 1]为例
1. 范围为[0, 4] -> [5, 3, 2, 4, 1], 遍历范围内的元素，查找当前范围内最小值为`1`, 将`1`放在头部, 即5和1交换 -> `[1, 3, 2, 4, 5]`
2. 范围为[1, 4] -> [3, 2, 4, 5], 遍历范围内的元素，查找当前范围内的最小值为`2`, 将`2`放在头部，即3和2交换 -> `[2, 3, 4, 5]`
3. 范围为[2, 4] -> [3, 4, 5], ...重复上述等步骤，剩下元素已是有序，无需交换，排序结果为: [1, 2, 3, 4, 5]

::: details 展开查看选择排序代码
::: code-group
```ts [选择排序]
const selectSort = (arr: number[]): number[] => {
  const len: number = arr.length
  let minIndex
  for (let i = 0; i < len; i++) {
    minIndex = i
    for (let j = i; j < len; j++) {
      if (arr[j] < arr[minIndex]) minIndex = j
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
  }
  return arr
}
```
<<< @/algorithm/Sort/SelectSort.ts [综合文件]
:::

### 选择排序的时间复杂度
选择排序都要走内层循环做比较，时间量级为O(n^2)

## 插入排序
基于当前元素前面的序列都是有序的，从后往前去寻找当前元素在前面序列里的正确位置：靠前的较大数字要为靠后的较小数字腾出位置(交换位置，保持递增，最后找到当前元素位置并赋值)

### 排序过程
以[5, 3, 2, 4, 1]为例
1. 前面的序列[5], 当前元素为3， 比较3与前面的序列[5]，3 < 5, 5要给3腾出位置(靠前的较大数字要为靠后的较小数字腾出位置) -> [3, 5, 2, 4, 1]
2. 前面的序列[3, 5], 当前元素为2, 比较5和2, 再比较3和2, 3要给2腾位置 -> [2, 3, 5, 4, 1]
3. 前面的序列[2, 3, 5], 当前元素为4, 比较5和4 -> 比较3和4, 靠前元素比靠后元素小，不用往前找，当前位置就是4要填坑的位置 -> [2, 3, 4, 5, 1]
4. 前面的序列[2, 3, 4, 5], 当前元素为1, 比较5和1 -> 比较4和1 -> 比较3和1 -> 比较2和1, 2要给1腾出位置 -> [1, 2, 3, 4, 5]

::: details 展开查看插入排序代码
::: code-group
```ts [插入排序]
const insertOrder = (arr: number[]): number[] => {
  const len: number = arr.length
  let tmp: number
  // 第一个序列就是第一个元素
  for (let i = 1; i < len; i++) {
    let j = i
    tmp = arr[j]
    while (j > 0 && arr[j - 1] > tmp) {
      arr[j] = arr[j - 1]
      j--
    }
    arr[j] = tmp
  }
  return arr
}
```

<<< @/algorithm/Sort/InsertOrder.ts [综合文件]
:::
### 插入排序时间复杂度
1. **最好的时间复杂度**: 数组本身就有序，内层循环直走一次，O(n)
2. **最坏的时间复杂度**: 数组完全逆序，O(n^2)
3. **平均时间复杂的**: O(n^2)

## 分治思想
分治：分而治之，将一个大的问题分解成若干个子问题，针对子问题分别求解后，将子问题的解整合成大问题的解

1. 分解子问题
2. 求解子问题
3. 合并子问题的解，得出大问题的解

## 归并排序
归并排序是典型的分治思想
1. **分解子问题**: 将需要被排序的数组从中间分隔为两半，然后将分隔出来的每个子数组各分割为两半，重复以上操作，直到单个字数组只有一个元素为止
2. **求解每个字问题**: 从粒度最小的子数组开始，两两合并、确保每次合并出来的数组都是有序的（“子问题”指的是对每个子数组进行排序）
3. **合并子问题的解，得出大问题的解**: 当数组被合并到原有的规模时，就得到了一个完全排序的数组

### 排序过程
1. 将数组对半分隔，不断重复，直到每个子数组里都只有一个元素
2. 将规模为1的子数组两两合并为规模为2的子数组，合并时确保有序
3. 将规模为2的子数组合并为规模为4的子数组，并确保有序... -> 4 -> 8

### 编码实现
上述过程主要有两个动作：分隔 + 合并
1. 重复：递归或迭代
2. 分隔再合并即为有去有回：回溯 -> 递归
所以，归并排序主要依据递归实现，其中有序数组的合并涉及：双指针法
::: details 展开查看归并排序代码
<<< @/algorithm/Sort/MergeSort.ts
:::

### 时间复杂度
O(nlog(n))
#### 从逻辑分析
1. 将数组对半分隔&合并，数组长度为n,可以看作分隔log(n)次(2^x=n),那么可以看作一共有log(n)轮的`分隔+合并`
2. 单次合并数组的时间复杂度是O(n)
3. log(n)次合并操作 -> O(nlog(n))

## 快速排序
思想依然是分而治之，但不会把真的数组分隔开再合并到一个新数组中，而是直接在原有数组内部进行排序，将原始的数组分隔成较小和较大的两个数组，然后递归的排序两个子数组

选择一个基准数（中间值），一趟排序将数组分隔成一大一小两个数组，左指针左侧数据都小于基准值，右指针右侧数据都大于基准值。然后再对这两个数组递归分隔排序，直到每个数组长度为1

左指针右移，直至找到一个不小于基准值(>=)的值为止；然后左移动右指针，直到找到一个不大于(<=)基准值的值为止

1. 初始化基准值一般为数组中间的值，左右指针在两端，当`左指针<基准值`或者`右指针>基准值`时，移动指针
2. 循环处理左指针，`左指针数据 < 基准数据`时，右移左指针，直到`左指针数据 >= 基准数据`时，停止移动，继续处理右指针
3. 循环处理右指针，`右指针数据 > 基准数据`时，左移右指针，直到`右指针 <= 基准值数据`时，`交换`左右指针的数据，是的数组有序(基准左侧数据都小于基准，基准右侧数据都大于基准)，然后两个指针同时向中间移动
4. 此时左右指针第一次处理完，可能`左指针 <= 右指针`, 只有序处理了两侧部分数据，指针中间的数据仍然无序，还需要继续处理
5. `继续2-4步骤`，处理比对左右指针和基准值移动交换，直到`左指针 > 右指针`，不再移动, 数组以分隔为一大一小两个数组，以左指针为基准`[[left, splitLine - 1], [splitLine, right]]`
6. 最终左指针左边数字都比它小，左指针右边数字都比它大，最终以左指针为界，分隔为一左一右、一大一小两个子数组
7. 针对两个子数组，递归重复执行以上操作，直到数组完全排序

### 排序过程
以[5, 1, 3, 6, 2, 0, 7]
1. 选取一个基准值，默认为数组中间的值: 6, 左指针数据:5, 右指针数据为:7
2. 左5 < 基准值6，左指针右移，左指针数据：1
3. 左1 < 基准值6, 左指针右移，左指针数据：3
4. 左3 < 基准值6，左指针右移，左指针数据：6
5. 左6 = 基准值6，左指针停止移动，查看右指针
6. 右7 > 基准值6，右指针左移，右指针数据: 0
7. 右0 < 基准值6，交换`右指针值0的位置`和`左指针6的位置`: [5, 1, 3, 0, 2, 6, 7]，基准值仍然为6，只是位置变化了。左右指针同时向中间移动 -> 左：2 右：2
8. 左2 < 基准值6， 右2 < 基准值6，左指针向右移动，左指针数据：6，右指针数据：2
9. 左6 = 基准值6，右2 < 基准值6，两个指针不再移动，左指针左侧都比其小，右指针右侧都比其大，以左指针为轴心划分为一左一右、一大一小两个数组：[5, 1, 3, 0, 2] 和 [6, 7]
10. 两个字数组重复执行上述操作，直到数组完全排序

::: details 展开查看快排代码
<<< @/algorithm/Sort/QuickSort.ts
:::

### 时间复杂度
1. **最好的时间复杂度**: 每次选择的中间值，都刚好是当前子数组的中间数，确保每次分隔都能将数组分隔为两半，进而只需要递归log(n)次，最终为O(nlog(n))
2. **最坏的时间复杂度**: 每次划分渠道的都是当前数组中的最大值/最小值，O(n^2)
3. **平均时间复杂度**: O(nlog(n))