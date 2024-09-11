import type TRows from '@/interfaces/Rows';
import { VAR_REGEXP, STEP_SIZE, AMOUNT_OF_BRACKETS } from './constants';

function substitution(str: string, variables: TRows): string {
  const matchAll = str.matchAll(VAR_REGEXP);
  const allMatch = Array.from(matchAll);
  let copyStr = str;

  for (let i = 0; i < allMatch.length; i += STEP_SIZE) {
    const varKey = allMatch[i][0].substring(AMOUNT_OF_BRACKETS, allMatch[i][0].length - AMOUNT_OF_BRACKETS);
    const objVariable = variables.find((item) => item.checked && item.key === varKey);
    if (objVariable !== undefined) {
      copyStr = copyStr.replace(allMatch[i][0], objVariable.value);
    }
  }
  return copyStr;
}

export default substitution;
