import { MouseEvent, HTMLProps, useCallback, useMemo, useRef } from 'react'
import '../style/index.scss'

interface ModalProps extends HTMLProps<HTMLDivElement> {
  open?: boolean
  onClose?: () => void
}

const Modal = (props: ModalProps) => {
  const modalRef = useRef(null);

  const customStyle = useMemo(() => ({
    ...props.style,
    display: props.open ? 'block' : 'none',
  }), [props.style, props.open])

  // TODO: control Modal click to close
  const handleClickToClose = useCallback((e: MouseEvent<HTMLElement>) => {
    if (e.target === modalRef.current && props.onClose) {
      props.onClose()
    }
  }, [props])

  return (
    <div className="modal" style={customStyle} onClick={handleClickToClose} ref={modalRef}>
      <div className="modal-content">
        <span className="close" onClick={props.onClose}>&times;</span>
        {props.children}
      </div>
    </div>
  )
}

export default Modal;