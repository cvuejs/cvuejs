import { shallowMount } from '@vue/test-utils'
import DatePicker from './date-picker.vue'
import '../../utils/lodash'

describe('cvue base: date-picker', () => {
  it('renders', () => {
    const c = {}
    const wrapper = shallowMount(DatePicker, {
      stubs: { ElDatePicker: true },
      propsData: { c }
    } as any)
    expect(wrapper.classes('c-date-picker')).toBe(true)
  })
})
