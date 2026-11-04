# HongSnow 网站仓库

这个 Repository 使用一个 GitHub Pages 项目发布三个相互独立的静态网站。每个网站都有自己的页面、样式和脚本目录；根目录只保留必须稳定存在的公开入口与 PWA 文件。

## 网站与功能

| 网站 | 主要作用 | 主要功能 | 源码目录 | 公开网址 |
| --- | --- | --- | --- | --- |
| HongSnow Coaching | Hong Lin 的中英双语单板教学主页 | 教练介绍、课程与价格、AASI 教学方法、学员视频、Google Sheets 预约表单 | Repository 根目录 | [打开网站](https://yeyekuailai.github.io/hongsnow-github-pages/) |
| 雪语 SnowLink | 帮助中文学员查找美国官方雪校中的中文教练 | Epic/Ikon 雪场筛选、教练卡片、指定教练请求模板、中英双语教练主页申请、Gmail 收件、申请暂停和额度提醒 | `coach-marketplace/` | [打开网站](https://yeyekuailai.github.io/hongsnow-github-pages/coach-marketplace/) |
| AASI 考核路线图 | 用考生语言和官方考官术语解释 Level I、II、III 全国考核要求 | 中英双语、考生/考官视图、各级活动要求、Teaching 与 Movement Analysis 范例、术语和评分说明 | `aasi-exam-guide/` | [中文](https://yeyekuailai.github.io/hongsnow-github-pages/aasi-exam-guide/) · [English](https://yeyekuailai.github.io/hongsnow-github-pages/aasi-exam-guide/en.html) |

## 目录结构

```text
.
├── index.html                 # HongSnow 首页（公开路由，保持在根目录）
├── about.html                 # 教练介绍
├── programs.html              # 课程
├── student-clips.html         # 学员视频
├── assets/
│   ├── css/                   # HongSnow 样式
│   ├── js/                    # HongSnow 前端逻辑
│   ├── icons/                 # 网站图标
│   ├── app-icons/             # PWA 图标
│   └── ...                    # 图片与视频
├── config/                    # HongSnow 公开端点配置
├── coach-marketplace/
│   ├── assets/                # SnowLink CSS 与 JavaScript
│   ├── data/                  # 雪场和通票数据
│   ├── config/                # 申请表公开端点
│   ├── backend/               # Google Apps Script 收件后端
│   └── docs/                  # 部署和数据说明
├── aasi-exam-guide/
│   └── assets/                # AASI 指南 CSS、JavaScript 与图标
├── manifest.webmanifest       # 根网站 PWA 配置
├── service-worker.js          # 必须位于根目录以保持 PWA 控制范围
└── .nojekyll                  # GitHub Pages 静态发布标记
```

各网站的 HTML 入口保留在各自目录顶层，以维持已经公开的网址。CSS、JavaScript、图标、数据、配置、后端和文档按类型归档。

## 部署

GitHub Pages 从 `main` 分支的 `/ (root)` 发布。三个网站均为无构建步骤的 HTML、CSS 和 JavaScript；提交到 `main` 后由 GitHub Pages 自动部署。

## 常用维护位置

- HongSnow 预约端点：`config/google-sheets-config.js`
- HongSnow 页面逻辑：`assets/js/site.js`
- SnowLink 表单端点：`coach-marketplace/config/form-endpoint.js`
- SnowLink 雪场数据：`coach-marketplace/data/resorts.js`
- SnowLink Gmail 后端：`coach-marketplace/backend/google-apps-script/Code.gs`
- SnowLink 暂停/恢复申请：在 Apps Script 中运行 `pauseApplications` 或 `resumeApplications`
- AASI 中文内容：`aasi-exam-guide/assets/js/app.js`
- AASI 英文内容：`aasi-exam-guide/assets/js/app-en.js`

## 本地预览

在 Repository 根目录运行：

```bash
python3 -m http.server 8000
```

然后分别打开：

- `http://localhost:8000/`
- `http://localhost:8000/coach-marketplace/`
- `http://localhost:8000/aasi-exam-guide/`

## 安全边界

这是公开 Repository。不要提交 Gmail 密码、Google App Password、OAuth 凭据或其他私密密钥。浏览器必须使用的公开 Web App URL 可以保存在 `config/` 中。
