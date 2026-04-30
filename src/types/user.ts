import { UserRole, UserStatus } from "@/constants";

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];

export type UserStatusType = (typeof UserStatus)[keyof typeof UserStatus];

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRoleType;
  status?: UserStatusType;
  phone?: string | null;
  image?: string | null;
  createdAt?: string;
  updatedAt?: string;
}
