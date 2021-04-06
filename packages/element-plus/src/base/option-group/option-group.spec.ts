import { shallowMount } from '@vue/test-utils'
import OptionGroup from './option-group.vue'
import '../../utils/lodash'

describe('cvue base: option-group', () => {
  it('renders', () => {
    const c = {}
    const wrapper = shallowMount(OptionGroup, {
      stubs: { ElOptionGroup: true },
      propsData: { c }
    } as any)
    expect(wrapper.classes('c-option-group')).toBe(true)
  })
})
