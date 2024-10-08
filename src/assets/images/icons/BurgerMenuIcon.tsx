interface IProps {
  className?: string;
}
function BurgerMenuIcon({ className }: IProps): JSX.Element {
  return (
    <svg
      width='30'
      height='30'
      viewBox='0 0 30 30'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      fill='white'
      data-testid='svg'
    >
      <path d='M3.75 25.5V23H26.25V25.5H3.75ZM3.75 16.25V13.75H26.25V16.25H3.75ZM3.75 7V4.5H26.25V7H3.75Z' />
    </svg>
  );
}
export default BurgerMenuIcon;
