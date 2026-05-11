export type MemberRole = "ADMIN" | "MEMBER";

export interface Member {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: MemberRole;
  joinedAt: string;
}

export interface MemberResponse {
  message: string;
  members?: Member[];
}
