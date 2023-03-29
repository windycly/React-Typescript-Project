import { useMemo } from "react";

export interface DataType {
  user?: string
  team: string
}

const useUsers = () => {
  const users: DataType[] = useMemo(() => [{
    user: 'Amy Wong',
    team: 'Sales'
  }, {
    user: 'Ken Cheung',
    team: 'IT Support'
  }, {
    user: 'Ben Chan',
    team: 'BA'
  }, {
    user: 'Eva Shum',
    team: 'Manager'
  }, {
    user: 'Zeo Chan',
    team: 'Designer'
  }], [])

  const teams: string[] = useMemo(() => users.map((u) => u.team), [users])

  return {
    users,
    teams
  }
}

export default useUsers;