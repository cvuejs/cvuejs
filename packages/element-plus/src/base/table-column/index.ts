import { COMPONENT_TYPE } from '../../utils/constants/component';
import { TableColumnAdapter } from './table-column.adapter'
import TableColumn from './table-column.vue'
import { App } from 'vue'
import { setComponentConfig } from '../../utils/config'

TableColumn.install = (app: App, opt: TableColumnAdapter) => {
  setComponentConfig(COMPONENT_TYPE.tableColumn, opt)
  app.component(TableColumn.name, TableColumn)
}

export { TableColumn }
