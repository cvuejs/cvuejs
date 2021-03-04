import { CliConfig } from "@cvue/cli"

const Config: CliConfig = [
  {
    root: 'packages/element-plus/',
    templatePath: '_cli/templates/element-plus/base',
    generate: [
      {
        name: 'button'
      }
    ]
  }
]

export default Config
