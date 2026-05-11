import api from "../lib/api";
import type { Member, MemberResponse } from "../types/member";

export const memberService = {
  getProjectMembers: async (projectId: string): Promise<Member[]> => {
    const response = await api.get<MemberResponse>(`/member/${projectId}/members`);
    return response.data.members || [];
  },

  updateMemberRole: async (projectId: string, memberId: string, role: string): Promise<void> => {
    await api.patch(`/member/${projectId}/members/${memberId}`, { role });
  },

  removeMember: async (projectId: string, memberId: string): Promise<void> => {
    await api.delete(`/member/${projectId}/members/${memberId}`);
  },
};
