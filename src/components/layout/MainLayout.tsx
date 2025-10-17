import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { useUser } from "@/contexts/UserContext";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { currentRole } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate based on role when it changes
    if (currentRole === "Admin") {
      navigate("/admin/users");
    } else if (currentRole === "Coordenador") {
      navigate("/coordinator/projects");
    } else if (currentRole === "Gestor") {
      navigate("/manager");
    }
  }, [currentRole, navigate]);

  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};
