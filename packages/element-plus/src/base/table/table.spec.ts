import { shallowMount } from '@vue/test-utils'
import Table from './table.vue'
import '../../utils/lodash'

describe('cvue base: table', () => {
  it('renders', () => {
    const c = {}
    const wrapper = shallowMount(Table, {
      stubs: { ElTable: true },
      propsData: { c }
    } as any)
    expect(wrapper.classes('c-table')).toBe(true)
  })
})
