import { ChangeEvent, useCallback, useEffect, useState } from "react"
import Button, { ButtonColorType } from "../../components/Button"
import Dropdown from "../../components/Dropdown"
import DropdownItem from "../../components/DropdownItem"
import Modal from "../../components/Modal"
import { DataType } from "../../hooks/useData"

type AddUserModalProps = {
  users: DataType[]
  selectedData: DataType[]
  open?: boolean
  onClose?: () => void
  onAddUsers?: (d: DataType[]) => void
}

const AddUserModal = (props: AddUserModalProps) => {
  const { open, onClose, users, onAddUsers, selectedData } = props
  const [selected, setSelected] = useState<DataType[]>([])

  useEffect(() => {
    // reset selected list when modal close
    if (!open) {
      setSelected([])
    }
  }, [open])

  // add to selected list
  const onHandleSelect = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const targetUser = users.find((u) => u.user === e.target.value)
    if (targetUser) {
      setSelected((prev) => [
        ...prev,
        targetUser
      ])
    }

    // reset the selection index
    e.target.selectedIndex = 0
  }, [users])

  // remove selected
  const onHandleRemove = useCallback((target: DataType) => {
    setSelected((prev) => prev.filter((p) => p.user !== target.user))
  }, [])
 
  // add to table
  const onHandleAddUsers = useCallback(() => {
    if (selected.length && onAddUsers) {
      onAddUsers(selected)
    }
    
    if (onClose) {
      onClose()
    }
  }, [selected, onAddUsers, onClose])

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ margin: 32 }}>
        <h4>Add user</h4>
        <select onChange={onHandleSelect}>
          <option>Select user</option>
          {/* should exclude user in selected list and table */}
          {/* TODO: useMemo filteredUser */}
          {users.filter((u) => !selectedData.find((s) => s.user === u.user) && !selected.find((s) => s.user === u.user))
            .map((u) => (
              <option key={u.user} value={u.user}>
                {u.user} - {u.team}
              </option>
            ))
          }
        </select>

        <div style={{ marginTop: 8, marginBottom: 64 }}>
          {selected.map((s) => (
            <div key={s.user} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <span>
                {s.user} - {s.team}
              </span>
              <Dropdown>
                <DropdownItem onClick={() => onHandleRemove(s)}>Remove</DropdownItem>
              </Dropdown>
            </div>
          ))}
        </div>

        <Button color={ButtonColorType.PRIMARY} onClick={onHandleAddUsers}>
          Add
        </Button>
      </div>
    </Modal>
  )
}

export default AddUserModal