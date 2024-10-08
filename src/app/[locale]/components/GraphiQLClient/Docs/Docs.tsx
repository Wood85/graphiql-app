import {
  type IntrospectionEnumType,
  type IntrospectionInputObjectType,
  type IntrospectionObjectType,
  type IntrospectionQuery,
  type IntrospectionType,
} from 'graphql';
import style from './Docs.module.scss';

interface IProps {
  schema: IntrospectionQuery | null;
}

function Docs(props: IProps): JSX.Element {
  const { schema } = props;
  const ZERO = 0;
  const ONE = 1;

  return (
    <div className={style.docs}>
      <h2 className={style.docs_heading}>Schema</h2>
      <div className={style.docs_fields}>
        {schema !== null
          ? schema.__schema.types
              .filter((el) => !el.name.match(/^__/) && el)
              .map((el: IntrospectionType) => (
                <div key={el.name}>
                  <div className={style.name}>type {el.name}</div>
                  <div className={style.description}>{el.description}</div>
                  {(el as IntrospectionObjectType).fields !== null ||
                  (el as IntrospectionInputObjectType).inputFields !== null ||
                  (el as IntrospectionEnumType).enumValues !== null ? (
                    <div>
                      {(
                        (el as IntrospectionObjectType).fields ||
                        (el as IntrospectionInputObjectType).inputFields ||
                        (el as IntrospectionEnumType).enumValues
                      ).map((elem) => (
                        <div key={elem.name}>
                          <div className={style.subName}>
                            {elem.name}
                            {elem.args && elem.args.length !== ZERO && '('}
                            {elem.args?.map((arg, i) =>
                              i !== elem.args.length - ONE ? (
                                <span key={arg.name}>{arg.name}, </span>
                              ) : (
                                <span key={arg.name}>{arg.name}</span>
                              ),
                            )}
                            {elem.args && elem.args.length !== ZERO && ')'}
                            <span className={style.type}>
                              {elem.type && (elem.type as IntrospectionObjectType)?.name !== null && `: `}
                              {(elem.type as IntrospectionObjectType)?.name}
                            </span>
                          </div>
                          <div className={style.subDescription}>{elem.description}</div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  <div />
                </div>
              ))
          : 'No schema available'}
      </div>
    </div>
  );
}

export { Docs };
