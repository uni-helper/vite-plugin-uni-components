import { relative, resolve } from 'pathe'
import { describe, expect, it } from 'vitest'
import { Context } from '../src/context'

const root = resolve(__dirname, '../examples/vite-vue3')

function cleanup(data: any) {
  return Object.values(data).map((e: any) => {
    delete e.absolute
    e.from = relative(root, e.from).replace(/\\/g, '/')
    return e
  }).sort((a, b) => (a.as as string).localeCompare(b.as))
}

describe('search', () => {
  it('should work', async () => {
    const ctx = new Context({})
    ctx.setRoot(root)
    ctx.searchGlob()

    expect(cleanup(ctx.componentNameMap)).toMatchSnapshot()
  })

  it('should with namespace', async () => {
    const ctx = new Context({
      directoryAsNamespace: true,
      globalNamespaces: ['global'],
    })
    ctx.setRoot(root)
    ctx.searchGlob()

    expect(cleanup(ctx.componentNameMap)).toMatchSnapshot()
  })

  it('should with namespace & collapse', async () => {
    const ctx = new Context({
      directoryAsNamespace: true,
      collapseSamePrefixes: true,
      globalNamespaces: ['global'],
    })
    ctx.setRoot(root)
    ctx.searchGlob()

    expect(cleanup(ctx.componentNameMap)).toMatchSnapshot()
  })

  it('should globs exclude work', () => {
    const ctx = new Context({
      globs: [
        'src/components/*.vue',
        '!src/components/ComponentA.vue',
      ],
    })
    ctx.setRoot(root)
    ctx.searchGlob()

    expect(cleanup(ctx.componentNameMap).map(i => i.as)).not.toEqual(expect.arrayContaining(['ComponentA']))
  })

  it('should globs exclude work with dirs', () => {
    const ctx = new Context({
      dirs: [
        'src/components',
        '!src/components/book',
      ],
    })
    ctx.setRoot(root)
    ctx.searchGlob()

    expect(cleanup(ctx.componentNameMap).map(i => i.as)).not.toEqual(expect.arrayContaining(['Book']))
  })

  it('should excludeNames', () => {
    const ctx = new Context({
      dirs: ['src/components'],
      excludeNames: ['Book'],
    })
    ctx.setRoot(root)
    ctx.searchGlob()

    expect(cleanup(ctx.componentNameMap).map(i => i.as)).not.toEqual(expect.arrayContaining(['Book']))
  })
})
