import { Oval } from 'react-loader-spinner';

function Spinner(): JSX.Element {
  return (
    <Oval
      height='80'
      width='80'
      color='#6b99c3'
      secondaryColor='#6b99c3'
      wrapperStyle={{
        justifyContent: 'center',
      }}
      wrapperClass='spinner-wrapper'
    />
  );
}

export default Spinner;
