export interface Incident {
  id?: number | null;  // Make id optional and nullable
  reportDate: string;
  report: string;
  location: string;
  type: string;
  description: string;
  solution: string;
  recorder: string;
  images?: File | null;  // Make image optional and proper type
}
