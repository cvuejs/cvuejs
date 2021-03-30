import { shallowMount } from '@vue/test-utils'
import ButtonGroup from './button-group.vue'
import '../../utils/lodash'

describe('cvue base: button-group', () => {
  it('renders', () => {
    const c = {}
    const wrapper = shallowMount(ButtonGroup, {
      stubs: { ElButtonGroup: true },
      propsData: { c }
    } as any)
    expect(wrapper.classes('c-button-group')).toBe(true)
  })
})
