import { InsertChange } from './../../utils/change'
import {
  url,
  Rule,
  applyTemplates,
  move,
  chain,
  mergeWith,
  MergeStrategy,
  apply,
  Tree
} from '@angular-devkit/schematics'
import { normalize, join } from 'path'
import { strings } from '@angular-devkit/core'
import { readIntoSourceFile } from '../../utils/file'
import * as ts from 'typescript'
import {
  findNodes,
  insertImport,
  isImported
} from '../../utils/ast-utils'
import { defaultsDeep } from 'lodash'
import { CliConfigItem } from '../../config.dto'
import { DEFAULT_VIEW_CONFIG } from '../../config'

interface DependentConfig extends CliConfigItem {
  name: string
  hostPath: string
  hostName: string
  isInnerComponent: boolean
}

/**
 * 将组件注入到父级页面
 * @param options 配置项
 */
function injectComponentToHost(options: DependentConfig): Rule {
  return (host: Tree) => {
    const classifyName = `${strings.classify(options.name)}`
    // const dasherizeName = `${strings.dasherize(options.name)}`

    const hostFilePath = options.isInnerComponent
      ? join(options.hostPath, `${strings.dasherize(options.hostName)}.vue`)
      : join(
          options.hostPath,
          'src',
          `${strings.dasherize(options.hostName)}.vue`
      )
    const hostSource = readIntoSourceFile(host, hostFilePath)

    const hostRecorder = host.beginUpdate(hostFilePath)

    // 注入import语句
    if (
      isImported(
        hostSource,
        classifyName,
        `./components/${strings.dasherize(options.name)}/${strings.dasherize(options.name)}.vue`
      )
    )
      return host
    const change = insertImport(
      hostSource,
      hostFilePath,
      classifyName,
      `./components/${strings.dasherize(options.name)}/${strings.dasherize(options.name)}.vue`,
      true
    )
    if (change instanceof InsertChange) {
      hostRecorder.insertLeft(change.pos, change.toAdd)
    }

    // 注入 compoent引用
    const exportAssignment = findNodes(
      hostSource,
      ts.SyntaxKind.ExportAssignment
    )
    const objectLiteralExpression = findNodes(
      exportAssignment[0],
      ts.SyntaxKind.ObjectLiteralExpression
    )[0]
    if (!objectLiteralExpression) return host
    const componentsIdentifier = findNodes(
      objectLiteralExpression,
      ts.SyntaxKind.Identifier
    ).find((i) => i.getText() === 'components')
    let insertCode = ''
    let pos = 0
    if (!componentsIdentifier) {
      // @Component({}) 或者 @Component({ ...其它不包含components属性 })
      insertCode = `
  components: {
    ${classifyName}
  },
`
      pos = objectLiteralExpression.pos + 1
    } else {
      const componentProperty = (objectLiteralExpression as ts.ObjectLiteralExpression).properties.find(
        (node) => node.name && node.name.getText() === 'components'
      ) as ts.PropertyAssignment
      const hasOtherComponents = !!(componentProperty!
        .initializer as ts.ObjectLiteralExpression).properties.length
      insertCode = hasOtherComponents
        ? `
    ${classifyName},`
        : `
    ${classifyName}
  `
      pos = componentProperty!.initializer.pos + 2
    }

    const hostChange = new InsertChange(hostFilePath, pos, insertCode)
    hostRecorder.insertLeft(hostChange.pos, hostChange.toAdd)
    host.commitUpdate(hostRecorder)
    return host
  }
}

export function dependentComponent(options: DependentConfig): Rule {
  return () => {
    // 设置默认和用户配置
    defaultsDeep(options, DEFAULT_VIEW_CONFIG)

    const hostPathArr = options.hostPath.split('/')
    const hostName = strings.dasherize(hostPathArr[hostPathArr.length - 1])
    const isInnerComponent = /.+src\/components/.test(options.hostPath)
    options.hostName = hostName
    options.isInnerComponent = isInnerComponent

    const movePath = normalize(
      isInnerComponent
        ? `${options.hostPath}/components`
        : `${options.hostPath}/src/components`
    )
    const templateSource = apply(url('./templates'), [
      applyTemplates({
        ...strings,
        ...options
      }),
      move(movePath)
    ])
    return chain([
      injectComponentToHost(options),
      mergeWith(templateSource, MergeStrategy.Overwrite)
    ])
  }
}
