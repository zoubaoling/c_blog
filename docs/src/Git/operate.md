# Git 操作记录
## 使用.gitignore忽略已经提交过的文件
> gitignore只会忽略未提交的未被跟踪的文件

场景：如果一个目录dist已经提交过追踪了，现在希望忽略dist目录，如何操作？

1. .gitignore中添加要忽略的目录配置: `docs/.vitepress/dist/`
2. 移除Git已缓存的dist目录: `git rm -r --cached docs/.vitepress/dist`
   - 从Git缓存中删除，但是保留本地文件
   - 执行完之后，对应的删除记录会添加本地仓库中`staged changes`
3. 添加gitignore更改: `git add .gitignore`，`staged changes`在2(dist缓存删除)的基础上再添加gitignore文件
4. 提交gitignore更改: `git commit -m ''`
5. 推送更改: `git push`
6. 测试：再次build更新dist目录，修改gitignore文件，`changes`状态栏里随配置更改即时显隐dist内容

## 场景：将main分支的最新内容更新到本地功能分支-rebase
1. `git checkout feat-loginout` 切换到本地功能分支
2. `git fetch origin main` 拉取远程main分支的更新
3. `git rebase origin/main` 将当前分支feat-loginout最新提交节点移动到目标分支 origin/main上——最终效果是一个线性，没有多余的合并提交

## stash: 更新分支前后内容冲突
1. `git stash save "描述存储内容" -u`
2. `git pull`
3. `git stash pop stash@{0}` 使用存储内容并删除记录——pop：使用并删除；apply：使用；drop: 删除；clear：清除所有
4. `git stash show stash@{0}` 同一个文件前后存在冲突，查看存储内容是否还有用
5. `git stash drop stash@{0}` 删除指定存储

## 多分支问题
### 本地合并
> main feat-loginout feat-logic
1. git switch main
2. git pull origin main
3. git merge feat-loginout
4. 解决冲突，提交合并 git add <冲突文件> -> git commit
5. git push origin main
6. git switch feat-loginout
7. git merge main
8. git push
9. feat-loginout分支开发功能

### Pull Request(PR)
1. git push origin feat-logic/feat-loginout
2. GitHub上创建PR
3. 代码审查和讨论
4. 合并PR
5. 删除功能分支（可选）
6. git checkout feat-logic
7. git merge main

### 定期同步主分支
> 建议每天工作前同步/完成一个小功能就同步/提交PR前最后同步一次
1. git checkout main
2. git pull origin main
3. git checkout feat-logic
4. git merge main

## git 工作流程
```sh
# 1. 开始新功能开发
git checkout main
git pull origin main
git checkout -b feat/new-feature

# 2. 开发过程中定期同步
git checkout main
git pull origin main
git checkout feat/new-feature
git merge main

# 3. 完成功能开发
git add .
git commit -m "feat: 完成新功能开发"

# 4. 最后同步一次
git checkout main
git pull origin main
git checkout feat/new-feature
git merge main

# 5. 推送并创建 PR
git push origin feat/new-feature
# 在 GitHub 上创建 PR

# 6. PR 合并后清理
git checkout main
git pull origin main
# 可选，也可以继续开发
git branch -d feat/new-feature
git push origin --delete feat/new-feature
```

### 取消文件修改
取消已修改文件的修改-未暂存的修改，文件恢复到最近一次提交的状态，不会影响已经add的文件，不会影响未追踪的新文件
1. `git checkout -- 文件名` 
2. `git checkout -- .`
3. `git restore .`
4. `git checkout -- 目录名/`
5. `git checkout -- *.js`

取消未追踪文件的修改
1. 

## 终端nvm常见指令
1. `nvm ls` 查看已经下载版本
2. `nvm ls-remote` 查看可用版本号，LTS是长期稳定版本
3. `nvm install --lts` 安装最新稳定LTS版本
4. `nvm use --lts` 切换到LTS稳定版本
5. `nvm alias default v20.0.0` 设置置顶版本为默认版本

## mac快捷键
1. 控制程序坞显示：`cmd + option/alt + D`
2. 控制其动态 `ctrl + enter`
3. 调出所有程序窗口 `ctrl + up/down`
4. 左右切换相邻程序 `ctrl + left/right`
5. 控制搜索 `cmd + space`
6. 打开访达搜索 `cmd + alt/option + space`

## 编辑器快捷键
1. 跳转到定义：F12 / cmd + F12
2. 查看定义: Alt + F12
3. 跳转到实现: cmd + F12
4. 跳转到引用: shift + F12
5. 光标选中所有使用的地方: cmd + D
6. 打开当前文件大纲，快速跳转到选中方法: cmd + shift + .
7. 打开当前文件大纲，快速跳转到选中变量、方法: cmd + shift + o
8. 搜索整个项目中的符号(函数、接口、类、变量等): cmd + T
9. 行注释: shift + option + A
10. 撤销光标选择: cmd + U
11. 不同页面间跳转: cmd + alt + <-/->
12. 切换terminal显示隐藏: cmd + J
13. 触发参数提示: cmd + shift + space
14. 取消建议: esc
15. 接受建议: tab
