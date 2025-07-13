export interface Claims {
  fireExtinguisherId: number;
  serialNumber: string;
  type: string;
  size: string;
  claims: string;
  status: string;
  location: string;
  actionTaken?: string;
  replacement: string;
  claimDate: string | Date;
}
