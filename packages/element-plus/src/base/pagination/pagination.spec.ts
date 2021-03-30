import { shallowMount } from '@vue/test-utils'
import Pagination from './pagination.vue'
import '../../utils/lodash'

describe('cvue base: pagination', () => {
  it('renders', () => {
    const c = {}
    const wrapper = shallowMount(Pagination, {
      stubs: { ElPagination: true },
      propsData: { c }
    } as any)
    expect(wrapper.classes('c-pagination')).toBe(true)
  })
})
