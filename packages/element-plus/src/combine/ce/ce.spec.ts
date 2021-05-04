import { shallowMount } from '@vue/test-utils'
import Ce from './ce.vue'
import '../../utils/lodash'

describe('cvue base: ce', () => {
  it('renders', () => {
    const c = {}
    const wrapper = shallowMount(Ce, {
      stubs: { ElCe: true },
      propsData: { c }
    } as any)
    expect(wrapper.classes('c-ce')).toBe(true)
  })
})
