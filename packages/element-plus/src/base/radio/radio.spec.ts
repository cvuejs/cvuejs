import { shallowMount } from '@vue/test-utils'
import Radio from './radio.vue'
import '../../utils/lodash'

describe('cvue base: radio', () => {
  it('renders', () => {
    const c = {}
    const wrapper = shallowMount(Radio, {
      stubs: { ElRadio: true },
      propsData: { c }
    } as any)
    expect(wrapper.classes('c-radio')).toBe(true)
  })
})
