export interface IRow {
  key: string;
  value: string;
}

export interface IRowWithCheckbox extends IRow {
  checked: boolean;
  userDefined?: boolean;
}

type TRows = IRowWithCheckbox[];

export default TRows;
