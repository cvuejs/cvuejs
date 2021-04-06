import { shallowMount } from '@vue/test-utils'
import RadioButton from './radio-button.vue'
import '../../utils/lodash'

describe('cvue base: radio-button', () => {
  it('renders', () => {
    const c = {}
    const wrapper = shallowMount(RadioButton, {
      stubs: { ElRadioButton: true },
      propsData: { c }
    } as any)
    expect(wrapper.classes('c-radio-button')).toBe(true)
  })
})
