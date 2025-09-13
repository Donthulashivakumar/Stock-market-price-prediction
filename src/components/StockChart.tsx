
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const StockChart = () => {
  // Mock data that simulates real stock data
  const data = [
    { time: '09:30', price: 150.25, predicted: null },
    { time: '10:00', price: 151.80, predicted: null },
    { time: '10:30', price: 149.95, predicted: null },
    { time: '11:00', price: 152.30, predicted: null },
    { time: '11:30', price: 153.75, predicted: null },
    { time: '12:00', price: 152.90, predicted: null },
    { time: '12:30', price: 154.20, predicted: null },
    { time: '13:00', price: 155.45, predicted: null },
    { time: '13:30', price: 154.80, predicted: null },
    { time: '14:00', price: 156.10, predicted: null },
    { time: '14:30', price: 157.25, predicted: 157.25 }, // Prediction starts here
    { time: '15:00', price: null, predicted: 158.40 },
    { time: '15:30', price: null, predicted: 159.80 },
    { time: '16:00', price: null, predicted: 161.20 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-lg p-3 shadow-xl">
          <p className="text-slate-300 text-sm">{`Time: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className={`text-sm font-medium ${
              entry.dataKey === 'price' ? 'text-blue-400' : 'text-purple-400'
            }`}>
              {entry.dataKey === 'price' ? 'Current: ' : 'Predicted: '}${entry.value?.toFixed(2)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white">AAPL - Apple Inc.</h3>
          <p className="text-slate-400">Real-time price with ML predictions</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <span className="text-sm text-slate-300">Current Price</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
            <span className="text-sm text-slate-300">Predicted Price</span>
          </div>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis 
              dataKey="time" 
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
              domain={['dataMin - 2', 'dataMax + 2']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#60a5fa"
              strokeWidth={2}
              dot={{ fill: '#60a5fa', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#60a5fa', strokeWidth: 2, fill: '#1e40af' }}
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#a855f7"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#a855f7', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#a855f7', strokeWidth: 2, fill: '#7c3aed' }}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockChart;
