import {
  url,
  Rule,
  applyTemplates,
  move,
  chain,
  mergeWith,
  MergeStrategy,
  apply,
  noop,
} from '@angular-devkit/schematics'
import { normalize, join } from 'path'
import { strings } from '@angular-devkit/core'
import { CliConfig } from '../../config.dto'
import { LoadConfig, LoadFile } from '../../utils/load-config'
import { DEFAULT_VIEW_CONFIG } from '../../config'

export interface CustomOption extends CliConfig {
  name: string
  root: string
  templatePath: string
  handlerPath?: string
  payload?: string
}

export function custom(options: CustomOption): Rule {
  return () => {
    // 设置默认和用户配置
    Object.assign(options, { prefix: 'c' })

    const movePath = normalize(options.root)
    const tempUrl = join(process.cwd(), options.templatePath)

    const templateSource = apply(url(tempUrl), [
      applyTemplates({
        ...strings,
        ...options,
      }),
      move(movePath),
    ])
    console.log(tempUrl, movePath)

    // const chainFun = options.handlerPath ? LoadFile(options.handlerPath) : noop;

    return chain([mergeWith(templateSource, MergeStrategy.Overwrite)])
  }
}
