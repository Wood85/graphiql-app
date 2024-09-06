export interface IHeader {
  key: string;
  value: string;
}

export interface IHeaderWithCheckbox extends IHeader {
  checked: boolean;
}

type THeaders = IHeaderWithCheckbox[];

export default THeaders;
