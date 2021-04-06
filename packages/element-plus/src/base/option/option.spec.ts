import { shallowMount } from '@vue/test-utils'
import Option from './option.vue'
import '../../utils/lodash'

describe('cvue base: option', () => {
  it('renders', () => {
    const c = {}
    const wrapper = shallowMount(Option, {
      stubs: { ElOption: true },
      propsData: { c }
    } as any)
    expect(wrapper.classes('c-option')).toBe(true)
  })
})
