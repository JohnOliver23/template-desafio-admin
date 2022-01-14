export interface User {
  name: string;
  email: string;
  document: number;
  BirthDate: string;
  salaryBase: number;
  formattedName?: string;
  formattedEmail?: string;
}
export enum Status {
  REQUESTED = "requested",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export enum TypeAudit {
  CARD_STATUS_CHANGE = "card-status-change",
}
export interface Card {
  createdAt: string;
  updatedAt: string;
  status: Status;
  id: number;
  user_id: 1;
  formattedUserName?: string;
  metadatas: {
    name: string;
    digits: number;
    limit: number;
  };
}

export interface Audit {
  id?: number;
  createdAt: string;
  type: TypeAudit;
  before: {
    createdAt: string;
    id: number;
    metadatas: {
      name: string;
      digits: number;
    };
    status?: Status;
    updatedAt?: string;
    user_id: number;
  };
  after: {
    createdAt: string;
    id: number;
    metadatas: {
      name: string;
      digits: number;
    };
    status: Status;
    updatedAt: string;
    user_id: number;
  };
  requestedBy: string;
}

export interface Action {
  payload: any;
  type: string;
  [key: string]: any;
}
