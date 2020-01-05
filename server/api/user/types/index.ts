export type TAddUserInput = {
  phone: number;
  password: string;
  role: number;
};

export type TRemoveUserInput = {
  id: number;
};

export type TUpdateUserInput = {
  id: number;
  name?: string;
  password?: string;
  phone?: number;
  avatar?: string;
  balance?: number;
  payWays?: TPayWay[];
  inviteCode?: string;
  inviteId?: number;
  status?: number;
  role?: number;
};

export type TSignInUserInput = {
  phone: number;
  password?: string;
  verifyCode?: string;
  inviteCode?: string;
};

export type TSignUpUserInput = {
  phone: number;
  password?: string;
  verifyCode?: string;
};

export type TLogoutUserInput = {
  id: number;
  password?: string;
};

export type TUpdateUserSelfInput = {
  id: number;
  name?: string;
  password?: string;
  phone?: number;
  avatar?: string;
  payWays?: TPayWay[];
  inviteCode?: string;
};

export type TVerifyMessageInput = {
  phone: number;
};

export type TQueryUserInput = {
  id: number;
};

export type TQueryUserListingInput = {
  name: string;
  phone: number;
  payWay: TPayWay;
  inviteId: number;
  status: number;
  role: number;
  balance: number[];
  date: string[];
};

export type TUser = {
  id: number;
  name?: string;
  password: string;
  phone: number;
  avatar?: string;
  balance: number;
  payWays: TPayWay[];
  inviteCode: string;
  inviteId?: number;
  status: number;
  role: number;
  signInDate?: string;
  loginDate?: string;
  logoutDate?: string;
};

export type TPayWay = {
  code: number;
  account: string;
};
