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

## 终端nvm常见指令
1. `nvm ls` 查看已经下载版本
2. `nvm ls-remote` 查看可用版本号，LTS是长期稳定版本
3. `nvm install --lts` 安装最新稳定LTS版本
4. `nvm use --lts` 切换到LTS稳定版本
5. `nvm alias default v20.0.0` 设置置顶版本为默认版本