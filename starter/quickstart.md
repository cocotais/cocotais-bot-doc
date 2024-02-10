# 快速开始

欢迎你使用 Cocotais Bot！这篇文章可以帮助你快速部署一个实例到你的设备中。

## 准备

- [Node.js](https://nodejs.org/) 18 及以上版本。
- 通过 命令行界面 (CLI) 访问 Cocotais Bot 的终端。

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

```
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
如果你有需要在同一环境下部署多个机器人实例，可以使用 `npm install cocotais-bot -g`（cnpm：`cnpm install cocotais-bot -g`）将 Cocotais Bot 安装到全局，这样，你可以在任意目录下运行 `npx cocotais-bot start` 以创建一个新的机器人实例。但是，我们**并不推荐**将这种方法运用到只需要部署一个机器人实例的场景。{#multi-bot}
:::

如果你在安装时遇到了问题，请查看 [这里](#常见问题)

## 创建配置文件

为了使你的机器人能够启动，你需要对你的实例进行一些配置。

运行以下命令：

```bash
npx cocotais-bot start
```

一般情况下，机器人不会启动，而是会报错退出运行：

```
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

| 名称    | 类型            | 必填 |
| ------- | --------------- | ---- |
| appID   | string          | √    |
| token   | string          | √    |
| intents | Array\<string\> | √    |

appID 与 token 需要你前往 [QQ 开放平台](https://q.qq.com/qqbot/#/developer/developer-setting) 获取；
intents 请参照 [这里](https://bot.q.qq.com/wiki/develop/api-v2/dev-prepare/interface-framework/event-emit.html#%E4%BA%8B%E4%BB%B6%E8%AE%A2%E9%98%85intents) 对照填写。

这是一个填写好的示例：

```json
{
    "appID": "102059584",
    "token": "FgBu4h9PzL7vG11SXyNp8qZQQtwD0Tfo",
    "intents": ["GROUP_AT_MESSAGE_CREATE","C2C_MESSAGE_CREATE"]
}
```

::: danger
请务必不要分享 `config.json` 给任何陌生人！
:::

接下来，再次运行命令：

```bash
npx cocotais-bot start
```

机器人将会开始在后台正常运行。如果并不是这样，请查阅 [CLI 常见问题](/starter/cli#常见问题)

## 常见问题

### 1. 出现类似于 `cocotais-bot: command not found` 的错误

这通常有两种可能：

1. 你没有使用`npx`运行 Cocotais Bot。我们推荐使用`npx cocotais-bot`来控制机器人实例，尽管你可能使用了全局安装。
2. 当前的项目目录下没有安装 Cocotais Bot。请尝试跟随 [步骤](#下载) 在目录中安装 Cocotais Bot。

### 2. 如何在只安装一次 CLI 的情况下部署多个机器人实例？

请参见 [这个提示](#multi-bot) 进行安装。
