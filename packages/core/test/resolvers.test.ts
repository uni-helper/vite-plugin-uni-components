import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

// `resolvers/index.ts` re-exports with `export *`, which drops default exports.
// Every resolver file must therefore export its factory as a named export.
const resolversDir = resolve(__dirname, '../src/resolvers')

describe('resolvers', () => {
  for (const file of readdirSync(resolversDir).filter(f => f.endsWith('.ts') && f !== 'index.ts')) {
    it(`${file} exports a named resolver factory and no default`, async () => {
      const mod = await import(`../src/resolvers/${file}`)
      expect(mod.default, '`export default` is unreachable via the public entry').toBeUndefined()
      const factory = Object.entries(mod).find(([name, value]) => name.endsWith('Resolver') && typeof value === 'function')
      expect(factory, 'expected a named export `*Resolver` function').toBeDefined()
    })
  }
})
