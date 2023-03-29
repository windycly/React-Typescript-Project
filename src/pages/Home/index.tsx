import { useCallback, useState } from 'react';
import Button, { ButtonColorType } from '../../components/Button';
import useData, { DataType } from '../../hooks/useData';
import useSortUserTeam from '../../hooks/useSortUserTeam';
import AddTeamModal from './AddTeamModal';
import AddUserModal from './AddUserModal';

const HomePage = () => {
  const { users, teams } = useData();
  const [openUserModal, setOpenUserModal] = useState(false);
  const [openTeamModal, setOpenTeamModal] = useState(false);
  const [selectedData, setSelectedData] = useState<DataType[]>([]);
  
  const onSelectData = useCallback((data?: DataType[]) => {
    if (!data?.length) return

    setSelectedData((prev) => [
      ...prev,
      ...data,
    ].sort(useSortUserTeam))
  }, [])

  return (
    <div style={{ margin: 16}}>
      <div style={{display: 'flex', justifyContent: 'end', marginBottom: 16, gap: 16}}>
        <Button color={ButtonColorType.PRIMARY} onClick={() => setOpenUserModal(true)}>Add User</Button>
        <Button color={ButtonColorType.PRIMARY} onClick={() => setOpenTeamModal(true)}>Add Team</Button>
      </div>

      <h4>Selected users and teams</h4>
      <table>
        <tbody>
          {selectedData.map((user) => (
            <tr key={[user.user, user.team].join()}>
              <td>
                {user.user ? user.user : user.team}
              </td>
              <td>
                {user.user ? user.team : 'Team'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AddUserModal
        open={openUserModal}
        onClose={() => setOpenUserModal(false)}
        users={users}
        selectedData={selectedData}
        onAddUsers={onSelectData}
      />

      <AddTeamModal
        open={openTeamModal}
        onClose={() => setOpenTeamModal(false)}
        teams={teams}
        selectedData={selectedData}
        onAddTeams={onSelectData}
      />
    </div>
  )
}

export default HomePage;