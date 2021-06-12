import { writeFileSync } from "fs"
import { glob } from "glob"
import { dirname, join, parse } from "path"

const path = process.argv[2]

glob(path, (e, matches) => {
   if (e) throw e

   if (matches.length === 0) return

   const dir = dirname(matches[0])

   const imports = matches
      .map(it => parse(it).name)
      .map(it => it.replace(/['`"]/g, ''))
      .map(name => `require('./${name}')`)
      //.map(name => `export * from './${name}'`)
      .join('\n')


   writeFileSync(join(dir, 'import.ts'), `

      ${imports}
      //eslint-disable-next-line import/no-anonymous-default-export
      export default {}

   `.split('\n').filter(s => s.length).map(s => s.trim()).join('\n'))

})