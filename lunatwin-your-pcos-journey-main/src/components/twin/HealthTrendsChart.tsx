import { useMemo } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp } from 'lucide-react';

interface HealthHistoryPoint {
  date: string;
  hormoneBalance: number;
  inflammationIndex: number;
  insulinSensitivity: number;
  energyLevel: number;
  cycleRegularity: number;
}

interface HealthTrendsChartProps {
  history: HealthHistoryPoint[];
}

const INDICATOR_COLORS = {
  hormoneBalance: 'hsl(270, 45%, 65%)', // Primary lavender
  inflammationIndex: 'hsl(25, 85%, 55%)', // Orange/stress
  insulinSensitivity: 'hsl(210, 60%, 55%)', // Sky blue
  energyLevel: 'hsl(45, 80%, 55%)', // Yellow/energy
  cycleRegularity: 'hsl(340, 50%, 65%)', // Rose
};

const INDICATOR_LABELS: Record<string, string> = {
  hormoneBalance: 'Hormone Balance',
  inflammationIndex: 'Inflammation',
  insulinSensitivity: 'Insulin Sensitivity',
  energyLevel: 'Energy Level',
  cycleRegularity: 'Cycle Regularity',
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-xl p-3 border border-white/50 shadow-lg">
        <p className="text-sm font-medium text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">
              {INDICATOR_LABELS[entry.dataKey] || entry.dataKey}:
            </span>
            <span className="font-medium text-foreground">{entry.value}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function HealthTrendsChart({ history }: HealthTrendsChartProps) {
  const processedData = useMemo(() => {
    return history.map((point, index) => ({
      ...point,
      // Invert inflammation for better visual (lower is better)
      inflammationDisplay: 100 - point.inflammationIndex,
    }));
  }, [history]);

  const overallTrendData = useMemo(() => {
    return processedData.map(point => ({
      date: point.date,
      overall: Math.round(
        (point.hormoneBalance + 
         (100 - point.inflammationIndex) + 
         point.insulinSensitivity + 
         point.energyLevel + 
         point.cycleRegularity) / 5
      ),
    }));
  }, [processedData]);

  return (
    <Card className="glass-card border-0">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="w-5 h-5 text-primary" />
          Health Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50">
            <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
            <TabsTrigger value="detailed" className="text-xs">All Indicators</TabsTrigger>
            <TabsTrigger value="hormones" className="text-xs">Key Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={overallTrendData}>
                  <defs>
                    <linearGradient id="overallGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(270, 45%, 65%)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="hsl(270, 45%, 65%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(250, 20%, 90%)" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 10, fill: 'hsl(250, 15%, 45%)' }}
                    axisLine={{ stroke: 'hsl(250, 20%, 90%)' }}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    tick={{ fontSize: 10, fill: 'hsl(250, 15%, 45%)' }}
                    axisLine={{ stroke: 'hsl(250, 20%, 90%)' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="overall"
                    stroke="hsl(270, 45%, 65%)"
                    strokeWidth={2}
                    fill="url(#overallGradient)"
                    name="Overall Health Score"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Overall health score trend over time
            </p>
          </TabsContent>

          <TabsContent value="detailed" className="mt-4">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={processedData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(250, 20%, 90%)" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 10, fill: 'hsl(250, 15%, 45%)' }}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    tick={{ fontSize: 10, fill: 'hsl(250, 15%, 45%)' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    wrapperStyle={{ fontSize: '10px' }}
                    formatter={(value) => INDICATOR_LABELS[value] || value}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="hormoneBalance" 
                    stroke={INDICATOR_COLORS.hormoneBalance}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="energyLevel" 
                    stroke={INDICATOR_COLORS.energyLevel}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="insulinSensitivity" 
                    stroke={INDICATOR_COLORS.insulinSensitivity}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="hormones" className="mt-4">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={processedData}>
                  <defs>
                    <linearGradient id="hormoneGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={INDICATOR_COLORS.hormoneBalance} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={INDICATOR_COLORS.hormoneBalance} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="cycleGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={INDICATOR_COLORS.cycleRegularity} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={INDICATOR_COLORS.cycleRegularity} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(250, 20%, 90%)" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 10, fill: 'hsl(250, 15%, 45%)' }}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    tick={{ fontSize: 10, fill: 'hsl(250, 15%, 45%)' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    wrapperStyle={{ fontSize: '10px' }}
                    formatter={(value) => INDICATOR_LABELS[value] || value}
                  />
                  <Area
                    type="monotone"
                    dataKey="hormoneBalance"
                    stroke={INDICATOR_COLORS.hormoneBalance}
                    strokeWidth={2}
                    fill="url(#hormoneGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="cycleRegularity"
                    stroke={INDICATOR_COLORS.cycleRegularity}
                    strokeWidth={2}
                    fill="url(#cycleGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Hormone balance & cycle regularity trends
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
