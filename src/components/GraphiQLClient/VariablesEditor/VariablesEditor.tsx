import SelectArrowIcon from '@/assets/images/icons/SelectArrowIcon';
import Button from '@/components/UI/Button/Button';
import style from './VariablesEditor.module.scss';

interface IProps {
  variables: string;
  setVariables: React.Dispatch<React.SetStateAction<string>>;
}

function VariablesEditor({ variables, setVariables }: IProps): JSX.Element {
  return (
    <div className={style.wrapper}>
      <textarea
        className={style.editor}
        placeholder='Query Editor'
        value={variables}
        onChange={(e) => {
          setVariables(e.target.value);
        }}
      />
      <div className={style.buttons}>
        <Button className={style.select_arrow_icon}>
          <SelectArrowIcon />
        </Button>
      </div>
    </div>
  );
}

export { VariablesEditor };
