import { shallowMount } from '@vue/test-utils'
import Select from './select.vue'
import '../../utils/lodash'

describe('cvue base: select', () => {
  it('renders', () => {
    const c = {}
    const wrapper = shallowMount(Select, {
      stubs: { ElSelect: true },
      propsData: { c }
    } as any)
    expect(wrapper.classes('c-select')).toBe(true)
  })
})
