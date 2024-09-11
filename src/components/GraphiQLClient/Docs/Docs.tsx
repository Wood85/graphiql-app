import { buildClientSchema, printSchema, type IntrospectionQuery } from 'graphql';
import style from './Docs.module.scss';

interface IProps {
  schema: IntrospectionQuery | null;
}

function Docs(props: IProps): JSX.Element {
  const { schema } = props;

  return (
    <div className={style.docs}>
      <div className={style.docs_title}>&lt; Docs</div>
      <h2 className={style.docs_heading}>Query</h2>
      <div className={style.docs_fields}>
        {schema !== null ? printSchema(buildClientSchema(schema)) : 'No schema available'}
      </div>
    </div>
  );
}

export { Docs };
