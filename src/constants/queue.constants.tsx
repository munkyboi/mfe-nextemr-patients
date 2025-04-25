export const QUEUE_STATUS: { [key: string]: string } = {
  QUEUED: 'queued',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  BILLED: 'billed',
  RE_SCHEDULED: 're-scheduled',
  NOTIFIED: 'notified',
  PAID: 'paid'
};

export const QUEUE_STATUS_TYPE = {
  ACTIVE: ['queued', 'in-progress', 'notified', 'billed', 'paid'],
  INACTIVE: ['completed', 'cancelled', 're-scheduled']
};
