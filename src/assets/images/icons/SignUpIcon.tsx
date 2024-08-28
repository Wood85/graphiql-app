interface IProps {
  className?: string;
}
function SignUpIcon({ className }: IProps): JSX.Element {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      fill='white'
    >
      <path d='M3 12L5 12L5 19L19 19L19 12L21 12L21 19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21L5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19L3 12ZM7 10L8.45 8.625L11 11.175L11 3L13 3L13 11.175L15.55 8.625L17 10L12 15L7 10Z' />
    </svg>
  );
}
export default SignUpIcon;
