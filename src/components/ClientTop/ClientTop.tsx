'use client';

import { usePathname } from 'next/navigation';

import clsx from 'clsx';

import DocsIcon from '@/assets/images/icons/DocsIcon';
import GraphqlIcon from '@/assets/images/icons/GraphqlIcon';
import HistoryIcon from '@/assets/images/icons/HistoryIcon';
import RestapiIcon from '@/assets/images/icons/RestapiIcon';
import { ROUTES } from '@/utils/constants';
import Button from '../UI/Button/Button';

import style from './ClientTop.module.scss';

interface IProps {
  title: string;
  setGraphqlDocsIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  graphqlDocsIsOpen?: boolean;
  isDocsAvailable?: boolean;
}

function ClientTop({ title, setGraphqlDocsIsOpen, graphqlDocsIsOpen, isDocsAvailable }: IProps): JSX.Element {
  const pathname = usePathname();

  return (
    <div className={style.top}>
      {pathname.includes(ROUTES.GRAPHQL) && isDocsAvailable && (
        <div className={style.graphql_docs}>
          <Button
            className={clsx(style.button, graphqlDocsIsOpen === true && style.docs_open)}
            onClick={() => {
              if (setGraphqlDocsIsOpen !== undefined && graphqlDocsIsOpen !== undefined)
                setGraphqlDocsIsOpen(!graphqlDocsIsOpen);
            }}
            data-testid='docsBtn'
          >
            <DocsIcon className={style.icon} />
          </Button>
        </div>
      )}
      <h2 className={style.title}>{title}</h2>
      <div className={style.links}>
        {pathname.includes(ROUTES.RESTAPI) && (
          <Button href={ROUTES.GRAPHQL} className={style.button} data-testid='graphqlBtn'>
            <GraphqlIcon className={style.icon} />
          </Button>
        )}
        {pathname.includes(ROUTES.GRAPHQL) && (
          <Button href={ROUTES.RESTAPI} className={style.button} data-testid='restapiBtn'>
            <RestapiIcon className={style.icon} />
          </Button>
        )}
        <Button href={ROUTES.HISTORY} className={style.button} data-testid='historyBtn'>
          <HistoryIcon className={style.icon} />
        </Button>
      </div>
    </div>
  );
}

export { ClientTop };
