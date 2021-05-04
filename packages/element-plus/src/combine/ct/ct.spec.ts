import { shallowMount } from '@vue/test-utils'
import Ct from './ct.vue'
import '../../utils/lodash'

describe('cvue base: ct', () => {
  it('renders', () => {
    const c = {}
    const wrapper = shallowMount(Ct, {
      stubs: { ElCt: true },
      propsData: { c }
    } as any)
    expect(wrapper.classes('c-ct')).toBe(true)
  })
})
