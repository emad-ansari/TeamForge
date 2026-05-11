import { create } from "zustand";
import { memberService } from "../services/member.service";
import type { Member, MemberRole } from "../types/member";

interface MemberState {
  members: Member[];
  isLoading: boolean;
  error: string | null;

  fetchMembers: (projectId: string) => Promise<void>;
  updateRole: (projectId: string, memberId: string, role: MemberRole) => Promise<void>;
  removeMember: (projectId: string, memberId: string) => Promise<void>;
}

export const useMemberStore = create<MemberState>((set) => ({
  members: [],
  isLoading: false,
  error: null,

  fetchMembers: async (projectId) => {
    set({ isLoading: true, error: null });
    try {
      const members = await memberService.getProjectMembers(projectId);
      set({ members, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || "Failed to fetch members", 
        isLoading: false 
      });
    }
  },

  updateRole: async (projectId, memberId, role) => {
    try {
      await memberService.updateMemberRole(projectId, memberId, role);
      set((state) => ({
        members: state.members.map((m) => 
          m.id === memberId ? { ...m, role } : m
        ),
      }));
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Failed to update role" });
    }
  },

  removeMember: async (projectId, memberId) => {
    try {
      await memberService.removeMember(projectId, memberId);
      set((state) => ({
        members: state.members.filter((m) => m.id !== memberId),
      }));
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Failed to remove member" });
    }
  },
}));
