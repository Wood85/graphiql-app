interface IProps {
  className?: string;
}
function SelectArrowTopIcon({ className }: IProps): JSX.Element {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M12 5.9L21 14.9L18.9 17L12 10.1L5.1 17L3 14.9L12 5.9Z' fill='#6B99C3' />
    </svg>
  );
}
export default SelectArrowTopIcon;
