import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Label,
} from "recharts";
import "./Dashboard.scss";

const chartData: Record<string, { name: string; amt: number; interest: number }[]> = {
  "2020": [
    { name: "Jan", amt: 1400, interest: 200 },
    { name: "Feb", amt: 2398, interest: 350 },
    { name: "Mar", amt: 5800, interest: 800 },
    { name: "Apr", amt: 2908, interest: 400 },
    { name: "May", amt: 3800, interest: 550 },
    { name: "Jun", amt: 4800, interest: 700 },
    { name: "Jul", amt: 3300, interest: 450 },
    { name: "Aug", amt: 4200, interest: 600 },
    { name: "Sep", amt: 3900, interest: 520 },
    { name: "Oct", amt: 5100, interest: 750 },
    { name: "Nov", amt: 4600, interest: 650 },
    { name: "Dec", amt: 5500, interest: 820 },
  ],
  "2021": [
    { name: "Jan", amt: 4000, interest: 600 },
    { name: "Feb", amt: 3000, interest: 450 },
    { name: "Mar", amt: 2000, interest: 300 },
    { name: "Apr", amt: 2780, interest: 390 },
    { name: "May", amt: 1890, interest: 280 },
    { name: "Jun", amt: 2390, interest: 350 },
    { name: "Jul", amt: 3490, interest: 500 },
    { name: "Aug", amt: 3800, interest: 540 },
    { name: "Sep", amt: 4200, interest: 620 },
    { name: "Oct", amt: 3600, interest: 510 },
    { name: "Nov", amt: 4100, interest: 580 },
    { name: "Dec", amt: 4800, interest: 700 },
  ],
  "2022": [
    { name: "Jan", amt: 2400, interest: 300 },
    { name: "Feb", amt: 1398, interest: 180 },
    { name: "Mar", amt: 9800, interest: 1400 },
    { name: "Apr", amt: 3908, interest: 550 },
    { name: "May", amt: 4800, interest: 680 },
    { name: "Jun", amt: 3800, interest: 500 },
    { name: "Jul", amt: 4300, interest: 600 },
    { name: "Aug", amt: 5200, interest: 750 },
    { name: "Sep", amt: 4700, interest: 670 },
    { name: "Oct", amt: 6100, interest: 880 },
    { name: "Nov", amt: 5400, interest: 780 },
    { name: "Dec", amt: 7200, interest: 1050 },
  ],
};

const DashboardCharts: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState("2022");
  const data = chartData[selectedYear] || chartData["2022"];
  const years = Object.keys(chartData).sort().reverse();

  const formatYAxis = (value: number) => {
    if (value >= 1000) {
      return `${value / 1000}K`;
    }
    return value.toString();
  };

  const formatTooltip = (value: number) => {
    return `₦${value.toLocaleString()}`;
  };

  return (
    <>
      <div className="dashboard-charts-section">
        <div className="chart-header">
          <h3>Loan Disbursement</h3>
          <div className="chart-actions">
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)}
              className="year-filter"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 20, // Increased bottom margin for label
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(33, 63, 125, 0.1)" />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#545F7D", fontSize: 12 }}
                dy={10}
              >
                <Label value="Months" offset={0} position="insideBottom" style={{ fill: '#545F7D', fontSize: '12px', fontWeight: 500 }} />
              </XAxis>
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#545F7D", fontSize: 12 }}
                tickFormatter={formatYAxis}
              >
                 <Label value="Amount (₦)" angle={-90} position="insideLeft" style={{ fill: '#545F7D', fontSize: '12px', fontWeight: 500, textAnchor: 'middle' }} />
              </YAxis>
              <Tooltip 
                cursor={{ fill: "rgba(33, 63, 125, 0.05)" }}
                contentStyle={{ border: "none", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}
                formatter={(value: number | undefined) => value !== undefined ? [formatTooltip(value), "Amount"] : ["", ""]}
              />
              <Bar dataKey="amt" fill="#39CDCC" barSize={30} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="dashboard-charts-section" style={{ marginTop: '30px' }}>
        <div className="chart-header">
          <h3>Interest Earned</h3>
        </div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 20, // Increased bottom margin for label
              }}
            >
              <defs>
                <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5718FF" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#5718FF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(33, 63, 125, 0.1)" />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#545F7D", fontSize: 12 }}
                dy={10}
              >
                <Label value="Months" offset={0} position="insideBottom" style={{ fill: '#545F7D', fontSize: '12px', fontWeight: 500 }} />
              </XAxis>
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#545F7D", fontSize: 12 }}
                tickFormatter={formatYAxis}
              >
                <Label value="Interest (₦)" angle={-90} position="insideLeft" style={{ fill: '#545F7D', fontSize: '12px', fontWeight: 500, textAnchor: 'middle' }} />
              </YAxis>
              <Tooltip 
                contentStyle={{ border: "none", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}
                formatter={(value: number | undefined) => value !== undefined ? [formatTooltip(value), "Interest"] : ["", ""]}
              />
              <Area 
                type="monotone" 
                dataKey="interest" 
                stroke="#5718FF" 
                fillOpacity={1} 
                fill="url(#colorInterest)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default DashboardCharts;
