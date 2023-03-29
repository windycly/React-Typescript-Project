import { DataType } from '../hooks/useData';
import useSortUserTeam from '../hooks/useSortUserTeam'

describe('useSortUserTeam', () => {
  describe('table list', () => {
    it('Should return the user team list in correct order', () => {
      const list = [{
        user: "Ken Cheung",
        team: "IT Support",
      }, {
        team: "Finance",
      }, {
        team: "Marketing",
      }, {
        user: "Amy Wong",
        team: "Sales",
      }] as DataType[];

      expect(
        (list).sort(useSortUserTeam)
      ).toEqual(
        [{
          user: "Amy Wong",
          team: "Sales",
        }, {
          team: "Finance",
        }, {
          user: "Ken Cheung",
          team: "IT Support",
        }, {
          team: "Marketing",
        }]
      );
    });
  });
})