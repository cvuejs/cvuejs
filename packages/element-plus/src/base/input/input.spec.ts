import { shallowMount } from '@vue/test-utils'
import Input from './input.vue'
import '../../utils/lodash'

describe('cvue base: input', () => {
  it('renders', () => {
    const c = {}
    const wrapper = shallowMount(Input, {
      stubs: { ElInput: true },
      propsData: { c }
    } as any)
    expect(wrapper.classes('c-input')).toBe(true)
  })
})
