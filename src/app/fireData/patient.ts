export interface Patient {
  id: number;
  reportDate: string | Date;
  employeeId: number;
  firstName: string;
  lastName: string;
  department: string;
  sickness: string;
  hospital: string;
  recorder: string;
}
