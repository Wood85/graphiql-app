interface IProps {
  className?: string;
}
function SelectArrowIcon({ className }: IProps): JSX.Element {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' data-testid='svg' xmlns='http://www.w3.org/2000/svg'>
      <path d='M12 15.4L6 9.4L7.4 8L12 12.6L16.6 8L18 9.4L12 15.4Z' fill='#6B99C3' />
    </svg>
  );
}
export default SelectArrowIcon;
