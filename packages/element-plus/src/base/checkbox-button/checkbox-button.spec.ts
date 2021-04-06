import { shallowMount } from '@vue/test-utils'
import CheckboxButton from './checkbox-button.vue'
import '../../utils/lodash'

describe('cvue base: checkbox-button', () => {
  it('renders', () => {
    const c = {}
    const wrapper = shallowMount(CheckboxButton, {
      stubs: { ElCheckboxButton: true },
      propsData: { c }
    } as any)
    expect(wrapper.classes('c-checkbox-button')).toBe(true)
  })
})
