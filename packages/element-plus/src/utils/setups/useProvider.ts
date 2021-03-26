import { computed, onMounted, onUnmounted } from 'vue'
import { COMPONENT_TYPE } from '../constants/component'
import { ProviderService } from '../service/provider.service'

interface ProviderOpt {
  attrs: Readonly<Record<string, any>>
  output: Readonly<Record<string, any>>
  type: COMPONENT_TYPE
}

export const useProvider = ({ attrs, output, type }: ProviderOpt) => {
  /**
   * 随机生成20位数字的组件id,作为该组件的唯一标识,用于注销组件
   */
  const cid = computed(() =>
    Math.floor(Math.random() * Math.pow(10, 20)).toString()
  )

  onMounted(() => {
    register()
  })
  onUnmounted(() => {
    logout()
  })

  /**
   * 注册组件
   */
  function register() {
    ProviderService.register({
      cid: cid.value,
      name: attrs.value.n,
      type,
      output
    })
  }

  /**
   * 注销组件
   */
  function logout() {
    ProviderService.logout(cid.value)
  }
}
