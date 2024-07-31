<script setup lang="ts">
    const params = window.location.search.substring(1).split('&').reduce((acc, cur) => {
        const [key, value] = cur.split('=');
        acc[key] = value;
        return acc;
    }, {} as Record<string, string>);
</script>

<a v-if="'return' in params" :href="params['return']"> ⬅️ 返回 </a>

# 旧版 Node.js 升级指南

欢迎你跟随本指南升级你的 Node.js 版本。Cocotais Bot 使用 `PM2` 管理其机器人实例，而旧版的 Node.js 对 `PM2` 的支持性较差，所以需要你升级到 20+ 的版本。

## 通过官网下载新版的 Node.js

你可以通过官方网站下载新版本的 Node.js：

https://nodejs.org/

随后，如果你下载的是安装程序，则可根据安装程序的指引进行安装与更新。如果你下载的是 .zip 文件，则需要将文件解压缩并替换到 Node.js 的安装目录。

## 使用 nvm 或 nvm-windows

当然，如果你希望在升级 Node.js 的同时保留旧版的 Node.js ，可以考虑使用 [nvm](https://github.com/nvm-sh/nvm) 或 [nvm-windows](https://github.com/coreybutler/nvm-windows) 来管理多个 Node.js 版本。

详细的使用方法此处不再赘述，你可以自行访问上面两个工具的文档页面进行学习。

## 更多

当然，你也可以使用如 [n](https://www.npmjs.com/package/n) 等版本管理工具。

[Node.js 的安装指引](https://nodejs.org/zh-cn/download/package-manager)中也提供了其他一些方法，你可以自行选择。

<a v-if="'return' in params" :href="params['return']"> ⬅️ 返回 </a>