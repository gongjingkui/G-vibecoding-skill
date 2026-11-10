# G-vibecoding-skill
VibeCoding 分镜视频工程生成器，根据用户需求，从零生成兼容 OpenFilm 的 HTML 分镜视频项目。

## ⚠️ 重要声明
1. 使用本 Skill 产出的视频，**默认由使用者本人原创，不自带任何第三方素材**。
2. 本 Skill 仅为个人工作方法论总结，**不含平台内置生成素材、版权资源**，仅作学习参考使用。
3. 本工具可以辅助快速产出分镜脚本与工程文件，**但不能替代商用版权授权、素材授权、肖像授权等相关法律授权**。使用者需要自行保证所有素材、画面、文案符合版权法规，自行承担使用产生的版权责任。

## 📥 安装方式（豆包工作）
打开【豆包工作】，新建对话，发送下面指令即可导入技能：
访问仓库 [https://github.com/gongjingkui/G-vibecoding-skill](https://github.com/gongjingkui/G-vibecoding-skill)，进入 vibecoding 文件夹，读取里面的 SKILL.md，在豆包工作新建【VibeCoding 分镜视频制作】技能，完成安装。

## 📖 Skill 使用流程
1. 确认需求：告知主题、视频时长（秒）、风格调性、输出目录
2. 规划结构：自动拆分为多个镜头（shot）和字幕（sub），生成时间轴
3. 生成工程：批量输出 OpenFilm 可识别的 HTML 分镜工程文件
4. 补元数据：自动生成 `.film/` 目录索引文件，OpenFilm 可直接识别打开
5. 交付输出：拿到完整工程，在 OpenFilm 中打开、渲染成片

## 📂 仓库结构
G-vibecoding-skill/
├─ vibecoding/
│  ├─ SKILL.md                # 豆包工作技能主文件
│  ├─ assets/template/pages/  # 分镜模板资源
│  └─ references/             # 参考文档
└─ README.md                  # 本说明文档


## 📌 补充提示
- 技能只负责**分镜脚本、工程文件结构生成**，画面素材、配音、图片、视频片段需要使用者自己准备。
- 商用前，请务必自行完成全部素材版权核验与授权。
