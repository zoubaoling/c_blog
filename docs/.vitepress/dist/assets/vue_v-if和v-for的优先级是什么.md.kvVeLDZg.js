import{_ as e,c as a,o as i,a3 as o}from"./chunks/framework.BmlUaO9n.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"vue/v-if和v-for的优先级是什么.md","filePath":"vue/v-if和v-for的优先级是什么.md","lastUpdated":1714298906000}'),r={name:"vue/v-if和v-for的优先级是什么.md"},t=o('<h2 id="v-if和v-for的优先级是什么" tabindex="-1">v-if和v-for的优先级是什么 <a class="header-anchor" href="#v-if和v-for的优先级是什么" aria-label="Permalink to &quot;v-if和v-for的优先级是什么&quot;">​</a></h2><ul><li>v-if 是条件渲染，条件为true时，才会渲染组件</li><li>v-for是基于数组渲染列表，最好每一项给一个唯一key，方便diff算法 v-for 的优先级比v-if高，会先判断v-for，再判断v-if 如果同时存在v-for和v-if时，会先执行v-for,列表的每一项中再执行v-if</li></ul><h3 id="注意事项" tabindex="-1">注意事项 <a class="header-anchor" href="#注意事项" aria-label="Permalink to &quot;注意事项&quot;">​</a></h3><ul><li>v-for和v-if不要同时使用，会带来性能的浪费：v-for的每一项都会使用v-if判断</li><li>如果要避免同时出现的情况，可以在外部包裹template（不会渲染DOM），然后用v-if判断，内部再使用v-for遍历</li><li>如果条件出现在循环内部，可以先使用computed对列表进行过滤</li></ul>',4),f=[t];function v(_,l,s,c,n,d){return i(),a("div",null,f)}const p=e(r,[["render",v]]);export{h as __pageData,p as default};
