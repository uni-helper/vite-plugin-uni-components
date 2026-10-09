# 参与贡献

感谢你愿意为 vite-plugin-uni-components 贡献代码！本文档介绍项目结构、本地开发流程、测试方式和提交规范。

## 前置条件

- Node 26（见 `.node-version` 与根 `package.json` 的 `devEngines.runtime`；CI 还会在 Node 22、24 上测试）
- pnpm 12.10.1（见根 `package.json` 的 `packageManager` 与 `devEngines.packageManager`）

## 仓库结构

```
├── .github/workflows   # CI 与发布 workflow
├── packages/core       # 插件本体，发布为 @uni-helper/vite-plugin-uni-components
│   ├── src             # 源码
│   └── test            # vitest 测试
└── playground          # uni-app 示例工程，可跑 H5 和微信小程序
```

## 本地开发

```bash
pnpm install        # 安装依赖
pnpm dev            # 以 watch 模式构建 packages/*/dist
pnpm build          # 全量构建所有包
pnpm play:h5        # 启动 playground 的 H5 dev server
pnpm play:mp-weixin # 启动 playground 的微信小程序 dev（dev wx）
```

playground 通过 `workspace:*` 依赖本插件并消费其 `dist` 产物，跑 playground 前先执行一次 `pnpm build`（或让 `pnpm dev` 挂在后台）。

## 测试与检查

```bash
pnpm test                                  # 运行全部 vitest 测试
pnpm vitest run packages/core/test/dts.test.ts  # 运行单个测试文件
pnpm typecheck                             # tsc --noEmit
pnpm lint                                  # eslint 检查
pnpm lint:fix                              # eslint 自动修复
```

### 测试说明

测试直接从 `../src` 导入源码，不需要先构建。断言以快照为主，位于 `packages/core/test/__snapshots__/`；更新快照前先逐条确认输出确实符合预期，再运行 `pnpm vitest run -u` 更新对应的快照文件。

## 提交规范

1. Fork 仓库并创建分支，分支名用 `feat/xxx`、`fix/xxx`、`docs/xxx` 这类前缀。
2. 提交信息遵循 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/)，如 `feat: 支持 xxx`、`fix: 修复 xxx`。
3. 提交前跑一遍检查：

```bash
pnpm lint && pnpm typecheck && pnpm test
```

4. 推送分支并打开 PR。

## Pull Request 指南

- 一个 PR 只解决一个问题，改动范围尽量聚焦。
- 改动公共行为或新增 resolver 时，同步更新 README 和[在线文档](https://github.com/uni-helper/website)。
- CI 会在 ubuntu / macOS / Windows × Node 22 / 24 / 26 上依次执行构建、playground 构建、lint、测试和类型检查，PR 需要全绿才能合并。方案类改动建议先开 issue 讨论。

## 发布

维护者操作：运行 `pnpm release`（bumpp 会更新根目录与各包的版本号并打 tag），推送 `v*` tag 后 GitHub Actions 会创建 GitHub Release 并发布到 npm。

## 行为准则

参与本项目请遵循 [uni-helper 行为准则](https://github.com/uni-helper/.github/blob/main/CODE_OF_CONDUCT.md)。

有其他问题欢迎到 [Issues](https://github.com/uni-helper/vite-plugin-uni-components/issues) 提出。
