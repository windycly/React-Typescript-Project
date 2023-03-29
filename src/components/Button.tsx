import { HTMLProps, useMemo } from 'react'
import '../style/index.scss'

export enum ButtonColorType {
  PRIMARY = "primary",
  ERROR = "error",
  SUCCESS = "success",
}

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  color?: ButtonColorType
};

const Button = (props: ButtonProps) => {
  const { className, color, children, type, ...otherProps } = props;
  const customClassName = useMemo(() =>
    `button ${className ?? ''} ${color ?? ''}`,
    [className, color])

  return (
    <button className={customClassName} {...otherProps}>
      {children}
    </button>
  )
}

export default Button;