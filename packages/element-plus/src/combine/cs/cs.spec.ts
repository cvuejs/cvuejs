import { shallowMount } from '@vue/test-utils'
import Cs from './cs.vue'
import '../../utils/lodash'

describe('cvue base: cs', () => {
  it('renders', () => {
    const c = {}
    const wrapper = shallowMount(Cs, {
      stubs: { ElCs: true },
      propsData: { c }
    } as any)
    expect(wrapper.classes('c-cs')).toBe(true)
  })
})
