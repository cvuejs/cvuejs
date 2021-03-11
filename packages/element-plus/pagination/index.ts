import CorePagination from './pagination.vue';
import { CoreVueConstructor } from '../../dtos/core.dto';

const Pagination = CorePagination as CoreVueConstructor;
Pagination.install = (Vue) => {
  Vue.component(Pagination.options.name, Pagination);
};

export { Pagination };
