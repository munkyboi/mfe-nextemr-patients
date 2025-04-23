export const FABIRCATE_TOKEN = process.env.NEXT_PUBLIC_FABRICATE_TOKEN || '';
export const QUEUE_POLLING = process.env.NEXT_PUBLIC_QUEUE_POLLING || 3600000;

export interface IValidateStatusBody {
  status?: string;
  message?: string;
}
