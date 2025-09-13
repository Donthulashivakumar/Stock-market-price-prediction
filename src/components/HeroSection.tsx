
import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface HeroSectionProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onStockSelect: (symbol: string) => void;
}

const HeroSection = ({ searchTerm, setSearchTerm, onStockSelect }: HeroSectionProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in to access stock predictions");
      navigate("/auth");
      return;
    }
    
    if (searchTerm.trim()) {
      onStockSelect(searchTerm.toUpperCase());
      setSearchTerm("");
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-3xl" />
      <div className="relative px-6 py-24 mx-auto max-w-7xl">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Stock Price
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {" "}Predictor
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Machine learning predictions for stock market analysis and forecasting.
            </p>
            {!user && (
              <p className="text-blue-300 font-medium">
                Sign in to access predictions for 90+ supported stocks (US & Indian markets)
              </p>
            )}
          </div>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-4 max-w-md mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Enter stock symbol (e.g., AAPL, SBIN.NS)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:bg-white/20 transition-all"
              />
            </div>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Predict
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
