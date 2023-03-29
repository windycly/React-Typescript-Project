import { ChangeEvent, useCallback, useEffect, useState } from "react"
import Button, { ButtonColorType } from "../../components/Button"
import Dropdown from "../../components/Dropdown"
import DropdownItem from "../../components/DropdownItem"
import Modal from "../../components/Modal"
import { DataType } from "../../hooks/useData"

type AddTeamModalProps = {
  teams: string[]
  selectedData: DataType[]
  open?: boolean
  onClose?: () => void
  onAddTeams?: (d: DataType[]) => void
}

const AddTeamModal = (props: AddTeamModalProps) => {
  const { open, onClose, teams, onAddTeams, selectedData } = props
  const [selected, setSelected] = useState<string[]>([])

  useEffect(() => {
    // reset selected list when modal close
    if (!open) {
      setSelected([])
    }
  }, [open])

  // add to selected list
  const onHandleSelect = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const targetTeam = e.target.value;
    setSelected((prev) => [
      ...prev,
      targetTeam
    ])

    // reset the selection index
    e.target.selectedIndex = 0
  }, [])

  // remove selected
  const onHandleRemove = useCallback((target: string) => {
    setSelected((prev) => prev.filter((p) => p !== target))
  }, [])
 
  // add to table
  const onHandleAddTeams = useCallback(() => {
    if (selected.length && onAddTeams) {
      onAddTeams(selected.map((s) => ({
        team: s
      }) as DataType))

      if (onClose) {
        onClose()
      }
    }
  }, [selected, onAddTeams, onClose])

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ margin: 32 }}>
        <h4>Add team</h4>
        <select onChange={onHandleSelect}>
          <option>Select team</option>
          {/* should exclude team in selected list and table */}
          {/* TODO: useMemo filteredTeam */}
          {teams.filter((t) => !selectedData.find((s) => !s.user && s.team === t) && !selected.find((s) => s === t))
            .map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))
          }
        </select>

        <div style={{ marginTop: 8, marginBottom: 64 }}>
          {selected.map((s) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>{s}</span>
              <Dropdown>
                <DropdownItem onClick={() => onHandleRemove(s)}>Remove</DropdownItem>
              </Dropdown>
            </div>
          ))}
        </div>

        <Button color={ButtonColorType.PRIMARY} onClick={onHandleAddTeams}>
          Add
        </Button>
      </div>
    </Modal>
  )
}

export default AddTeamModal