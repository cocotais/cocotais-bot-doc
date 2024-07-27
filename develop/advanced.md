# 插件进阶

::: info
本页面要求你的 Cocotais Bot 版本在 `1.5.0` 及以上。
如你的版本号 `＜1.5.0` ，请阅读 [插件进阶(旧)](/develop/legacy/advanced)
:::

本页面将会带你开发 Cocotais Bot 的进阶插件。

要想在最佳条件下开始学习，请先阅读 [插件开发](./plugins)。

## 1. 什么是插件？

插件是 Cocotais Bot 的核心，可以让你的机器人更加强大。一个插件不仅可以负责处理消息、管理群组，还可以对插件事件进行控制等。在 [插件开发](./plugins) 中，你已经完成了一个最基本的插件：

::: code-group

```js [Common JS]
const { CocotaisBotPlugin } = require("cocotais-bot");

const plugin = new CocotaisBotPlugin("my-first-plugin", "0.1.0");

plugin.onMounted((bot) => {
    plugin.on("message.group", (event) => {
        event.reply("Hi")
    });
});

module.exports = plugin;
```

```js [ES Module]
import { CocotaisBotPlugin } from "cocotais-bot";

const plugin = new CocotaisBotPlugin("my-first-plugin", "0.1.0");

plugin.onMounted((bot) => {
    plugin.on("message.group", (event) => {
        event.reply("Hi")
    });
});

export default plugin;
```

:::

这个插件实现了当接收到群@消息时，回复 `Hi` 。

## 2. 剖析构造函数

在插件开发中，你可以使用 `new CocotaisBotPlugin` 新建一个插件。

```js plugin.js
const plugin = new CocotaisBotPlugin("my-first-plugin", "0.1.0");
```

这是这个构造函数的实现：

```ts
export class CocotaisBotPlugin extends EventEmitter {
    /**机器人实例 */
    private botContext: IOpenAPI | null;
    /**WebSocket实例 */
    private botWs: EventEmitter | null;
    /**事件实例 */
    private botEvent: EventEmitter | null;
    /**挂载插件时执行的函数 */
    protected _mount: (bot: IOpenAPI) => void
    /**卸载插件时执行的函数 */
    protected _unmount: () => void
    // ...
    /**插件ID */
    public id: number | null
    /**插件基本信息 */
    public config: {
        name: string
        version: string
    }
    constructor(name: string, version: string) {
        super()
        this.botContext = null;
        this.botWs = null;
        this.botEvent = null;
        this._mount = () => { };
        this._unmount = () => { };
        // ...
        this.id = null
        this.config = {
            name: name,
            version: version
        }
    }
    // ...
}
```

可以看到，`constructor` 里只做了一件事：初始化插件。构造函数接收两个参数：`name` 和 `version` 。在被调用时，会将插件的各个内部成员赋初始值，随后将插件名和版本号赋给 `config` 。

## 3. `onMounted` & `onUnloaded`

`onMounted` 与 `onUnloaded` 是插件开发中的重要函数，他们与插件的生命周期息息相关。`onMounted` 在插件挂载时执行，`onUnloaded` 在插件卸载时执行。开发者可通过这两个函数来对插件的挂载与卸载做出处理。

```js
plugin.onMounted((bot) => {
    plugin.on("message.group", (event) => {
        event.reply("Hi")
    });
});
```

在 `onMounted` 中，我们通过 `plugin.on` 监听了 `message.group` 事件，当收到群消息时，会回复 `Hi` 。
但是，在 [插件开发](./plugins) 中的插件示例没有体现到 `onUnloaded` 的作用。在这里，让我们来在示例中使用 `onUnloaded` 。

```js
plugin.onUnloaded(() => {
    console.log("插件卸载了");
});
```

当插件被卸载时，会执行 `onUnloaded` 函数，并打印出 `插件卸载了` 。

看到这里，想必你对 `onMounted` 与 `onUnloaded` 的实现感到好奇，让我们来查看一下它们的实现：

