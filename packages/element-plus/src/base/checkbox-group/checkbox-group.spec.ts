import { shallowMount } from '@vue/test-utils'
import CheckboxGroup from './checkbox-group.vue'
import '../../utils/lodash'

describe('cvue base: checkbox-group', () => {
  it('renders', () => {
    const c = {}
    const wrapper = shallowMount(CheckboxGroup, {
      stubs: { ElCheckboxGroup: true },
      propsData: { c }
    } as any)
    expect(wrapper.classes('c-checkbox-group')).toBe(true)
  })
})
