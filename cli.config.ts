import { CliConfig } from "@cvue/cli"

const Config: CliConfig = [
  {
    root: 'packages/element-plus/',
    templatePath: '_cli/templates/element-plus/base',
    generate: [
      {
        name: 'pagination'
      }
    ]
  }, {
    type: 'view',
    generate: [
      {
        name: 'river',
        viewType: 'module',
        child: [
          {
            name: 'input',
            viewType: 'page',
            child: [
              {
                viewType: 'component',
                name: 'text'
              }
            ]
          },
          {
            name: 'draw',
            viewType: 'page'
          }
        ]
      }
    ]
  }
]

export default Config
