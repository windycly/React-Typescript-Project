import { HTMLProps, useMemo, useState } from 'react'
import MenuIcon from "../images/menu-horizontal.svg"
import '../style/index.scss'


const Dropdown = (props: HTMLProps<HTMLDivElement>) => {
  const [open, setOpen] = useState(false)
  const customStyle = useMemo(() => ({
    ...props.style,
    display: open ? 'block' : 'none',
  }), [props.style, open])

  return (
    <div className="dropdown">
      <img className="dropdown-icon" src={MenuIcon} alt="menu" width={24} onClick={() => setOpen((v) => !v)} />
      <div className={`dropdown-content`} style={customStyle}>
        {props.children}
      </div>

    </div>
  )
}

export default Dropdown;