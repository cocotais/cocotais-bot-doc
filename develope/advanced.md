# 插件进阶

本页面将会带你开发 Cocotais Bot 的进阶插件。

要想在最佳条件下开始学习，请先阅读 [插件开发](./plugins)。

## 1. 什么是插件？

插件是 Cocotais Bot 的核心，可以让你的机器人更加强大。一个插件不仅可以负责处理消息、管理群组，还可以对插件事件进行控制等。这是一个示例：

```js plugin_A.js
import { IOpenAPI } from "qq-bot-sdk";
import { CocotaisBotPlugin } from "./plugin";
import { EventEmitter } from "events";

export default {
    config: {
        name: "time-set",
        version: "1.0.0"
    },
    enableBot(_context, _ws, _botId) {
        CocotaisBotPlugin.prototype.emit('TIME',{
            eventType: "TIME",
            eventId: "",
            msg: {
                value: Date.now()
            }
        })
    },
    disableBot() {
        
    },
}
```

```js plugin_B.js
import { CocotaisBotPlugin } from "./plugin";

const plugin = new CocotaisBotPlugin("time-get", "1.0.0");

plugin.onMounted((_)=>{
    plugin.on('TIME',(arg)=>{
        console.log(arg.msg.value)
    })
})

export default plugin
```

在机器人以`--no-autoload`模式启动后，运行以下代码：
```bash
npx cocotais-bot plugin apply ./plugins/plugin_B.js
npx cocotais-bot plugin apply ./plugins/plugin_A.js
```
在PM2日志中，可以看到一个时间戳输出：
```
1708390975998
```

在以上示例中，plugin_A.js通过操作`CocotaisBotPlugin.prototype.emit`方法，触发了plugin_B.js中的`TIME`事件。

## 2. onMounted与onUnloaded

在插件开发中，你可以使用onMounted和onUnloaded方法来监听插件的初始化和卸载。

```js plugin.js
import { CocotaisBotPlugin } from "./plugin";

const plugin = new CocotaisBotPlugin("my-plugin", "1.0.0");

plugin.onMounted((_)=>{
    console.log("Hi!")
})
plugin.onUnloaded(()=>{
    console.log("Bye!")
})

export default plugin
```

这是两个方法的类型定义：

```ts
onMounted(fun: (bot: IOpenAPI) => void) : void
onUnloaded(fun: () => void) : void
```

可以看到，onMounted里的函数有一个参数：bot，这是一个`IOpenAPI`的实例，包含机器人的各种方法。插件需要这些方法以操作机器人。而onUnloaded里的函数则没有参数。

## 3. 插件指令

::: danger
插件指令在`v1.3.0`被首次引入，但直到`v1.4.0-3`才被完全实现。如你的机器人版本＜`v1.4.0-3`，请继续使用`plugin.on`方法。
:::

::: warning
目前插件指令仅在群聊与文字子频道中工作良好，请不要在私聊场景中使用。
:::

在插件开发中，你可以使用插件指令来控制插件的行为。它的定义如下：

```ts
    command = {
        /**
         * 机器人ID
         * @type number
         */
        id: -1,
        /**
         * 注册一个命令
         * @param match 命令匹配器
         * @param desc 命令描述
         * @param fun 命令执行器
         * @returns 命令ID
         */
        register(match: string, desc: string, fun: (msgs: string[], event: WsResponse<any>) => void) : number
        /**
         * 卸载一个命令
         * @param id 命令ID
         */
        unregister(id: number) : void
        }
    }
```

使用示例：
```js command.js
import { CocotaisBotPlugin } from "./plugin";

const plugin = new CocotaisBotPlugin("command-plugin", "1.0.0");

plugin.onMounted((_)=>{
    plugin.command.register("/test", "测试指令", (msgs, event) => {
        console.log(msgs[1])
    })
})

export default plugin
```

在插件装载后，在群/文字子频道中对机器人发送这个消息：
```
@机器人 /test hello
```

查看PM2日志，发现了输出：
```
hello
```