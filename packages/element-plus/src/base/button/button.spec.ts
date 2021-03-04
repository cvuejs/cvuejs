import { shallowMount } from '@vue/test-utils';
import Button from './button.vue';
import '../../utils/lodash';

describe('mousse base: button', () => {
  it('renders', () => {
    const c = {};
    const wrapper = shallowMount(Button, {
      stubs: { ElButton: true },
      propsData: { c }
    });
    expect(wrapper.contains('.c-button')).toBe(true);
  });
});
