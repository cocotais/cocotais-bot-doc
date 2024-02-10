# 插件开发

本页面将会带你走进Cocotais Bot的插件开发。

要想在最佳条件下开发你的插件，请务必提前在你的项目文件夹下[部署一个机器人实例](/starter/quickstart)。

## STEP 1：新建插件文件

一般来说，Cocotais Bot的插件都存放在项目目录中的`plugins`文件夹中，你可以提前手动创建这个文件夹。

::: info
自`v1.2.2`开始，插件编写允许使用ESM模块的写法。如果你需要使用ESM模块写法，请将创建的插件文件后缀名改为`.mjs`。
:::

接下来，在文件夹下新建一个文件——`my_first_plugin.js`(ESM: `my_first_plugin.mjs`)。
现在你的目录树看起来应该是这样的：
::: code-group

```text [Common JS]
- plugins
    - my_first_plugin.js
- config.json
- package.json
- package-lock.json
```

```text [ES Module]
- plugins
    - my_first_plugin.mjs
- config.json
- package.json
- package-lock.json
```

:::

## STEP 2：新建插件实例

Cocotais Bot为了方便插件的开发，向外部导出了一个`CocotaisBotPlugin`类。它可以帮助我们实现一个插件。

要想使用它，可以这样引入：

::: code-group

```js [Common JS]
const { CocotaisBotPlugin } = require("cocotais-bot")
```

```js [ES Module]
import { CocotaisBotPlugin } from "cocotais-bot"
```

:::

接下来，是时候用它创建一个插件了！

::: warning
当你的版本≤`v1.1.2`时，你将无法在`CocotaisBotPlugin`的构造器中传值。你的插件名称将会被强制设置为`plugin`，版本不会被定义。
:::


```js
const plugin = new CocotaisBotPlugin("my-first-plugin","0.1.0")
```

其中，`CocotaisBotPlugin`构造器接受了两个参数：

| 名称    | 类型   | 解释     | 必填 |
|---------|--------|--------|------|
| name    | string | 插件名称 | √    |
| version | string | 插件版本 | √    |


## STEP 3：编写业务逻辑

为了让你的插件能够知道自己被安装或者卸载了，`CocotaisBotPlugin`类实现了两个方法：`onMounted`和`onUnloaded`。要想让插件正确收到事件，请**务必**将业务逻辑写在`onMounted`中。同时，如果你不使用`onMounted`，你将无法正常获得机器人的控制对象`IOpenAPI`。

`CocotaisBotPlugin`类是继承了`EventEmitter`的。你可以使用EventEmitter几乎所有的方法，`on`也不例外：

```js
plugin.onMounted((bot)=>{
    plugin.on("GROUP_AT_MESSAGE_CREATE",(event)=>{
        // ...
    })
})
```

::: info
在`v1.3.1`以前，`on`方法的事件并不支持语法补全。我们推荐在编写插件时安装最新的Cocotais Bot版本。
:::

::: info
在目前，`on`方法的接收函数并不支持语法补全。它目前的定义类似于这样：
```ts
on(event: AllEvents, listener: Function): this;
```
我们将在近几个版本将其优化成这样：
```ts
on<E extends AllEvents>(event: E, listener: BotEventHandler<E>): this;
```
:::

`plugin.onMounted`函数里，接收函数的参数`bot`的类型是`IOpenAPI`，这是机器人的控制对象，内包含机器人的各种收发方法。`plugin.on`函数里，接收函数的参数`event`的类型**目前**为`any`，为了避免出现问题，你可以对照 [QQ机器人文档](https://bot.q.qq.com/wiki/develop/api-v2/)里的`事件`文档 和 [接收到的通知示例](https://bot.q.qq.com/wiki/develop/nodesdk/wss/model.html#%E6%8E%A5%E6%94%B6%E5%88%B0%E7%9A%84%E9%80%9A%E7%9F%A5%E7%A4%BA%E4%BE%8B) 进行编写，我们也会尽快优化本文档。

这是一个简单的示例：
```js
plugin.onMounted((bot)=>{
    plugin.on("GROUP_AT_MESSAGE_CREATE",(event)=>{
        bot.groupApi.postMessage(event.msg.group_openid, {
            content: "Hi",
            msg_type: 0,
            msg_id: event.msg.id
        })
    })
})
```
实现了当收到群@消息时，会自动对消息回复Hi。

## STEP 4：导出插件实例

在编写完插件的主要逻辑后，是时候导出插件了。Cocotais Bot仅支持将插件设置为**默认导出**：

::: code-group

```js [Common JS]
module.export = plugin;
```

```js [ES Module]
export default plugin;
```

:::

这是完整的插件示例：
::: code-group

```js [Common JS]
const { CocotaisBotPlugin } = require("cocotais-bot")

const plugin = new CocotaisBotPlugin("my-first-plugin","0.1.0")

plugin.onMounted((bot)=>{
    plugin.on("GROUP_AT_MESSAGE_CREATE",(event)=>{
        bot.groupApi.postMessage(event.msg.group_openid, {
            content: "Hi",
            msg_type: 0,
            msg_id: event.msg.id
        })
    })
})

module.export = plugin;

```

```js [ES Module]
import { CocotaisBotPlugin } from "cocotais-bot"

const plugin = new CocotaisBotPlugin("my-first-plugin","0.1.0")

plugin.onMounted((bot)=>{
    plugin.on("GROUP_AT_MESSAGE_CREATE",(event)=>{
        bot.groupApi.postMessage(event.msg.group_openid, {
            content: "Hi",
            msg_type: 0,
            msg_id: event.msg.id
        })
    })
})

export default plugin;
```

:::

## STEP 5：运行插件

在完成插件的编写后，是时候运行插件，验收你的学习成果了！返回你的项目根目录，运行以下命令：

```bash
npx cocotais-bot start
```

::: info
自`v1.2.0-0`开始，在运行`npx cocotais-bot start`时会自动装载`plugins`文件夹下的所有插件。
如果你的版本＜`v1.2.0-0`，请再多运行一行：
```bash
npx cocotais-bot plugin apply ./plugins/my_first_plugin.js
```
:::

此时，你的机器人应该已经启动，并且插件也正常运行，可以尝试在群里@机器人进行测试。

测试完毕后，运行以下命令：
```bash
npx cocotais-bot plugin list
```
你应该可以看到你的插件名称和版本。

恭喜你，完成了你的第一个插件的开发！