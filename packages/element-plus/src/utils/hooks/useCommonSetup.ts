import { CommonAdapter } from '@cvue/shared/dtos/common'
import { ComputedRef } from 'vue'
import { useRewriteCb } from './useRewriteCb'
import { useSetupCb } from './useSetupCb'
import { useSlot } from './useSlot'

interface UseCommonSetupOpt {
  attrs: ComputedRef<Record<string, any>>
  output: ComputedRef<Record<string, any>>
  preload?: any
}

export const useCommonSetup = ({
  attrs,
  output,
  preload
}: UseCommonSetupOpt) => {
  useRewriteCb({ attrs, output, preload })

  useSetupCb({ attrs, output })

  const { computedSlotName } = useSlot({ attrs })

  return { computedSlotName, setInner }

  function setInner(innerAttrs: CommonAdapter<any, string> = {}): CommonAdapter<any, string> {
    innerAttrs.__INNER__ = true
    return innerAttrs
  }
}
