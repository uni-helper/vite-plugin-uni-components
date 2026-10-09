# packages/core

`@uni-helper/vite-plugin-uni-components` 包本体，是本仓库唯一发布的 npm 包。通用命令、架构和约定见根 `AGENTS.md`，这里只列本包的差异。

## Package

- 入口两个：`.`（`src/index.ts`）和 `./resolvers`（`src/resolvers.ts`），tsdown 打成 `dist/index.*` 与 `dist/resolvers.*`（esm + cjs + dts），`exports` 映射见本包 `package.json`
- 仓库根的 `index.d.ts` 是类型桩，转发 `./dist/index`，`package.json` 的 `types` 指向它
- 只发布 `dist`（`files` 字段），`prepublishOnly` 会先跑构建；`dist` 不入库
- peerDependencies：`vite ^5`、`rollup ^4`；本包依赖版本同样走 catalog

## Commands

```bash
pnpm -C packages/core run dev   # watch 构建 dist
pnpm -C packages/core run build # 全量构建 dist
```

测试无独立脚本，根目录 `pnpm test` 直达本包 `test/`。

## Conventions

- 新增 UI 库 resolver：在 `src/resolvers/` 下新建文件并在 `resolvers/index.ts` 里转发；必须是命名导出 `XxxResolver`（`index.ts` 用 `export *`，`export default` 不会被转发，等于没有导出）。
- resolver 的模式（`type`/`resolve`、`exclude` 选项、组件名正则）参考相邻文件，如 `uni-ui.ts`。
- 测试在本包 `test/`，快照断言，直接导入 `../src`。
