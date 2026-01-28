export interface TwinBasicInfo {
  ageRange: string;
  height?: number;
  weight?: number;
  pcosDuration: string;
}

export interface TwinLifestyle {
  sleepHours: number;
  stressLevel: number;
  activityLevel: number;
  dietPattern: number;
  waterIntake: number;
  screenTime: number;
}

export interface HealthIndicators {
  hormoneBalance: number;
  inflammationIndex: number;
  insulinSensitivity: number;
  energyLevel: number;
  cycleRegularity: number;
  weightTrendFactor?: number;
}

export type PersonaType = 
  | 'stress-amplified'
  | 'insulin-resistant'
  | 'inflammation-spike'
  | 'irregular-rhythm'
  | 'balanced-bloom'
  | 'hormone-reset';

export interface Persona {
  type: PersonaType;
  name: string;
  description: string;
  color: string;
  icon: string;
}

export interface DigitalTwin {
  id: string;
  basicInfo: TwinBasicInfo;
  lifestyle: TwinLifestyle;
  indicators: HealthIndicators;
  persona: PersonaType;
  createdAt: Date;
  updatedAt: Date;
}

export interface SimulationState {
  currentTwin: DigitalTwin | null;
  simulatedTwin: DigitalTwin | null;
  timeHorizon: 7 | 14 | 30;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
