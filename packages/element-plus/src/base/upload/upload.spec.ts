import { shallowMount } from '@vue/test-utils'
import Upload from './upload.vue'
import '../../utils/lodash'

describe('cvue base: upload', () => {
  it('renders', () => {
    const c = {}
    const wrapper = shallowMount(Upload, {
      stubs: { ElUpload: true },
      propsData: { c }
    } as any)
    expect(wrapper.classes('c-upload')).toBe(true)
  })
})
