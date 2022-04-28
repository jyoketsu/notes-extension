```
██████╗ ██╗ ██████╗██╗  ██╗███████╗      ███████╗██╗  ██╗████████╗███████╗███╗   ██╗███████╗██╗ ██████╗ ███╗   ██╗
██╔══██╗██║██╔════╝██║ ██╔╝██╔════╝      ██╔════╝╚██╗██╔╝╚══██╔══╝██╔════╝████╗  ██║██╔════╝██║██╔═══██╗████╗  ██║
██████╔╝██║██║     █████╔╝ ███████╗█████╗█████╗   ╚███╔╝    ██║   █████╗  ██╔██╗ ██║███████╗██║██║   ██║██╔██╗ ██║
██╔═══╝ ██║██║     ██╔═██╗ ╚════██║╚════╝██╔══╝   ██╔██╗    ██║   ██╔══╝  ██║╚██╗██║╚════██║██║██║   ██║██║╚██╗██║
██║     ██║╚██████╗██║  ██╗███████║      ███████╗██╔╝ ██╗   ██║   ███████╗██║ ╚████║███████║██║╚██████╔╝██║ ╚████║
╚═╝     ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝      ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝
```

## 简介

Picks 是一个网络采集项目。基于 `vue3 + TypeScript + vue-router + vuex + elementPlus + vite` 开发。

## 使用技术

- [Chrome extensions](https://developer.chrome.com/docs/extensions/mv3/) Chrome 插件
- [node](http://nodejs.org/) 和 [git](https://git-scm.com/) -项目开发环境
- [Es6+](http://es6.ruanyifeng.com/) - es6
- [Vite](https://www.pipipi.net/vite/) - vite
- [Vue3](https://staging-cn.vuejs.org/guide/introduction.html) - Vue3
- [Vue-Router](https://router.vuejs.org/zh/) - Vue Router
- [Vuex](https://next.vuex.vuejs.org/zh/index.html) - vuex
- [Element-Plus](https://element-plus.gitee.io/zh-CN/) - ui

## 安装

```
yarn
```

## 启动服务

```
yarn dev
```

## 编译并发布

```
yarn deploy
```

## apple 公证

```
xcrun altool --notarize-app --primary-bundle-id "com.qingtime.notes" --username "840886008@qq.com" --password "qraa-lnjv-rkis-dptf" --asc-provider "58BM7SA2MZ" -t osx --file /Users/jyoketsu/Documents/workspace/working/notes/app_build/Notes-0.0.1.dmg
```

## 公证查询

```
xcrun altool --list-providers -u "840886008@qq.com" -p "qraa-lnjv-rkis-dptf"
xcrun altool --notarization-info "6e2cfa04-ff4b-46e6-83c5-5e0f9e3b6171" -u "840886008@qq.com" -p "qraa-lnjv-rkis-dptf"
```
