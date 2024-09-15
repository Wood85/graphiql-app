interface IProps {
  className?: string;
}
function SendButtonIcon({ className }: IProps): JSX.Element {
  return (
    <svg width='45' height='45' viewBox='0 0 45 45' fill='none' xmlns='http://www.w3.org/2000/svg' data-testid='svg'>
      <rect width='45' height='45' rx='4' />
      <path
        d='M14.1451 13.1755C14.8483 12.9041 15.6947 12.9502 16.3382 13.2949L31.1159 21.2116C31.6707 21.5088 32 21.9887 32 22.5C32 23.0113 31.6707 23.4912 31.1159 23.7884L16.3382 31.7051C15.6947 32.0498 14.8483 32.0959 14.1451 31.8245C13.442 31.5531 13 31.0098 13 30.4167V14.5833C13 13.9902 13.442 13.4469 14.1451 13.1755Z'
        fill='white'
      />
    </svg>
  );
}
export default SendButtonIcon;