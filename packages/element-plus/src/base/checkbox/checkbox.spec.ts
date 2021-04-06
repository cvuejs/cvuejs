import { shallowMount } from '@vue/test-utils'
import Checkbox from './checkbox.vue'
import '../../utils/lodash'

describe('cvue base: checkbox', () => {
  it('renders', () => {
    const c = {}
    const wrapper = shallowMount(Checkbox, {
      stubs: { ElCheckbox: true },
      propsData: { c }
    } as any)
    expect(wrapper.classes('c-checkbox')).toBe(true)
  })
})
