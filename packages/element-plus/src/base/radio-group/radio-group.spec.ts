import { shallowMount } from '@vue/test-utils'
import RadioGroup from './radio-group.vue'
import '../../utils/lodash'

describe('cvue base: radio-group', () => {
  it('renders', () => {
    const c = {}
    const wrapper = shallowMount(RadioGroup, {
      stubs: { ElRadioGroup: true },
      propsData: { c }
    } as any)
    expect(wrapper.classes('c-radio-group')).toBe(true)
  })
})
