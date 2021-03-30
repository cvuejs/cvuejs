import { shallowMount } from '@vue/test-utils'
import Button from './button.vue'
import '../../utils/lodash'

describe('cvue base: button', () => {
  it('renders', () => {
    const c = {}
    const wrapper = shallowMount(Button, {
      stubs: { ElButton: true },
      props: { c }
    } as any)
    expect(wrapper.classes('c-button')).toBe(true)
  })
})
