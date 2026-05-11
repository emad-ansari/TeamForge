import api from "../lib/api";

export const inviteService = {
  inviteMember: async (projectId: string, email: string, role: string): Promise<void> => {
    await api.post(`/invite/${projectId}`, { email, role });
  },

  acceptInvite: async (token: string): Promise<void> => {
    await api.post(`/invite/accept`, { token });
  },
};
