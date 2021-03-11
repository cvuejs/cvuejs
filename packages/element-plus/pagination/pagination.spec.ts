import { shallowMount } from '@vue/test-utils';
import Pagination from './pagination.vue';
import '../src/utils/lodash';

describe('mousse base: pagination', () => {
  it('renders', () => {
    const c = {};
    const wrapper = shallowMount(Pagination, {
      stubs: { ElPagination: true },
      propsData: { c }
    });
    expect(wrapper.contains('.c-pagination')).toBe(true);
  });
});
