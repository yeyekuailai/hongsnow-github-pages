# AASI 考核路线图

一个可直接发布到 GitHub Pages 的中英双语静态网站，用客观、可执行、可观察的语言解释 AASI 单板一级、二级、三级全国认证标准。

中英文页面提供相同数量和层级的内容：18 个 Core Integrated Activities、6 个 Teaching 范例、6 个 Movement Analysis 范例、18 个术语、三级各 8 项自测、六分制评分和资料边界。两种语言均提供考生详细版与考官核心版。中文页的专业术语只使用官方英文写法，中文仅用于解释含义、动作要求和可观察证据；不使用评分标准代号或技术基本功编号代号。官方资料仅作为内容设计依据，不在页面中单独展示参考列表。

## 本地预览

```bash
python3 -m http.server 8000
```

浏览器打开 `http://localhost:8000`。

## GitHub Pages 发布

1. 把本目录内容推送到 GitHub 仓库的默认分支。
2. 在仓库 **Settings → Pages** 中选择 **Deploy from a branch**。
3. 选择默认分支和 `/ (root)`，保存。

本站无需构建工具、框架或第三方依赖。

## 内容依据

- AASI Snowboard Certification Standards（用户提供版本）
- Snowboarding Technical Skills Performance Guide v2.0（2022-11-07）
- PSIA-AASI National Snowboard Activities List v1.0b
- PSIA-AASI Snowboard National Assessment Guide v1.0（2026-10）
- [PSIA-AASI Snowboard Certification](https://thesnowpros.org/get-certified/snowboard/)
- [PSIA-AASI Certification Documents](https://thesnowpros.org/certification-documents/)

## 说明

这是非官方中文学习辅助，不替代最新的 National Standards、Performance Guides、Assessment Forms、Eastern 报名页面或考官当天指令。官方资料更新后，应逐项复核 `assets/js/app.js` 中的级别、地形、活动参数和判定描述。
