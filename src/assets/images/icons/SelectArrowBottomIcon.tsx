interface IProps {
  className?: string;
}
function SelectArrowBottomIcon({ className }: IProps): JSX.Element {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' data-testid='svg' xmlns='http://www.w3.org/2000/svg'>
      <path d='M12 18.1L3 9.1L5.1 7L12 13.9L18.9 7L21 9.1L12 18.1Z' fill='#6B99C3' />
    </svg>
  );
}
export default SelectArrowBottomIcon;
