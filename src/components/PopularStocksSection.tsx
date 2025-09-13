
import { Activity, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PopularStock {
  symbol: string;
  name: string;
  price: string;
  change: string;
}

interface PopularStocksSectionProps {
  onStockSelect: (symbol: string) => void;
}

const PopularStocksSection = ({ onStockSelect }: PopularStocksSectionProps) => {
  const popularStocks: PopularStock[] = [
    { symbol: "AAPL", name: "Apple Inc.", price: "$173.50", change: "+2.34%" },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: "$138.21", change: "+1.89%" },
    { symbol: "MSFT", name: "Microsoft Corp.", price: "$378.85", change: "+0.95%" },
    { symbol: "TSLA", name: "Tesla Inc.", price: "$248.42", change: "-1.23%" },
    { symbol: "AMZN", name: "Amazon.com Inc.", price: "$151.94", change: "+3.45%" },
    { symbol: "NVDA", name: "NVIDIA Corp.", price: "$875.28", change: "+4.67%" },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">Popular Stocks</h2>
        <p className="text-slate-400">Click on any stock to see predictions</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularStocks.map((stock) => (
          <Card 
            key={stock.symbol}
            className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer hover:scale-105"
            onClick={() => onStockSelect(stock.symbol)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-lg">{stock.symbol}</CardTitle>
                  <CardDescription className="text-slate-400 text-sm">
                    {stock.name}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold">{stock.price}</div>
                  <div className={`text-sm font-medium ${
                    stock.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stock.change}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Activity className="h-4 w-4" />
                <span>Click to predict</span>
                <ArrowRight className="h-4 w-4 ml-auto" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PopularStocksSection;
