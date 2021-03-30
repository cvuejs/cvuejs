import { shallowMount } from '@vue/test-utils'
import TableColumn from './table-column.vue'
import '../../utils/lodash'

describe('cvue base: table-column', () => {
  it('renders', () => {
    const c = {}
    const wrapper = shallowMount(TableColumn, {
      stubs: { ElTableColumn: true },
      propsData: { c }
    } as any)
    expect(wrapper.classes('c-table-column')).toBe(true)
  })
})
