import { ElPagination } from 'element-ui/types/pagination';
import { CoreAdapter, CoreOutput } from '../../dtos/core.dto';

type OmitKeys = '';
type ElPaginationAdapter = Omit<Partial<ElPagination>, OmitKeys>;

export interface PaginationAdapter extends ElPaginationAdapter, CoreAdapter<ElPagination> {
  on?: {};
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PaginationOutput extends CoreOutput {}

export const PAGINATION_DEFAULT: PaginationAdapter = {};
