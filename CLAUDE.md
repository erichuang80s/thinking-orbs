# CLAUDE.md

## Workflow

**這個專案不開 PR。** 所有改動直接 commit 並 push 到指定的開發分支即可，不要建立 pull request。

## Upstream sync

這個 repo 是 `Jakubantalik/thinking-orbs` 的 fork，但已經整個從 React 改寫成 Vue 3。
上游仍是 React（`.tsx`），所以**不能直接 merge/rebase upstream** — 檔名不同不會產生衝突，
而是會靜默地把 `.tsx` 檔案加回來，造成 React/Vue 並存。

同步上游新功能的做法：

1. `git fetch upstream`（remote 已設定為 `https://github.com/Jakubantalik/thinking-orbs.git`）
2. **引擎層**是框架無關的純 TS，直接取用上游版本：
   ```
   git checkout upstream/main -- src/engine/ src/presets.ts
   ```
3. **`src/types.ts`** 手動合併：取上游的 `OrbState` 等型別，但保留這邊 Vue 化的
   `ThinkingOrbProps`（不要退回 React 的 `CSSProperties` / `CanvasHTMLAttributes`）。
4. **`src/ThinkingOrb.vue` 與 `demo/*.vue`** 對照上游同名 `.tsx` 手動改寫成 Vue 語法。

長期原則：`src/engine/*` 保持與上游一致、不做 Vue 特化，UI 層（`.vue`）自行維護。

## Checks

```
npm run typecheck   # vue-tsc --noEmit
npm run build       # 套件 build
npx vite build --config vite.config.demo.ts   # demo build
```
