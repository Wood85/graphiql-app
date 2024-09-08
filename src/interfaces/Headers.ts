export interface IHeader {
  key: string;
  value: string;
}

export interface IHeaderWithCheckbox extends IHeader {
  checked: boolean;
  userDefined?: boolean;
}

type THeaders = IHeaderWithCheckbox[];

export default THeaders;
