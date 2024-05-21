<template>
  <button :class="btnClass" @click="getRandomTopic">随机面试题</button>
</template>

<script lang="ts" setup>
import { useCssModule, ref } from 'vue'
import { useData, useRouter } from 'vitepress'
const $style = useCssModule()
const { theme, site } = useData()
const router = useRouter()
const btnClass = ref([$style['random-interview-button'], 'VPButton'])

const transTree2arr = (treeObj: SideBarItem, childProp: string = 'items'): Array<SideBarItem>  => {
  let arr: Array<SideBarItem> = []
  const child = treeObj[childProp]
  if (Array.isArray(child)) {
    const childList = child.reduce(((pre, cur) => pre.concat(transTree2arr(cur))), [])
    arr = arr.concat(childList)
  } else if (JSON.stringify(treeObj) !== '{}') {
    arr.push(treeObj)
  }
  return arr
}
interface SideBarItem {
  items: SideBarItem[];
  [key: string]: any
}
interface SideBar {
  [key: string]: SideBarItem[]
}
const getRandomTopic = () => {
  const links = Object.values(theme.value.sidebar as SideBar)
    .reduce((pre, cur) => pre.concat(cur.reduce((childPre, childCur) => childPre.concat(transTree2arr(childCur)), [] as Array<SideBarItem>)), [] as Array<SideBarItem>)  
  const topicLength = links.length
  const randomIndex = Math.floor(Math.random() * topicLength)
  const base = site.value.base
  const link = links[randomIndex]?.link
  const randomLink = `${base.slice(0, base.length - 1)}${link}`
  router.go(randomLink)
}
</script>

<style lang="less" module>
.random-interview-button {
  display: inline-block;
  background-color: #5672cd;
  color: #ffffff;
  border-radius: 20px;
  padding: 0 20px;
  line-height: 38px;
  border: 1px solid transparent;
  text-align: center;
}
</style>