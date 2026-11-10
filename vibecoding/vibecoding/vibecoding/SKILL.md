---
name: vibecoding
description: 一键生成 OpenFilm/VibeCoding HTML 分镜视频工程。根据用户输入的主题、时长和风格，自动产出完整的项目文件包（film.html 主时间线 + 分镜画面 + 轮弹字幕 + 配音脚本 + 动态数据图表），可直接在 OpenFilm 中打开预览和渲染。支持知识科普、行业解读、产品介绍、数据报告等短平快视频的分镜脚本工程制作。
---

# VibeCoding 分镜视频工程生成器

根据用户需求，从零生成一个完整的 OpenFilm 兼容 HTML 分镜视频项目。

## 工作流程

1. **确认需求**：主题、时长（秒）、风格调性、输出目录
2. **规划结构**：拆分为 N 个分镜（shot）和 M 句字幕（sub），分配时间轴
3. **生成文件**：按下方规范批量产出所有文件
4. **补元数据**：写 `.film/` 目录让 OpenFilm 能识别
5. **交付路径**：告诉用户在 OpenFilm 里打开哪个文件夹

## 项目文件结构（必须严格遵循）

```
<项目名>/
├── film.html              ← 主时间线（核心入口）
├── settings.json
├── voiceover.md           ← 配音脚本（时间轴 + 文本）
├── .film/                 ← OpenFilm 元数据（必须补全）
│   ├── id                 ← 12位随机字符串
│   ├── settings.json
│   ├── history/openfilm.json
│   ├── cache/preview/
│   ├── chat/
│   └── logs/
└── pages/
    ├── common.css         ← 公共样式（从模板复制）
    ├── scene.js           ← 动画辅助函数（从模板复制）
    ├── sub.js             ← 字幕渲染函数（从模板复制）
    ├── shot1_*.html       ← 分镜画面（N个）
    └── sub01.html ~ subNN.html  ← 字幕（M个）
```

## 核心规范

### film.html 结构
- 轨道0：分镜画面，每个 shot 一个 iframe，`at="起始秒数"` 控制出现时机
- 轨道1：字幕，每个 sub 一个透明底 iframe，`at="起始秒数"` 控制出现时机
- 轨道2：BGM 音频标签，音量 0.25
- 所有 iframe 尺寸固定 1920x1080

### 分镜页面（shotXX.html）规范
- 必须导出 `window.film = { duration: D, frame(t) { ... } }`
- 用 `import { easeOut, clamp } from './scene.js'` 引入动画工具
- **动画必须丰富**：每个元素至少有入场动画（fade/slide/scale）+ 持续动画（pulse/float/rotate）
- 配色主题统一，用 common.css 里的 CSS 变量

### 字幕页面（subXX.html）规范
- 用 `renderSubtitle(el, t, SEGS, { popStart, stagger })` 渲染
- SEGS 数组每个元素 `{ text: '...', kw: true/false }`
- kw=true 的词用金色高亮，突出关键词
- 字幕排版：50px 字号、半透明黑底条、底部 80px 居中

### 关键坑（必看）
- **括号必须平衡**：写 JS 时每个 `(` 对应一个 `)`，写完用 PowerShell 验证括号数量
- **window.film 必须在模块顶层赋值**，不能写在函数里
- `.film/` 目录必须补全 id、settings.json、history/openfilm.json，否则 OpenFilm 识别不了项目
- 所有文件用 UTF-8 无 BOM 编码写入

## 分镜设计模式参考

详见 [references/shot-patterns.md](references/shot-patterns.md)，包含 17 种常用分镜画面模板（开场标题、流程图、数据大屏、柱状图、折线图、对比卡片、列表网格、警告提示、片尾等）。

## 视觉风格参考

详见 [references/style-templates.md](references/style-templates.md)，包含 17 种可复用视觉风格（手绘水彩/2.5D/扁平矢量/赛博朋克/水墨国风/像素风/蓝图工程图等），每种含配色、布局、元素特征和适用场景。做视频时先选风格，再套分镜模板。

## 执行步骤速查

1. 复制 `assets/template/` 整个目录到目标项目路径
2. 按用户主题写 `voiceover.md`（时间轴表格格式）
3. 按时间轴生成 N 个 shotXX.html（参考 shot-patterns.md 选模板）
4. 按台词生成 M 个 subXX.html（每句台词对应一个）
5. 写 `film.html` 把所有 iframe 按时间轴串起来
6. 补 `.film/` 元数据（随机生成 id，写 settings.json 和 openfilm.json）
7. 告诉用户：在 OpenFilm 里打开这个项目文件夹即可
