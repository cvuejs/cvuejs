import { shallowMount } from '@vue/test-utils'
import FormGroup from './form-group.vue'
import '../../utils/lodash'

describe('cvue base: form-group', () => {
  it('renders', () => {
    const c = {}
    const wrapper = shallowMount(FormGroup, {
      stubs: { ElFormGroup: true },
      propsData: { c }
    } as any)
    expect(wrapper.classes('c-form-group')).toBe(true)
  })
})
