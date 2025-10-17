import { Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/contexts/UserContext";
import { UserRole } from "@/types/risk";

export const Header = () => {
  const { currentRole, setCurrentRole } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-header shadow-md">
      <div className="flex h-16 items-center gap-4 px-6">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
            <span className="text-xl font-bold text-primary-foreground">RM</span>
          </div>
          <h1 className="text-xl font-semibold text-primary-foreground">
            Risk Management
          </h1>
        </div>

        {/* Profile Switch */}
        <Tabs 
          value={currentRole} 
          onValueChange={(value) => setCurrentRole(value as UserRole)}
          className="ml-8"
        >
          <TabsList className="bg-white/10 backdrop-blur-sm">
            <TabsTrigger value="Admin" className="data-[state=active]:bg-white data-[state=active]:text-primary">
              Admin
            </TabsTrigger>
            <TabsTrigger value="Coordenador" className="data-[state=active]:bg-white data-[state=active]:text-primary">
              Coordenador
            </TabsTrigger>
            <TabsTrigger value="Gestor" className="data-[state=active]:bg-white data-[state=active]:text-primary">
              Gestor
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Search */}
        <div className="ml-auto flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-foreground/60" />
            <Input
              placeholder="Buscar..."
              className="pl-10 bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/60"
            />
          </div>

          {/* Avatar */}
          <Avatar className="h-9 w-9 border-2 border-white/30">
            <AvatarFallback className="bg-white/20 text-primary-foreground">
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};
