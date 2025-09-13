
import { TrendingUp, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Header = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
  };

  return (
    <header className="relative z-10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-blue-400" />
          </div>
          <span className="text-white font-semibold">Stock Predictor</span>
        </div>
        
        <div className="flex items-center space-x-4">
          {loading ? (
            <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse"></div>
          ) : user ? (
            <div className="flex items-center space-x-3">
              <span className="text-white text-sm">Welcome back!</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-white hover:bg-white/10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => navigate("/auth")}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
