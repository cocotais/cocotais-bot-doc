---
sidebar: false
---

<script setup lang="ts">
    import { ref } from 'vue'

    const usage = ref<string>("")
    const account = ref<string>("")
    const device = ref<string>("")
    const env = ref<string[]>([])

    function env_class(name: string){
        return env.value.includes(name) ? 'section-item-active' : 'section-item'
    }

    function env_choose(name: string){
        env.value.includes(name) ? env.value.splice(env.value.indexOf(name), 1) : env.value.push(name)
    }
</script>

# 快速开始

欢迎使用 Cocotais Bot ！接下来，请跟随“快速开始向导”初始化你的机器人实例吧：

## 我使用 Cocotais Bot 来 ...

<div class="section-group">
    <div :class="usage == 'create' ? 'section-item-active' : 'section-item'" @click="usage = 'create'">
        <div class="section-item-title">搭建机器人</div>
        <div class="section-item-content">适用于普通用户，使用此框架连接QQ官方机器人。</div>
    </div>
    <div :class="usage == 'develop' ? 'section-item-active' : 'section-item'" @click="usage = 'develop'">
        <div class="section-item-title">进行开发</div>
        <div class="section-item-content">适用于开发者，对此框架展开插件等开发。</div>
    </div>
</div>

<div v-if="usage == 'create'">

## 我在 [QQ 开放平台](https://q.qq.com/) ...

<div class="section-group">
    <div :class="account == 'no' ? 'section-item-active' : 'section-item'" @click="account = 'no'">
        <div class="section-item-content">没有账户</div>
    </div>
    <div :class="account == 'yes' ? 'section-item-active' : 'section-item'" @click="account = 'yes'">
        <div class="section-item-content">注册了账户</div>
    </div>
</div>

## 我使用的设备是 ...

<div class="section-group">
    <div :class="device == 'unix' ? 'section-item-active' : 'section-item'" @click="device = 'unix'; env=[]">
        <div class="section-item-content">Linux 或 macOS</div>
    </div>
    <div :class="device == 'windows' ? 'section-item-active' : 'section-item'" @click="device = 'windows'; env=[]">
        <div class="section-item-content">Windows</div>
    </div>
    <div :class="device == 'android' ? 'section-item-active' : 'section-item'" @click="device = 'android'; env=[]">
        <div class="section-item-content">Android</div>
    </div>
</div>

## 我设备上的环境有 ...

<div class="section-group">
    <div :class="env_class('termux')" @click="env_choose('termux')" v-if="device == 'android'">
        <div class="section-item-content">Termux</div>
    </div>
    <div :class="env_class('node')" @click="env_choose('node')">
        <div class="section-item-content">Node.js (20+)</div>
    </div>
    <div :class="env_class('node-legacy')" @click="env_choose('node-legacy')">
        <div class="section-item-content">Node.js (低于20)</div>
    </div>
    <div :class="env_class('git')" @click="env_choose('git')">
        <div class="section-item-content">Git</div>
    </div>
    <div :class="env_class('bot-legacy')" @click="env_choose('bot-legacy')">
        <div class="section-item-content">旧版 Cocotais Bot 项目</div>
    </div>
</div>

<div v-if="account != '' && device != ''">
<hr>
<div v-if="account == 'yes' && device != 'android' && (env.includes('node')||env.includes('node-legacy'))">

<div v-if="env.includes('node-legacy') && !env.includes('node')">

::: danger
你的 Node.js 版本过低。Cocotais Bot 要求的最低 Node.js 版本为 20.0.0 或以上。

请参考 [旧版 Node.js 升级指南](./legacy-node) 升级你的 Node.js 版本，随后继续阅读以下内容。

如果你不进行 Node.js 升级，将会导致 Cocotais Bot 无法正常工作。
:::

</div>

<div v-if="env.includes('node-legacy') && env.includes('node')">

::: warning
你的 Node.js 版本中包含了旧版 Node.js。Cocotais Bot 要求的最低 Node.js 版本为 20.0.0 或以上。

请确保在安装过程中使用较新的 Node.js，否则将会导致 Cocotais Bot 无法正常工作。

推荐使用 [nvm](https://github.com/nvm-sh/nvm) 或 [nvm-windows](https://github.com/coreybutler/nvm-windows) 来管理多个 Node.js 版本。
:::

</div>

::: tip 捷径
恭喜你！你的设备环境符合 Cocotais Bot 的快速安装要求。

Cocotais Bot 开发团队已为你提供了便捷的安装方式。你可以点击下方按钮，下载适合你的系统版本的 Cocotais Bot 安装脚本。

<button class="t-button" v-if="device == 'windows'">下载 (.bat, 命令提示符)</button>

<button class="t-button" v-if="device == 'windows'">下载 (.ps1, PowerShell)</button>

<button class="t-button" v-if="device != 'windows'">下载 (.sh, Linux/macOS)</button>
:::

</div>

点击下方按钮，开始部署你的 Cocotais Bot 实例！
<div v-if="account == 'yes' && device != 'android' && (env.includes('node')||env.includes('node-legacy'))">

::: warning
你的设备环境符合 Cocotais Bot 的快速安装要求。你无需继续遵循 “快速开始向导”。

如果你依旧希望自己手动安装 Cocotais Bot，请继续阅读以下内容。
:::
</div>

<button class="t-button">立即开始</button>

</div>

</div>

<style>
    .section-group {
        display: flex;
        justify-content: space-between;
    }
    .section-item, .section-item-active {
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        margin: 5px;
        cursor: pointer;
        width: 50vw;
    }
    .section-item-title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .section-item-active {
        border: 1px solid #3E63DD;
    }
    .t-button {
        padding: 4px 8px;
        border-radius: 4px;
        border-color: var(--vp-button-alt-border);
        color: var(--vp-button-alt-text);
        background-color: var(--vp-button-alt-bg);
    }
    .t-button:hover {
        background-color: var(--vp-button-alt-hover-bg);
        color: var(--vp-button-alt-hover-text);
        border-color: var(--vp-button-alt-hover-border);
    }
</style>