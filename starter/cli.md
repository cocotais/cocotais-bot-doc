# CLI 用法

CLI 是你在使用各种程序时必不可少的一个工具。这篇文章会带你走进 Cocotais Bot CLI。

## 基本使用

在你阅读 [快速开始](/starter/quickstart) 的时候，你已经对 CLI 的用法进行了一次预习。这是一份完整的使用说明：

```shell
npx cocotais-bot                        # 显示帮助信息
npx cocotais-bot help                   # 显示帮助信息

npx cocotais-bot start                  # 启动机器人
npx cocotais-bot start --no-autoload    # 启动机器人，禁用自动加载插件(v1.2.0-0)

npx cocotais-bot plugin apply <目录>    # 运行位于目录的插件
npx cocotais-bot plugin reload <ID>     # 重载对应ID的插件
npx cocotais-bot plugin remove <ID>     # 删除对应ID的插件
npx cocotais-bot plugin list            # 查看插件列表
```

更加具体的使用说明，可以在 [Readme](https://www.npmjs.com/package/cocotais-bot?activeTab=readme) 上找到

## 常见问题

### PM2 有其余运行进程。当前版本仅支持独占 PM2 运行。

::: warning
这是一个已知问题，将会在近几个版本内修复。
:::

当前版本的 Cocotais Bot 并没有对 PM2 运行的进程进行分类管理，也就是说 Cocotais Bot 在 PM2 中**并不认识**后台进程。
为了确保机器人的正常运行，开发者直接对 PM2 多进程运行做了限制。

### 连接已死亡，请检查网络或重启

::: warning
这个问题较为复杂，如在阅读完方案后仍无法解决请联系开发者。
:::

一般来说，出现这个错误时，你的 PM2 后台进程会自动被删除。为了更好地解决问题，你需要采取一些手段以防止它被守护进程自动删除。

首先，运行 Cocotais Bot：

```bash
npx cocotais-bot start
```

在终端出现以下字样时，立即使用 Ctrl+C 终止运行：

```text
[守护进程] LaunchBus成功
[守护进程] 已启动
[后台进程] 成功收到测试消息回复
[后台进程] 成功收到Ping消息
```

```text
终止批处理操作吗(Y/N)? Y
```

这时，你的后台进程应该完好地运行在 pm2 中。运行以下命令查看日志：

```bash
pm2 log
```

你应该会看到**三个**日志分类：

- `~/.pm2/pm2.log`
- `~/.pm2/logs/CocotaisBotXXXXXXXXX-out.log`
- `~/.pm2/logs/CocotaisBotXXXXXXXXX-error.log`

我们只需要查看以 `out.log` 结尾字样的日志。退出 pm2 的日志，用你的编辑器手动打开日志文件。

#### 1. 日志文件中包含 `Request failed with status code 400`

::: warning
这是一个已知问题，将会在近几个版本内修复。
:::

这个问题一般在 Windows 平台上出现。请尝试使用 WSL 或 Linux 环境运行实例。

#### 2. 日志文件中包含 `intents 配置有误`

请参照 [这里](https://bot.q.qq.com/wiki/develop/api-v2/dev-prepare/interface-framework/event-emit.html#%E4%BA%8B%E4%BB%B6%E8%AE%A2%E9%98%85intents) 对照填写 `config.json` 中的 intents。

#### 3. 日志文件中包含 `Error: [object Object]`

你的日志有误。你打开的是文件名以 `error.log` 结尾的日志文件。请打开文件名以 `out.log` 结尾的日志，并再次对照排查。
如果你确认你打开的是文件名以 `out.log` 结尾的日志，请携带完整日志文件联系开发人员。
