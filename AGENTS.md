# vite-plugin-uni-components

uni-helper 的 uni-app (Vue3) 组件按需自动导入插件，Fork 自 unplugin-vue-components 并针对 uni-app 修改。pnpm monorepo：`packages/core` 是唯一发布的 npm 包，`playground` 是跨端示例工程。

## Project

- 语言/运行时：TypeScript strict（根 `tsconfig.json`，`moduleResolution: bundler`；`playground` 不参与根 typecheck）。Node 26 是开发机 pin（`.node-version` + `devEngines.runtime`，`onFail: warn`，只约束开发者，不发布 `engines` 字段；CI 矩阵另测 Node 22/24）
- 包管理：pnpm 12.10.1（`packageManager` + `devEngines.packageManager`）。依赖版本统一放在 `pnpm-workspace.yaml` 的 `catalog:`，各 manifest 里写 `catalog:` 占位
- 构建：tsdown（esm + cjs + dts），产物在 `packages/core/dist/`（gitignore，不入库）
- 测试：vitest，快照断言，直接导入 `src/`，无需先构建
- Lint：@antfu/eslint-config（`lib` 预设），检查和格式化都由 eslint 承担，无 prettier
- 包入口：`.`（插件本体）和 `./resolvers`（UI 库 resolver），见 `packages/core/package.json` 的 `exports`
- peerDependencies：`vite ^5`、`rollup ^4`
- workspace：`packages/*` + `playground`；playground 以 `workspace:*` 依赖 core 并消费其 `dist`，构建顺序是先 core 后 playground

## Commands

```bash
pnpm install              # 安装依赖
pnpm dev                  # watch 构建 packages/*/dist
pnpm build                # 全量构建所有包（rimraf dist → 逐包构建）
pnpm play:h5              # playground H5 dev server
pnpm play:mp-weixin       # playground 微信小程序 dev（unh dev wx）
pnpm play:build:h5        # 构建 playground H5
pnpm play:build:mp-weixin # 构建 playground 微信小程序
pnpm test                 # vitest，直接跑 src，无需构建
pnpm typecheck            # tsc --noEmit
pnpm lint                 # eslint 检查（含 markdown，同时是格式化器）
pnpm lint:fix             # eslint 自动修复
pnpm release              # bumpp 升版本并打 tag；推送 v* tag 触发发布 workflow
```

跨目录等价形式：`pnpm -C packages/core run build`、`pnpm -C playground run dev`。跑 playground 前先 `pnpm build`（或让 `pnpm dev` 挂着），否则 playground 解析不到 dist。

## Architecture

`packages/core/src` 模块与职责：

| 模块 | 职责 |
| --- | --- |
| `index.ts` | 插件入口：默认导出 `VitePluginComponents(options)`，创建 `Context`，以 `enforce: 'post'` 注册 `transform` 钩子，并暴露 `api.findComponent` / `api.stringifyImport` |
| `context.ts` | `Context` 类，核心状态：组件名→导入信息映射、使用点映射、别名、Vite dev server/HMR 集成；dts 生成按 500ms 节流 |
| `options.ts` | `defaultOptions` + `resolveOptions`：合并用户配置，按环境探测 `dts`/`dtsTsx` 默认值（local-pkg） |
| `types.ts` | `Options`、`ComponentResolver`、`PublicPluginAPI` 等公共类型 |
| `transformer.ts` | 变换调度：MagicString 上依次跑 component 与 directive 变换（后者需开 `directives` 选项），结果前置 `DISABLE_COMMENT` 防止同一文件被二次处理 |
| `transforms/component.ts`、`transforms/directive.ts` | 实际的代码改写：从模板/脚本收集组件与指令使用点，插入对应 import |
| `declaration.ts` | 生成并合并 `components.d.ts`（`GlobalComponents` / `GlobalDirectives`） |
| `fs/glob.ts` | `searchComponents`：按 `dirs`/`globs` 扫描组件文件 |
| `type-imports/` | 探测类型导入，补充进 dts |
| `resolvers.ts` → `resolvers/` | UI 库 resolver，每个库一个文件，命名导出 `XxxResolver` |
| `utils.ts` | `pascalCase`/`kebabCase`/`parseId`/`matchGlobs`/`shouldTransform`/`stringifyComponentImport` 等工具 |
| `constants.ts` | `MODULE_NAME`、`DISABLE_COMMENT`、`DIRECTIVE_IMPORT_PREFIX` 等常量 |

值得知道的点：

- dts 的类型入口缺省取 `['default']` 导出（`declaration.ts` 的 `stringifyComponentInfo`），这是针对 H5 端第三方组件的兼容行为，改 importName 逻辑前先理解它。
- 同一文件的重复变换靠前置 `DISABLE_COMMENT` 标记拦截（`constants.ts`）。
- uni-ui resolver 特意跳过 `UniLayout` 组件名，兼容 vite-plugin-uni-layouts。
- 插件必须注册在 `Uni()` 之前，README 与在线文档均有强调，属对外契约。

## Conventions

- 检查与格式化都走 eslint（`pnpm lint` / `pnpm lint:fix`），`.vscode/settings.json` 已提交（保存时 eslint fix、关闭 prettier）。
- 源码注释与 JSDoc 以英文为主，个别文件（如 `resolvers/uview-pro.ts`）是中文，跟随所在文件现状即可。
- 测试用快照（`test/__snapshots__/`），直接导入 `../src`；`test/tmp/` 由测试自清理（目录内有 `.gitignore`）。更新快照先人工确认输出再 `-u`。
- 调试走 `debug`，命名空间 `vite-plugin-uni-components:*`（如 `DEBUG=vite-plugin-uni-components:context:*`）。
- 提交信息遵循 Conventional Commits；版本号只能通过 `pnpm release`（bumpp）统一修改根与各包 manifest。
