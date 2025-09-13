import { useState } from "react";
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Calendar, Target, BarChart3, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { toast } from "sonner";

interface PredictionDashboardProps {
  stock: string;
  onBack: () => void;
}

const PredictionDashboard = ({ stock, onBack }: PredictionDashboardProps) => {
  const [predictionDays, setPredictionDays] = useState("30");
  const [isLoading, setIsLoading] = useState(false);

  // Comprehensive stock data mapping including Indian stocks
  const stockInfo = {
    // US Stocks
    AAPL: { name: "Apple Inc.", price: 173.50, change: 2.34, marketCap: "2.74T", volume: "50.2M" },
    GOOGL: { name: "Alphabet Inc.", price: 138.21, change: 1.89, marketCap: "1.75T", volume: "25.8M" },
    MSFT: { name: "Microsoft Corporation", price: 378.85, change: 0.95, marketCap: "2.82T", volume: "32.1M" },
    TSLA: { name: "Tesla Inc.", price: 248.42, change: -1.23, marketCap: "788B", volume: "95.7M" },
    AMZN: { name: "Amazon.com Inc.", price: 151.94, change: 3.45, marketCap: "1.58T", volume: "40.3M" },
    NVDA: { name: "NVIDIA Corporation", price: 875.28, change: 4.67, marketCap: "2.16T", volume: "28.9M" },
    META: { name: "Meta Platforms Inc.", price: 298.75, change: 1.87, marketCap: "763B", volume: "22.4M" },
    NFLX: { name: "Netflix Inc.", price: 445.20, change: -0.65, marketCap: "198B", volume: "8.7M" },
    ADBE: { name: "Adobe Inc.", price: 512.33, change: 2.18, marketCap: "239B", volume: "3.2M" },
    CRM: { name: "Salesforce Inc.", price: 218.45, change: 0.78, marketCap: "216B", volume: "4.8M" },
    
    // Indian Stocks (NSE)
    "ADANIENT.NS": { name: "Adani Enterprises", price: 2845.50, change: 2.1, marketCap: "3.28T", volume: "1.2M" },
    "ADANIPORTS.NS": { name: "Adani Ports & SEZ", price: 1234.75, change: 1.8, marketCap: "2.67T", volume: "2.1M" },
    "APOLLOHOSP.NS": { name: "Apollo Hospitals", price: 5678.90, change: 0.9, marketCap: "82.3B", volume: "0.5M" },
    "ASIANPAINT.NS": { name: "Asian Paints", price: 3245.80, change: 1.2, marketCap: "3.12T", volume: "0.8M" },
    "AXISBANK.NS": { name: "Axis Bank", price: 1089.45, change: 2.3, marketCap: "3.34T", volume: "4.2M" },
    "BAJAJ-AUTO.NS": { name: "Bajaj Auto", price: 8567.30, change: 1.5, marketCap: "2.48T", volume: "0.3M" },
    "BAJFINANCE.NS": { name: "Bajaj Finance", price: 6789.20, change: 2.8, marketCap: "4.21T", volume: "1.1M" },
    "BAJAJFINSV.NS": { name: "Bajaj Finserv", price: 1543.60, change: 1.9, marketCap: "2.47T", volume: "0.9M" },
    "BPCL.NS": { name: "Bharat Petroleum Corporation Limited", price: 287.45, change: 0.8, marketCap: "62.1B", volume: "8.9M" },
    "BHARTIARTL.NS": { name: "Bharti Airtel", price: 1234.70, change: 1.4, marketCap: "7.23T", volume: "3.2M" },
    "BRITANNIA.NS": { name: "Britannia Industries", price: 4567.80, change: 0.6, marketCap: "1.10T", volume: "0.2M" },
    "CIPLA.NS": { name: "Cipla", price: 1456.90, change: 1.1, marketCap: "1.18T", volume: "1.5M" },
    "COALINDIA.NS": { name: "Coal India", price: 234.50, change: 0.9, marketCap: "1.45T", volume: "12.3M" },
    "DIVISLAB.NS": { name: "Divi's Laboratories", price: 5432.10, change: 2.2, marketCap: "1.45T", volume: "0.4M" },
    "DRREDDY.NS": { name: "Dr. Reddy's Laboratories", price: 1234.80, change: 1.7, marketCap: "2.07T", volume: "0.8M" },
    "EICHERMOT.NS": { name: "Eicher Motors", price: 4321.50, change: 2.5, marketCap: "1.18T", volume: "0.3M" },
    "GRASIM.NS": { name: "Grasim Industries", price: 2345.70, change: 1.3, marketCap: "1.49T", volume: "1.2M" },
    "HCLTECH.NS": { name: "HCL Technologies", price: 1567.80, change: 1.8, marketCap: "4.25T", volume: "2.1M" },
    "HDFCBANK.NS": { name: "HDFC Bank", price: 1678.90, change: 1.5, marketCap: "12.83T", volume: "8.7M" },
    "HDFCLIFE.NS": { name: "HDFC Life", price: 645.30, change: 0.8, marketCap: "1.38T", volume: "2.3M" },
    "HEROMOTOCO.NS": { name: "Hero MotoCorp", price: 4567.20, change: 1.2, marketCap: "91.2B", volume: "0.5M" },
    "HINDALCO.NS": { name: "Hindalco Industries", price: 567.80, change: 2.1, marketCap: "1.27T", volume: "6.8M" },
    "HINDUNILVR.NS": { name: "Hindustan Unilever", price: 2345.60, change: 0.7, marketCap: "5.52T", volume: "1.2M" },
    "ICICIBANK.NS": { name: "ICICI Bank", price: 1234.50, change: 1.9, marketCap: "8.66T", volume: "7.8M" },
    "ITC.NS": { name: "ITC Limited", price: 456.70, change: 0.9, marketCap: "5.68T", volume: "15.2M" },
    "INDUSINDBK.NS": { name: "IndusInd Bank", price: 1345.80, change: 2.4, marketCap: "1.05T", volume: "2.8M" },
    "INFY.NS": { name: "Infosys", price: 1789.20, change: 1.6, marketCap: "7.45T", volume: "4.2M" },
    "JSWSTEEL.NS": { name: "JSW Steel", price: 789.30, change: 2.8, marketCap: "1.90T", volume: "8.9M" },
    "KOTAKBANK.NS": { name: "Kotak Mahindra Bank", price: 1678.40, change: 1.4, marketCap: "3.33T", volume: "2.1M" },
    "LT.NS": { name: "Larsen & Toubro", price: 3456.70, change: 1.7, marketCap: "4.86T", volume: "1.8M" },
    "LTIM.NS": { name: "LTI Mindtree", price: 5432.80, change: 2.3, marketCap: "1.61T", volume: "0.4M" },
    "M&M.NS": { name: "Mahindra & Mahindra", price: 2789.60, change: 1.8, marketCap: "3.47T", volume: "2.3M" },
    "MARUTI.NS": { name: "Maruti Suzuki", price: 11234.50, change: 1.1, marketCap: "3.40T", volume: "0.7M" },
    "NTPC.NS": { name: "NTPC Limited", price: 345.80, change: 0.6, marketCap: "3.35T", volume: "18.9M" },
    "NESTLEIND.NS": { name: "Nestlé India", price: 2345.70, change: 0.9, marketCap: "2.26T", volume: "0.3M" },
    "ONGC.NS": { name: "Oil and Natural Gas Corporation", price: 234.50, change: 1.2, marketCap: "2.95T", volume: "25.8M" },
    "POWERGRID.NS": { name: "Power Grid Corporation of India", price: 267.80, change: 0.8, marketCap: "2.49T", volume: "12.3M" },
    "RELIANCE.NS": { name: "Reliance Industries", price: 2678.90, change: 1.5, marketCap: "18.12T", volume: "6.7M" },
    "SBILIFE.NS": { name: "SBI Life Insurance", price: 1456.30, change: 1.1, marketCap: "1.46T", volume: "1.2M" },
    "SBIN.NS": { name: "State Bank of India", price: 789.40, change: 2.1, marketCap: "7.04T", volume: "12.8M" },
    "SUNPHARMA.NS": { name: "Sun Pharmaceutical", price: 1678.50, change: 1.3, marketCap: "4.03T", volume: "2.8M" },
    "TCS.NS": { name: "Tata Consultancy Services", price: 4123.70, change: 1.7, marketCap: "15.01T", volume: "2.1M" },
    "TATACONSUM.NS": { name: "Tata Consumer Products", price: 987.60, change: 0.9, marketCap: "90.2B", volume: "1.8M" },
    "TATAMOTORS.NS": { name: "Tata Motors", price: 789.20, change: 2.5, marketCap: "2.89T", volume: "15.6M" },
    "TATASTEEL.NS": { name: "Tata Steel", price: 134.80, change: 1.9, marketCap: "1.62T", volume: "45.2M" },
    "TECHM.NS": { name: "Tech Mahindra", price: 1567.30, change: 1.4, marketCap: "1.53T", volume: "2.8M" },
    "TITAN.NS": { name: "Titan Company", price: 3234.50, change: 1.2, marketCap: "2.87T", volume: "1.1M" },
    "UPL.NS": { name: "UPL Limited", price: 567.80, change: 2.2, marketCap: "43.4B", volume: "4.2M" },
    "ULTRACEMCO.NS": { name: "UltraTech Cement", price: 10456.70, change: 1.6, marketCap: "3.08T", volume: "0.2M" },
    "WIPRO.NS": { name: "Wipro Limited", price: 567.40, change: 1.8, marketCap: "3.09T", volume: "8.9M" }
  };

  const currentStock = stockInfo[stock as keyof typeof stockInfo] || stockInfo.AAPL;

  // Generate mock historical and prediction data
  const generateData = () => {
    const historicalData = [];
    const predictionData = [];
    const basePrice = currentStock.price;
    
    // Historical data (last 30 days)
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const randomChange = (Math.random() - 0.5) * 10;
      const price = basePrice + randomChange - (i * 0.5);
      
      historicalData.push({
        date: date.toLocaleDateString(),
        price: Math.max(price, basePrice * 0.8),
        type: 'historical'
      });
    }

    // Prediction data
    const days = parseInt(predictionDays);
    const trend = currentStock.change > 0 ? 1 : -1;
    
    for (let i = 1; i <= days; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const trendFactor = trend * Math.log(i + 1) * 2;
      const volatility = (Math.random() - 0.5) * 5;
      const predictedPrice = basePrice + trendFactor + volatility;
      
      predictionData.push({
        date: date.toLocaleDateString(),
        price: Math.max(predictedPrice, basePrice * 0.7),
        predicted: Math.max(predictedPrice, basePrice * 0.7),
        type: 'prediction'
      });
    }

    return [...historicalData, ...predictionData];
  };

  const chartData = generateData();
  const futurePrice = chartData[chartData.length - 1]?.predicted || currentStock.price;
  const priceChange = futurePrice - currentStock.price;
  const percentChange = (priceChange / currentStock.price) * 100;

  const handlePredict = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Updated ${predictionDays}-day prediction for ${stock}`);
    }, 2000);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-lg p-3 shadow-xl">
          <p className="text-slate-300 text-sm">{`Date: ${label}`}</p>
          <p className="text-blue-400 text-sm font-medium">
            Price: ${payload[0].value?.toFixed(2)}
          </p>
          {data.type === 'prediction' && (
            <Badge className="mt-1 bg-purple-500/20 text-purple-300 border-purple-500/30">
              Predicted
            </Badge>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        {/* Stock Info Header */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl font-bold text-white">{stock}</CardTitle>
                <CardDescription className="text-lg text-slate-300">
                  {currentStock.name}
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">
                  ${currentStock.price.toFixed(2)}
                </div>
                <div className={`flex items-center text-lg font-medium ${
                  currentStock.change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {currentStock.change >= 0 ? <TrendingUp className="w-5 h-5 mr-1" /> : <TrendingDown className="w-5 h-5 mr-1" />}
                  {currentStock.change >= 0 ? '+' : ''}{currentStock.change.toFixed(2)}%
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/5 border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Market Cap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{currentStock.marketCap}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center">
                <Activity className="w-4 h-4 mr-2" />
                Volume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{currentStock.volume}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center">
                <Target className="w-4 h-4 mr-2" />
                Predicted Price
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${futurePrice.toFixed(2)}</div>
              <div className={`text-sm ${percentChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {percentChange >= 0 ? '+' : ''}{percentChange.toFixed(2)}%
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Timeframe
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{predictionDays} Days</div>
            </CardContent>
          </Card>
        </div>

        {/* Prediction Controls */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Prediction Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Prediction Period</label>
                <Select value={predictionDays} onValueChange={setPredictionDays}>
                  <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 Days</SelectItem>
                    <SelectItem value="30">30 Days</SelectItem>
                    <SelectItem value="60">60 Days</SelectItem>
                    <SelectItem value="90">90 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={handlePredict}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isLoading ? "Analyzing..." : "Update Prediction"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Chart */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Price Chart & Predictions</CardTitle>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-sm text-slate-300">Historical</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <span className="text-sm text-slate-300">Predicted</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                  <XAxis 
                    dataKey="date" 
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    domain={['dataMin - 10', 'dataMax + 10']}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#60a5fa"
                    fillOpacity={1}
                    fill="url(#colorPrice)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="predicted"
                    stroke="#a855f7"
                    fillOpacity={1}
                    fill="url(#colorPredicted)"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PredictionDashboard;
