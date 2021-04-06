import { shallowMount } from '@vue/test-utils'
import FormItem from './form-item.vue'
import '../../utils/lodash'

describe('cvue base: form-item', () => {
  it('renders', () => {
    const c = {}
    const wrapper = shallowMount(FormItem, {
      stubs: { ElFormItem: true },
      propsData: { c }
    } as any)
    expect(wrapper.classes('c-form-item')).toBe(true)
  })
})
