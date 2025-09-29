import { Payment } from "./interfacePayment";

export interface PartnerDetails {
  id: number;
  name: string;
  email: string;
  dateRecord: string;
  payments: Payment[]; // La clave es que esta es una lista de pagos
}