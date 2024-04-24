export const HELPDESK_ENDPOINT = '/api/ticket';

export const TICKET_STATUS_OPENED = 'Opened';
export const TICKET_STATUS_INPROGRESS = 'In Progress';
export const TICKET_STATUS_RESOLVED = 'Resolved';

export const TICKET_STATUSES = [
  TICKET_STATUS_OPENED,
  TICKET_STATUS_INPROGRESS,
  TICKET_STATUS_RESOLVED,
] as const;
