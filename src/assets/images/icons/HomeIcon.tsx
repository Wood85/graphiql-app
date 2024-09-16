interface IProps {
  className?: string;
}
function HomeIcon({ className }: IProps): JSX.Element {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      fill='white'
      data-testid='svg'
    >
      <path d='M6 19H9V13H15V19H18V10L12 5.5L6 10V19ZM4 21V9L12 3L20 9V21H13V15H11V21H4Z' />
    </svg>
  );
}
export default HomeIcon;
