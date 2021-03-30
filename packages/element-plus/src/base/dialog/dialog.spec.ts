import { shallowMount } from '@vue/test-utils'
import Dialog from './dialog.vue'
import '../../utils/lodash'

describe('cvue base: dialog', () => {
  it('renders', () => {
    const c = {}
    const wrapper = shallowMount(Dialog, {
      stubs: { ElDialog: true },
      propsData: { c }
    } as any)
    expect(wrapper.classes('c-dialog')).toBe(true)
  })
})
