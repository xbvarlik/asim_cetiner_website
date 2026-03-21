"use client";

import { createContext, useContext, type ReactNode } from "react";

export type AdminAuthState = {
  isAuthenticated: boolean;
  adminId: string | null;
};

const AdminAuthContext = createContext<AdminAuthState>({
  isAuthenticated: false,
  adminId: null,
});

export function AdminAuthProvider({
  children,
  isAuthenticated,
  adminId,
}: {
  children: ReactNode;
  isAuthenticated: boolean;
  adminId: string | null;
}): React.JSX.Element {
  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, adminId }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth(): AdminAuthState {
  return useContext(AdminAuthContext);
}
