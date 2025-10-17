import React, { createContext, useContext, useState } from "react";
import { UserRole } from "@/types/risk";
import { mockUsers } from "@/lib/mockData";

interface UserContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentUserId: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>("Coordenador");
  
  // Mock: get first user of current role
  const currentUserId = mockUsers.find(u => u.role === currentRole)?.id || "1";

  return (
    <UserContext.Provider value={{ currentRole, setCurrentRole, currentUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};
