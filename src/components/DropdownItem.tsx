import { HTMLProps, useMemo } from 'react'
import '../style/index.scss'

const Dropdown = (props: HTMLProps<HTMLDivElement>) => {
  const { className, children, ...otherProps } = props;

  const customClassName = useMemo(() =>
    `dropdown-item ${className ?? ''}`,
  [className])

  return (
    <div className={customClassName} {...otherProps}>
      {props.children}
    </div>
  )
}

export default Dropdown;