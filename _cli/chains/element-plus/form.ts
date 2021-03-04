import { CustomOption, Rule, Tree } from '@cvue/cli'

export default function(options: CustomOption): Rule {
  return (host: Tree) => {
    return host
  }
}
