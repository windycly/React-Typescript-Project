import { DataType } from "./useData";

const useSortUserTeam = (a: DataType, b: DataType) => {
  const d1 = a.user ?? a.team;
  const d2 = b.user ?? b.team;

  return d1.localeCompare(d2)
}

export default useSortUserTeam;