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
    <div v-if="account == 'yes' && device != 'android'">
        <p>WIP</p>
    </div>
</div>
<p>WIP</p>
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
</style>