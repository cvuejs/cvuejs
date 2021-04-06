import { shallowMount } from '@vue/test-utils'
import TimePicker from './time-picker.vue'
import '../../utils/lodash'

describe('cvue base: time-picker', () => {
  it('renders', () => {
    const c = {}
    const wrapper = shallowMount(TimePicker, {
      stubs: { ElTimePicker: true },
      propsData: { c }
    } as any)
    expect(wrapper.classes('c-time-picker')).toBe(true)
  })
})
