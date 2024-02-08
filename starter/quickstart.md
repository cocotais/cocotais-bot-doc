# 快速开始

欢迎你使用 Cocotais Bot！这篇文章可以帮助你快速部署一个实例到你的设备中。

## 下载

Cocotais Bot 发布在 npm 上，推荐使用 npm 下载并部署。
目前，我们推荐为一个机器人实例单独创建一个文件夹并且部署。
在你创建文件夹后，打开终端，在项目目录下运行：

```bash
npm install cocotais-bot
```

如果你的地理位置在中国大陆，你可能需要使用 cnpm 以获取更佳的下载速度：

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org & cnpm install cocotais-bot
```

安装之后，你可以尝试输入以下命令：

```bash
npx cocotais-bot
```

如果一切正常，你应该看到以下输出：

```text
Cocotais Bot 守护进程帮助
版本：1.x.x
使用方法：
  start: 启动机器人
  plugin apply: 装载机器人插件
  plugin reload: 重新装载机器人插件
  plugin delete: 卸载机器人插件
  stop: 停止机器人
```

::: tip
如果你有需要，可以使用 `npm install cocotais-bot -g`（cnpm：`cnpm install cocotais-bot -g`）
将Cocotais Bot安装到全局。但我们仍推荐为每个实例单独创建一个目录。
:::

## 创建配置文件

为了使你的机器人能够启动，你需要对你的实例进行一些配置。

运行以下命令：

```bash
npx cocotais-bot start
```

一般情况下，机器人不会启动，而是会报错退出运行：

```text
[守护进程] 已启动
[守护进程] LaunchBus成功
[后台进程] 启动失败：config.json未创建，已为您创建
[守护进程] 已删除
```

这是正常的。请你将目光投向你的项目目录，机器人实例已经为你自动创建了一个 `config.json`，看起来大概是这样的：

```json
{
    "appID": "",
    "token": "",
    "intents": []
}
```


| 名称          |      类型        |  必填  |
| ------------- | --------------- | ------ |
| appID         | string          | √      |
| token         | string          |   √    |
| intents       | Array\<string\> |    √   |

appID 与 token 需要你前往[QQ开放平台](https://q.qq.com/qqbot/#/developer/developer-setting)获取；
intents 请参照[这里](https://bot.q.qq.com/wiki/develop/api-v2/dev-prepare/interface-framework/event-emit.html#%E4%BA%8B%E4%BB%B6%E8%AE%A2%E9%98%85intents)对照填写。

这是一个填写好的示例：

```json
{
    "appID": "102059584",
    "token": "FgBu4h9PzL7vG11SXyNp8qZQQtwD0Tfo",
    "intents": ["GROUP_AT_MESSAGE_CREATE","C2C_MESSAGE_CREATE"]
}
```

::: danger
请务必不要分享`config.json`给任何陌生人！
:::

接下来，再次运行命令：

```bash
npx cocotais-bot start
```

机器人将会开始在后台正常运行。

## 常见问题

### PM2有其余运行进程。当前版本仅支持独占PM2运行。

::: warning
这是一个已知问题，将会在近几个版本内修复。
:::

当前版本的Cocotais Bot并没有对PM2运行的进程进行分类管理，也就是说Cocotais Bot在PM2中**并不认识**后台进程。
为了确保机器人的正常运行，开发者直接对PM2多进程运行做了限制。

### 连接已死亡，请检查网络或重启

::: warning
这个问题较为复杂，如在阅读完方案后仍无法解决请联系开发者。
:::

一般来说，出现这个错误时，你的PM2后台进程会自动被删除。为了更好地解决问题，你需要采取一些手段以防止它被守护进程自动删除。

首先，运行Cocotais Bot：

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

这时，你的后台进程应该完好地运行在pm2中。运行以下命令查看日志：

```bash
pm2 log
```

你应该会看到**三个**日志分类：

- ~/.pm2/pm2.log
- ~/.pm2/logs/CocotaisBotXXXXXXXXX-out.log
- ~/.pm2/logs/CocotaisBotXXXXXXXXX-error.log

我们只需要查看以`out.log`结尾字样的日志。退出pm2的日志，用你的编辑器手动打开日志文件。

#### 1. 日志文件中包含`Request failed with status code 400`

::: warning
这是一个已知问题，将会在近几个版本内修复。
:::

这个问题一般在Windows平台上出现。请尝试使用WSL或Linux环境运行实例。

#### 2. 日志文件中包含`intents 配置有误`

请参照[这里](https://bot.q.qq.com/wiki/develop/api-v2/dev-prepare/interface-framework/event-emit.html#%E4%BA%8B%E4%BB%B6%E8%AE%A2%E9%98%85intents)对照填写`config.json`中的intents。

#### 3. 日志文件中包含`Error: [object Object]`

你的日志有误。你打开的是文件名以`error.log`结尾的日志文件。请打开文件名以`out.log`结尾的日志，并再次对照排查。
如果你确认你打开的是文件名以`out.log`结尾的日志，请携带完整日志文件联系开发人员。