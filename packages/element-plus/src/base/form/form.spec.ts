import { shallowMount } from '@vue/test-utils'
import Form from './form.vue'
import '../../utils/lodash'

describe('cvue base: form', () => {
  it('renders', () => {
    const c = {}
    const wrapper = shallowMount(Form, {
      stubs: { ElForm: true },
      propsData: { c }
    } as any)
    expect(wrapper.classes('c-form')).toBe(true)
  })
})
