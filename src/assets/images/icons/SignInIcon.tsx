interface IProps {
  className: string;
}

function SignInIcon({ className }: IProps): JSX.Element {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      fill='white'
    >
      <path d='M12 21V19H19V5H12V3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H12ZM10 17L8.625 15.55L11.175 13H3V11H11.175L8.625 8.45L10 7L15 12L10 17Z' />
    </svg>
  );
}
export default SignInIcon;

