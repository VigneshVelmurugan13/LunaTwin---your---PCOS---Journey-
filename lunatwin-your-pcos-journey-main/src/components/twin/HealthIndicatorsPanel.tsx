import { motion } from 'framer-motion';
import { useTwin } from '@/contexts/TwinContext';
import { 
  Moon, 
  Flame, 
  Zap, 
  Activity, 
  Heart,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';

interface HealthIndicator {
  name: string;
  value: number;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  inverse?: boolean; // If true, lower is better (like inflammation)
}

export function HealthIndicatorsPanel() {
  const { twin } = useTwin();
  
  if (!twin) return null;

  const indicators: HealthIndicator[] = [
    {
      name: 'Hormone Balance',
      value: twin.indicators.hormoneBalance,
      icon: Moon,
      color: 'text-primary',
      bgColor: 'bg-luna-lavender-light',
    },
    {
      name: 'Inflammation',
      value: twin.indicators.inflammationIndex,
      icon: Flame,
      color: 'text-health-stress',
      bgColor: 'bg-orange-100',
      inverse: true,
    },
    {
      name: 'Insulin Sensitivity',
      value: twin.indicators.insulinSensitivity,
      icon: Activity,
      color: 'text-luna-mint-dark',
      bgColor: 'bg-luna-mint',
    },
    {
      name: 'Energy Level',
      value: twin.indicators.energyLevel,
      icon: Zap,
      color: 'text-health-mild',
      bgColor: 'bg-yellow-100',
    },
    {
      name: 'Cycle Regularity',
      value: twin.indicators.cycleRegularity,
      icon: Heart,
      color: 'text-luna-rose-dark',
      bgColor: 'bg-luna-rose',
    },
  ];

  const getStatusColor = (value: number, inverse?: boolean) => {
    const effective = inverse ? 100 - value : value;
    if (effective >= 70) return 'bg-health-balanced';
    if (effective >= 40) return 'bg-health-mild';
    return 'bg-health-stress';
  };

  const getTrendIcon = (value: number, inverse?: boolean) => {
    const effective = inverse ? 100 - value : value;
    if (effective >= 60) return TrendingUp;
    if (effective >= 40) return Minus;
    return TrendingDown;
  };

  return (
    <div className="glass-card rounded-3xl p-6 h-full">
      <h3 className="font-display text-lg font-semibold text-foreground mb-5 flex items-center gap-2">
        <Activity className="w-5 h-5 text-primary" />
        Health Indicators
      </h3>
      
      <div className="space-y-4">
        {indicators.map((indicator, index) => {
          const TrendIcon = getTrendIcon(indicator.value, indicator.inverse);
          const displayValue = indicator.inverse 
            ? 100 - indicator.value 
            : indicator.value;
          
          return (
            <motion.div
              key={indicator.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-8 h-8 rounded-lg ${indicator.bgColor} flex items-center justify-center`}>
                  <indicator.icon className={`w-4 h-4 ${indicator.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{indicator.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-display font-bold text-foreground">
                    {indicator.value}%
                  </span>
                  <TrendIcon className={`w-4 h-4 ${
                    displayValue >= 60 ? 'text-health-balanced' : 
                    displayValue >= 40 ? 'text-health-mild' : 
                    'text-health-stress'
                  }`} />
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${indicator.value}%` }}
                  transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
                  className={`h-full rounded-full ${getStatusColor(indicator.value, indicator.inverse)}`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
