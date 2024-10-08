interface IProps {
  className?: string;
}
function CloseIcon({ className }: IProps): JSX.Element {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height='34px'
      viewBox='0 -960 960 960'
      width='34px'
      fill='white'
      className={className}
      data-testid='svg'
    >
      <path d='m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z' />
    </svg>
  );
}
export default CloseIcon;
