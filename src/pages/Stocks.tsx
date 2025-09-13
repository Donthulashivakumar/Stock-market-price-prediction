
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Stocks = () => {
  const navigate = useNavigate();

  // Comprehensive list of supported stocks including US and Indian stocks
  const supportedStocks = [
    // US Stocks
    { symbol: "AAPL", name: "Apple Inc.", market: "NASDAQ" },
    { symbol: "GOOGL", name: "Alphabet Inc.", market: "NASDAQ" },
    { symbol: "MSFT", name: "Microsoft Corporation", market: "NASDAQ" },
    { symbol: "TSLA", name: "Tesla Inc.", market: "NASDAQ" },
    { symbol: "AMZN", name: "Amazon.com Inc.", market: "NASDAQ" },
    { symbol: "NVDA", name: "NVIDIA Corporation", market: "NASDAQ" },
    { symbol: "META", name: "Meta Platforms Inc.", market: "NASDAQ" },
    { symbol: "NFLX", name: "Netflix Inc.", market: "NASDAQ" },
    { symbol: "ADBE", name: "Adobe Inc.", market: "NASDAQ" },
    { symbol: "CRM", name: "Salesforce Inc.", market: "NYSE" },
    { symbol: "ORCL", name: "Oracle Corporation", market: "NYSE" },
    { symbol: "AMD", name: "Advanced Micro Devices Inc.", market: "NASDAQ" },
    { symbol: "INTC", name: "Intel Corporation", market: "NASDAQ" },
    { symbol: "IBM", name: "International Business Machines Corporation", market: "NYSE" },
    { symbol: "CSCO", name: "Cisco Systems Inc.", market: "NASDAQ" },
    { symbol: "JPM", name: "JPMorgan Chase & Co.", market: "NYSE" },
    { symbol: "BAC", name: "Bank of America Corporation", market: "NYSE" },
    { symbol: "WFC", name: "Wells Fargo & Company", market: "NYSE" },
    { symbol: "GS", name: "The Goldman Sachs Group Inc.", market: "NYSE" },
    { symbol: "MS", name: "Morgan Stanley", market: "NYSE" },
    { symbol: "JNJ", name: "Johnson & Johnson", market: "NYSE" },
    { symbol: "PFE", name: "Pfizer Inc.", market: "NYSE" },
    { symbol: "MRK", name: "Merck & Co. Inc.", market: "NYSE" },
    { symbol: "ABT", name: "Abbott Laboratories", market: "NYSE" },
    { symbol: "TMO", name: "Thermo Fisher Scientific Inc.", market: "NYSE" },
    { symbol: "KO", name: "The Coca-Cola Company", market: "NYSE" },
    { symbol: "PEP", name: "PepsiCo Inc.", market: "NASDAQ" },
    { symbol: "WMT", name: "Walmart Inc.", market: "NYSE" },
    { symbol: "PG", name: "The Procter & Gamble Company", market: "NYSE" },
    { symbol: "HD", name: "The Home Depot Inc.", market: "NYSE" },
    { symbol: "DIS", name: "The Walt Disney Company", market: "NYSE" },
    { symbol: "MCD", name: "McDonald's Corporation", market: "NYSE" },
    { symbol: "NKE", name: "NIKE Inc.", market: "NYSE" },
    { symbol: "SBUX", name: "Starbucks Corporation", market: "NASDAQ" },
    { symbol: "BA", name: "The Boeing Company", market: "NYSE" },
    { symbol: "GE", name: "General Electric Company", market: "NYSE" },
    { symbol: "CAT", name: "Caterpillar Inc.", market: "NYSE" },
    { symbol: "MMM", name: "3M Company", market: "NYSE" },
    { symbol: "XOM", name: "Exxon Mobil Corporation", market: "NYSE" },
    { symbol: "CVX", name: "Chevron Corporation", market: "NYSE" },
    { symbol: "V", name: "Visa Inc.", market: "NYSE" },
    { symbol: "MA", name: "Mastercard Incorporated", market: "NYSE" },
    { symbol: "PYPL", name: "PayPal Holdings Inc.", market: "NASDAQ" },
    { symbol: "UNH", name: "UnitedHealth Group Incorporated", market: "NYSE" },
    { symbol: "CVS", name: "CVS Health Corporation", market: "NYSE" },
    { symbol: "VZ", name: "Verizon Communications Inc.", market: "NYSE" },
    { symbol: "T", name: "AT&T Inc.", market: "NYSE" },
    { symbol: "CMCSA", name: "Comcast Corporation", market: "NASDAQ" },
    { symbol: "COST", name: "Costco Wholesale Corporation", market: "NASDAQ" },
    { symbol: "TGT", name: "Target Corporation", market: "NYSE" },
    
    // Indian Stocks (NSE)
    { symbol: "ADANIENT.NS", name: "Adani Enterprises", market: "NSE" },
    { symbol: "ADANIPORTS.NS", name: "Adani Ports & SEZ", market: "NSE" },
    { symbol: "APOLLOHOSP.NS", name: "Apollo Hospitals", market: "NSE" },
    { symbol: "ASIANPAINT.NS", name: "Asian Paints", market: "NSE" },
    { symbol: "AXISBANK.NS", name: "Axis Bank", market: "NSE" },
    { symbol: "BAJAJ-AUTO.NS", name: "Bajaj Auto", market: "NSE" },
    { symbol: "BAJFINANCE.NS", name: "Bajaj Finance", market: "NSE" },
    { symbol: "BAJAJFINSV.NS", name: "Bajaj Finserv", market: "NSE" },
    { symbol: "BPCL.NS", name: "Bharat Petroleum Corporation Limited", market: "NSE" },
    { symbol: "BHARTIARTL.NS", name: "Bharti Airtel", market: "NSE" },
    { symbol: "BRITANNIA.NS", name: "Britannia Industries", market: "NSE" },
    { symbol: "CIPLA.NS", name: "Cipla", market: "NSE" },
    { symbol: "COALINDIA.NS", name: "Coal India", market: "NSE" },
    { symbol: "DIVISLAB.NS", name: "Divi's Laboratories", market: "NSE" },
    { symbol: "DRREDDY.NS", name: "Dr. Reddy's Laboratories", market: "NSE" },
    { symbol: "EICHERMOT.NS", name: "Eicher Motors", market: "NSE" },
    { symbol: "GRASIM.NS", name: "Grasim Industries", market: "NSE" },
    { symbol: "HCLTECH.NS", name: "HCL Technologies", market: "NSE" },
    { symbol: "HDFCBANK.NS", name: "HDFC Bank", market: "NSE" },
    { symbol: "HDFCLIFE.NS", name: "HDFC Life", market: "NSE" },
    { symbol: "HEROMOTOCO.NS", name: "Hero MotoCorp", market: "NSE" },
    { symbol: "HINDALCO.NS", name: "Hindalco Industries", market: "NSE" },
    { symbol: "HINDUNILVR.NS", name: "Hindustan Unilever", market: "NSE" },
    { symbol: "ICICIBANK.NS", name: "ICICI Bank", market: "NSE" },
    { symbol: "ITC.NS", name: "ITC Limited", market: "NSE" },
    { symbol: "INDUSINDBK.NS", name: "IndusInd Bank", market: "NSE" },
    { symbol: "INFY.NS", name: "Infosys", market: "NSE" },
    { symbol: "JSWSTEEL.NS", name: "JSW Steel", market: "NSE" },
    { symbol: "KOTAKBANK.NS", name: "Kotak Mahindra Bank", market: "NSE" },
    { symbol: "LT.NS", name: "Larsen & Toubro", market: "NSE" },
    { symbol: "LTIM.NS", name: "LTI Mindtree", market: "NSE" },
    { symbol: "M&M.NS", name: "Mahindra & Mahindra", market: "NSE" },
    { symbol: "MARUTI.NS", name: "Maruti Suzuki", market: "NSE" },
    { symbol: "NTPC.NS", name: "NTPC Limited", market: "NSE" },
    { symbol: "NESTLEIND.NS", name: "Nestlé India", market: "NSE" },
    { symbol: "ONGC.NS", name: "Oil and Natural Gas Corporation", market: "NSE" },
    { symbol: "POWERGRID.NS", name: "Power Grid Corporation of India", market: "NSE" },
    { symbol: "RELIANCE.NS", name: "Reliance Industries", market: "NSE" },
    { symbol: "SBILIFE.NS", name: "SBI Life Insurance", market: "NSE" },
    { symbol: "SBIN.NS", name: "State Bank of India", market: "NSE" },
    { symbol: "SUNPHARMA.NS", name: "Sun Pharmaceutical", market: "NSE" },
    { symbol: "TCS.NS", name: "Tata Consultancy Services", market: "NSE" },
    { symbol: "TATACONSUM.NS", name: "Tata Consumer Products", market: "NSE" },
    { symbol: "TATAMOTORS.NS", name: "Tata Motors", market: "NSE" },
    { symbol: "TATASTEEL.NS", name: "Tata Steel", market: "NSE" },
    { symbol: "TECHM.NS", name: "Tech Mahindra", market: "NSE" },
    { symbol: "TITAN.NS", name: "Titan Company", market: "NSE" },
    { symbol: "UPL.NS", name: "UPL Limited", market: "NSE" },
    { symbol: "ULTRACEMCO.NS", name: "UltraTech Cement", market: "NSE" },
    { symbol: "WIPRO.NS", name: "Wipro Limited", market: "NSE" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Header />
      
      <div className="px-6 py-8 mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/dashboard")}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-white">Available Stock Symbols</h1>
            <p className="text-slate-400">
              Complete list of stock symbols and company names available on our platform
            </p>
          </div>

          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Supported Stocks</CardTitle>
              <CardDescription className="text-slate-400">
                {supportedStocks.length} stocks available for prediction and analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10">
                      <TableHead className="text-slate-300">Symbol</TableHead>
                      <TableHead className="text-slate-300">Company Name</TableHead>
                      <TableHead className="text-slate-300">Market</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {supportedStocks.map((stock) => (
                      <TableRow key={stock.symbol} className="border-white/10 hover:bg-white/5">
                        <TableCell className="font-medium text-blue-400">{stock.symbol}</TableCell>
                        <TableCell className="text-white">{stock.name}</TableCell>
                        <TableCell className="text-slate-300">{stock.market}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Stocks;
