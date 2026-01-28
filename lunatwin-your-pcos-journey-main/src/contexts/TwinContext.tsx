import React, { createContext, useContext, useState, useCallback } from 'react';
import { DigitalTwin, TwinBasicInfo, TwinLifestyle, HealthIndicators, PersonaType } from '@/types/twin';

export interface HealthHistoryPoint {
  date: string;
  hormoneBalance: number;
  inflammationIndex: number;
  insulinSensitivity: number;
  energyLevel: number;
  cycleRegularity: number;
}

interface TwinContextType {
  twin: DigitalTwin | null;
  isAuthenticated: boolean;
  healthHistory: HealthHistoryPoint[];
  setAuthenticated: (value: boolean) => void;
  createTwin: (basicInfo: TwinBasicInfo, lifestyle: TwinLifestyle) => void;
  updateLifestyle: (lifestyle: Partial<TwinLifestyle>) => void;
  getPersonaInfo: (type: PersonaType) => { name: string; description: string; color: string };
}

const TwinContext = createContext<TwinContextType | undefined>(undefined);

const PERSONAS: Record<PersonaType, { name: string; description: string; color: string }> = {
  'stress-amplified': {
    name: 'Stress-Amplified',
    description: 'Your twin is experiencing elevated stress responses, which may be affecting hormone balance.',
    color: 'stress',
  },
  'insulin-resistant': {
    name: 'Insulin-Resistant Warrior',
    description: 'Your twin shows patterns associated with insulin resistance, requiring attention to blood sugar management.',
    color: 'mild',
  },
  'inflammation-spike': {
    name: 'Inflammation Spike',
    description: 'Your twin is showing elevated inflammation markers that may be impacting overall well-being.',
    color: 'stress',
  },
  'irregular-rhythm': {
    name: 'Irregular Rhythm',
    description: 'Your twin\'s cycle patterns suggest irregularity that may benefit from lifestyle adjustments.',
    color: 'mild',
  },
  'balanced-bloom': {
    name: 'Balanced Bloom',
    description: 'Your twin is thriving! Lifestyle factors are well-aligned for optimal PCOS management.',
    color: 'balanced',
  },
  'hormone-reset': {
    name: 'Hormone Reset',
    description: 'Your twin is in a transition phase, working to restore hormonal balance.',
    color: 'mild',
  },
};

function calculateIndicators(lifestyle: TwinLifestyle): HealthIndicators {
  const { sleepHours, stressLevel, activityLevel, dietPattern, waterIntake, screenTime } = lifestyle;
  
  // Normalize inputs (0-100 scale)
  const sleepScore = Math.min(100, (sleepHours / 8) * 100);
  const stressScore = 100 - stressLevel; // Lower stress is better
  const activityScore = activityLevel;
  const dietScore = dietPattern;
  const hydrationScore = Math.min(100, (waterIntake / 8) * 100);
  const screenScore = Math.max(0, 100 - (screenTime / 12) * 100);
  
  // Calculate health indicators
  const hormoneBalance = Math.round((sleepScore * 0.3 + stressScore * 0.3 + activityScore * 0.2 + dietScore * 0.2) * 0.9 + 10);
  const inflammationIndex = Math.round(100 - (dietScore * 0.3 + activityScore * 0.3 + sleepScore * 0.2 + stressScore * 0.2) * 0.85);
  const insulinSensitivity = Math.round((activityScore * 0.35 + dietScore * 0.35 + sleepScore * 0.15 + hydrationScore * 0.15) * 0.9 + 10);
  const energyLevel = Math.round((sleepScore * 0.35 + activityScore * 0.25 + hydrationScore * 0.2 + dietScore * 0.2) * 0.85 + 15);
  const cycleRegularity = Math.round((hormoneBalance * 0.4 + stressScore * 0.3 + sleepScore * 0.3) * 0.8 + 20);
  
  return {
    hormoneBalance: Math.min(100, Math.max(0, hormoneBalance)),
    inflammationIndex: Math.min(100, Math.max(0, inflammationIndex)),
    insulinSensitivity: Math.min(100, Math.max(0, insulinSensitivity)),
    energyLevel: Math.min(100, Math.max(0, energyLevel)),
    cycleRegularity: Math.min(100, Math.max(0, cycleRegularity)),
  };
}

