export interface ITableColumn {
  name: string,
  example: any
}

export class TableColumn implements ITableColumn {
  constructor(public name: string, public example: any) {

  }
}
