import { ComputedRef, getCurrentInstance, Ref, watchEffect } from 'vue'

interface UseRewriteCbOpt {
  attrs: ComputedRef<Record<string, any>>
  output: ComputedRef<Record<string, any>>
  preload?: Ref<any>
}

export const useRewriteCb = ({ attrs, output, preload }: UseRewriteCbOpt) => {
  const instance = getCurrentInstance()

  watchEffect(() => {
    _.forOwn(attrs.value, (v, k) => {
      if (k.startsWith('on') && _.isFunction(v)) {
        const fn = attrs.value[k]
        if (fn.__REWRITED__) return

        attrs.value[k] = (...args: any[]) => {
          fn(...args, {
            attrs: attrs.value,
            instance,
            output: output.value,
            preload: preload?.value
          })
          /** 如果preload传入了，清空preload */
          if (preload) preload.value = null
        }
        attrs.value[k].__REWRITED__ = true
      }
    })
  })
}