function determinePersona(indicators: HealthIndicators, lifestyle: TwinLifestyle): PersonaType {
  const { hormoneBalance, inflammationIndex, insulinSensitivity, cycleRegularity } = indicators;
  const { stressLevel } = lifestyle;
  
  // Calculate overall health score
  const overallScore = (hormoneBalance + (100 - inflammationIndex) + insulinSensitivity + cycleRegularity) / 4;
  
  if (overallScore >= 70) return 'balanced-bloom';
  if (stressLevel > 70) return 'stress-amplified';
  if (insulinSensitivity < 40) return 'insulin-resistant';
  if (inflammationIndex > 60) return 'inflammation-spike';
  if (cycleRegularity < 50) return 'irregular-rhythm';
  return 'hormone-reset';
}

function generateHistoricalData(indicators: HealthIndicators): HealthHistoryPoint[] {
  const history: HealthHistoryPoint[] = [];
  const today = new Date();
  
  // Generate 7 days of simulated historical data with some variance
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Add some variance to make trends more interesting
    const variance = () => Math.floor(Math.random() * 15) - 7;
    const clamp = (val: number) => Math.min(100, Math.max(0, val));
    
    // More variance for older data, stabilizing towards current
    const factor = i / 6;
    
    history.push({
      date: date.toLocaleDateString('en-US', { weekday: 'short' }),
      hormoneBalance: clamp(indicators.hormoneBalance + variance() * factor),
      inflammationIndex: clamp(indicators.inflammationIndex + variance() * factor),
      insulinSensitivity: clamp(indicators.insulinSensitivity + variance() * factor),
      energyLevel: clamp(indicators.energyLevel + variance() * factor),
      cycleRegularity: clamp(indicators.cycleRegularity + variance() * factor),
    });
  }
  
  return history;
}

export function TwinProvider({ children }: { children: React.ReactNode }) {
  const [twin, setTwin] = useState<DigitalTwin | null>(null);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [healthHistory, setHealthHistory] = useState<HealthHistoryPoint[]>([]);

  const createTwin = useCallback((basicInfo: TwinBasicInfo, lifestyle: TwinLifestyle) => {
    const indicators = calculateIndicators(lifestyle);
    const persona = determinePersona(indicators, lifestyle);
    
    const newTwin: DigitalTwin = {
      id: crypto.randomUUID(),
      basicInfo,
      lifestyle,
      indicators,
      persona,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setTwin(newTwin);
    setHealthHistory(generateHistoricalData(indicators));
  }, []);

  const updateLifestyle = useCallback((lifestyleUpdate: Partial<TwinLifestyle>) => {
    if (!twin) return;
    
    const newLifestyle = { ...twin.lifestyle, ...lifestyleUpdate };
    const indicators = calculateIndicators(newLifestyle);
    const persona = determinePersona(indicators, newLifestyle);
    
    setTwin({
      ...twin,
      lifestyle: newLifestyle,
      indicators,
      persona,
      updatedAt: new Date(),
    });
    
    // Add new data point to history
    const today = new Date();
    const newPoint: HealthHistoryPoint = {
      date: today.toLocaleDateString('en-US', { weekday: 'short' }),
      ...indicators,
    };
    
    setHealthHistory(prev => {
      const updated = [...prev.slice(-6), newPoint];
      return updated;
    });
  }, [twin]);

  const getPersonaInfo = useCallback((type: PersonaType) => {
    return PERSONAS[type];
  }, []);

  return (
    <TwinContext.Provider value={{ 
      twin, 
      isAuthenticated, 
      healthHistory,
      setAuthenticated, 
      createTwin, 
      updateLifestyle,
      getPersonaInfo 
    }}>
      {children}
    </TwinContext.Provider>
  );
}

export function useTwin() {
  const context = useContext(TwinContext);
  if (context === undefined) {
    throw new Error('useTwin must be used within a TwinProvider');
  }
  return context;
}