```ts
export class CocotaisBotPlugin extends EventEmitter {
    // ...
    protected _mount: (bot: IOpenAPI) => void
    protected _unmount: () => void
    // ...
    constructor(/* ... */) {
        // ...
        this._mount = () => { };
        this._unmount = () => { };
        // ...
    }
    // ...
    enableBot(context: IOpenAPI, /* ... */) {
        // ...
        this._mount(context)
        // ...
    }
    disableBot() {
        // ...
        this._unmount()
        // ...
    }
    // ...
    onMounted(fun: (bot: IOpenAPI) => void) {
        this._mount = fun
    }
    onUnloaded(fun: () => void) {
        this._unmount = fun
    }
    // ...
}
```
`onMounted` 与 `onUnloaded` 的实现很简单，它们只是将传入的函数赋给 `_mount` 与 `_unmount` 。
当插件被挂载时，会执行 `_mount` 函数，当插件被卸载时，会执行 `_unmount` 函数。

## 4. 插件事件

在插件开发中，我们通过 `plugin.on` 监听了 `message.group` 事件，当收到群消息时，会回复 `Hi` 。
得益于 `EventEmitter` 的特性， `CocotaisBotPlugin` 的事件监听器 `on` 与 `once` 都是 `EventEmitter` 的实例方法，因此，你可以在插件中监听任何发出的事件。

为了实现较好的语法补全，Cocotais Bot 对 `CocotaisBotPlugin` 的 `on` 与 `emit` 方法的类型定义进行了重写：

```ts
export type EventList = {
    'guild.add': /* ... */,
    'guild.update': /* ... */,
    'guild.delete': /* ... */,
    // ...
}
export interface CocotaisBotPlugin {
    on<T extends keyof EventList>(event: T, listener: (arg: EventList[T]) => void): this;
    emit<T extends keyof EventList>(event: T, argument: EventList[T]): boolean;
}
```

这样，当你在插件中监听事件时，会得到完整的类型提示与语法补全。

在 `1.5.0` 版本中，我们引进了全新的事件系统。其实现相较于旧版的事件系统，更加易懂，但实现也相对较复杂。如果你感兴趣，可以参考 [深入源码(WIP)](./deep-in-source) 。

## 5. 快捷方法

Cocotais Bot 提供了一些快捷方法，它们可以让你更方便地使用插件。

回到示例插件，可以注意到这几行：

```js
plugin.on("message.group", (event) => {
    event.reply("Hi")
});
```

`event` 在这里是一个 `GroupMessageEvent` 对象，它包含了群消息事件相关信息。一般来说，事件对象只会包括从服务端接收到的数据。在 `1.5.0` 版本中，Cocotais Bot 将这些原始数据进行了分类，使其更加易读。但是，这种做法并无法改善事件对象的使用体验。为此，在 `1.5.0` 版本的后几个提交中，我们对特定的事件与数据类型实现了一些快捷方法。

在这个例子中，`event` 对象有一个快捷方法 `reply` ，它可以直接回复群消息，无需你再使用 `bot.groupApi.postMessage` 。同时，`event.user` 对象有有一个快捷方法 `at` ，可以用来生成@此成员的字符串。

Cocotais Bot 提供了以下快捷方法：

#### `reply`

适用于：各个消息事件

作用：快速回复收到的消息

定义：
```ts
reply: ((content: string | Omit<MessageToCreate, "msg_id"> | Omit<GMessageToCreate, "msg_id">) => void)
```

#### `at`

适用于：群与文字子频道的成员

作用：生成对一个成员的@字符串

定义：
```ts
at: () => string
```

#### `at_everyone`

适用于：各个频道事件的文字子频道

作用：生成@全体成员的字符串

定义：
```ts
at_everyone: () => string
```

对于这些快捷方法的实现，此处不再赘述。请阅读 [深入源码(WIP)](./deep-in-source) 。

## 6. 指令系统

在插件开发中，你可以使用指令系统来控制插件的行为。它的类型定义如下：

```ts
    command = {
        name: string,
        register<T extends 'guild' | 'group' | 'direct' | 'c2c'>(match: string, desc: string, fun: (type: T, msgs: string[], event: T extends 'group' ? GroupMessageEvent : T extends 'c2c' ? C2cMessageEvent : GuildMessageEvent) => void): void
        unregister(id: number): void
    }
```

使用示例：
```js command.js
import { CocotaisBotPlugin } from "./plugin";

const plugin = new CocotaisBotPlugin("command-plugin", "1.0.0");

plugin.onMounted((_) => {
    plugin.command.register("/test", "测试指令", (type, msgs, event) => {
        console.log(msgs[1]);
    });
});

export default plugin;
```

在插件装载后，对机器人发送消息：
```
@机器人 /test hello
```

查看PM2日志，发现了输出：
```
hello
```

对于指令系统的实现，此处不再赘述。请阅读 [深入源码(WIP)](./deep-in-source) 。