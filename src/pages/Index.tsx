
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StockChart from "@/components/StockChart";
import PredictionDashboard from "@/components/PredictionDashboard";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PopularStocksSection from "@/components/PopularStocksSection";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Index = () => {
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPrediction, setShowPrediction] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Comprehensive list of supported stocks including US and Indian stocks
  const supportedStocks = [
    // US Stocks
    "AAPL", "GOOGL", "MSFT", "TSLA", "AMZN", "NVDA", "META", "NFLX", "ADBE", "CRM",
    "ORCL", "AMD", "INTC", "IBM", "CSCO", "JPM", "BAC", "WFC", "GS", "MS",
    "JNJ", "PFE", "MRK", "ABT", "TMO", "KO", "PEP", "WMT", "PG", "HD",
    "DIS", "MCD", "NKE", "SBUX", "BA", "GE", "CAT", "MMM", "XOM", "CVX",
    "V", "MA", "PYPL", "UNH", "CVS", "VZ", "T", "CMCSA", "COST", "TGT",
    // Indian Stocks (NSE)
    "ADANIENT.NS", "ADANIPORTS.NS", "APOLLOHOSP.NS", "ASIANPAINT.NS", "AXISBANK.NS",
    "BAJAJ-AUTO.NS", "BAJFINANCE.NS", "BAJAJFINSV.NS", "BPCL.NS", "BHARTIARTL.NS",
    "BRITANNIA.NS", "CIPLA.NS", "COALINDIA.NS", "DIVISLAB.NS", "DRREDDY.NS",
    "EICHERMOT.NS", "GRASIM.NS", "HCLTECH.NS", "HDFCBANK.NS", "HDFCLIFE.NS",
    "HEROMOTOCO.NS", "HINDALCO.NS", "HINDUNILVR.NS", "ICICIBANK.NS", "ITC.NS",
    "INDUSINDBK.NS", "INFY.NS", "JSWSTEEL.NS", "KOTAKBANK.NS", "LT.NS",
    "LTIM.NS", "M&M.NS", "MARUTI.NS", "NTPC.NS", "NESTLEIND.NS", "ONGC.NS",
    "POWERGRID.NS", "RELIANCE.NS", "SBILIFE.NS", "SBIN.NS", "SUNPHARMA.NS",
    "TCS.NS", "TATACONSUM.NS", "TATAMOTORS.NS", "TATASTEEL.NS", "TECHM.NS",
    "TITAN.NS", "UPL.NS", "ULTRACEMCO.NS", "WIPRO.NS"
  ];

  const handleStockSelect = (symbol: string) => {
    if (!user) {
      toast.error("Please sign in to access stock predictions");
      navigate("/auth");
      return;
    }

    // Check if the symbol is in our supported list
    if (supportedStocks.includes(symbol.toUpperCase())) {
      setSelectedStock(symbol.toUpperCase());
      setShowPrediction(true);
      toast.success(`Loading prediction for ${symbol.toUpperCase()}`);
    } else {
      toast.error(`Stock symbol ${symbol.toUpperCase()} not supported. Try one of our featured stocks.`);
    }
  };

  if (showPrediction && selectedStock) {
    return <PredictionDashboard stock={selectedStock} onBack={() => setShowPrediction(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Header />
      
      <HeroSection 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onStockSelect={handleStockSelect}
      />

      <FeaturesSection />

      <div className="px-6 py-16 mx-auto max-w-7xl">
        <PopularStocksSection onStockSelect={handleStockSelect} />

        {/* Demo Chart Section */}
        <div id="live-market-preview" className="mt-16 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-white">Live Market Preview</h2>
            <p className="text-slate-400">Sample stock chart with prediction overlay</p>
          </div>
          <StockChart />
        </div>
      </div>
    </div>
  );
};

export default Index;
