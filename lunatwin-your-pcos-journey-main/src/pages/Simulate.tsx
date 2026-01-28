import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Navbar } from '@/components/layout/Navbar';
import { PageTransition, FadeIn } from '@/components/layout/PageTransition';
import { EtherealTwinAvatar } from '@/components/twin/EtherealTwinAvatar';
import { useTwin } from '@/contexts/TwinContext';
import { TwinLifestyle, HealthIndicators, PersonaType } from '@/types/twin';
import { 
  TrendingUp, 
  ArrowRight,
  Bed,
  Footprints,
  Droplets,
  Utensils,
  Clock,
  Sparkles,
  RefreshCw
} from 'lucide-react';

function calculateSimulatedIndicators(lifestyle: TwinLifestyle, days: number): HealthIndicators {
  const { sleepHours, stressLevel, activityLevel, dietPattern, waterIntake } = lifestyle;
  const multiplier = 1 + (days / 30) * 0.3;
  
  const sleepScore = Math.min(100, (sleepHours / 8) * 100);
  const stressScore = 100 - stressLevel;
  const activityScore = activityLevel;
  const dietScore = dietPattern;
  const hydrationScore = Math.min(100, (waterIntake / 8) * 100);
  
  const hormoneBalance = Math.round((sleepScore * 0.3 + stressScore * 0.3 + activityScore * 0.2 + dietScore * 0.2) * 0.9 * multiplier);
  const inflammationIndex = Math.round(100 - (dietScore * 0.3 + activityScore * 0.3 + sleepScore * 0.2 + stressScore * 0.2) * 0.85 * multiplier);
  const insulinSensitivity = Math.round((activityScore * 0.35 + dietScore * 0.35 + sleepScore * 0.15 + hydrationScore * 0.15) * 0.9 * multiplier);
  const energyLevel = Math.round((sleepScore * 0.35 + activityScore * 0.25 + hydrationScore * 0.2 + dietScore * 0.2) * 0.85 * multiplier + 15);
  const cycleRegularity = Math.round((hormoneBalance * 0.4 + stressScore * 0.3 + sleepScore * 0.3) * 0.8 * multiplier + 20);
  
  return {
    hormoneBalance: Math.min(100, Math.max(0, hormoneBalance)),
    inflammationIndex: Math.min(100, Math.max(0, inflammationIndex)),
    insulinSensitivity: Math.min(100, Math.max(0, insulinSensitivity)),
    energyLevel: Math.min(100, Math.max(0, energyLevel)),
    cycleRegularity: Math.min(100, Math.max(0, cycleRegularity)),
  };
}

function determineSimulatedPersona(indicators: HealthIndicators, lifestyle: TwinLifestyle): PersonaType {
  const { hormoneBalance, inflammationIndex, insulinSensitivity, cycleRegularity } = indicators;
  const { stressLevel } = lifestyle;
  
  const overallScore = (hormoneBalance + (100 - inflammationIndex) + insulinSensitivity + cycleRegularity) / 4;
  
  if (overallScore >= 70) return 'balanced-bloom';
  if (stressLevel > 70) return 'stress-amplified';
  if (insulinSensitivity < 40) return 'insulin-resistant';
  if (inflammationIndex > 60) return 'inflammation-spike';
  if (cycleRegularity < 50) return 'irregular-rhythm';
  return 'hormone-reset';
}

export default function SimulatePage() {
  const { twin, isAuthenticated } = useTwin();
  const navigate = useNavigate();
  
  const [timeHorizon, setTimeHorizon] = useState<7 | 14 | 30>(7);
  const [simulatedLifestyle, setSimulatedLifestyle] = useState<TwinLifestyle | null>(null);
  const [simulatedIndicators, setSimulatedIndicators] = useState<HealthIndicators | null>(null);
  const [simulatedPersona, setSimulatedPersona] = useState<PersonaType | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    } else if (!twin) {
      navigate('/create-twin');
    } else {
      setSimulatedLifestyle({ ...twin.lifestyle });
    }
  }, [isAuthenticated, twin, navigate]);

  const runSimulation = async () => {
    if (!simulatedLifestyle) return;
    
    setIsSimulating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const indicators = calculateSimulatedIndicators(simulatedLifestyle, timeHorizon);
    const persona = determineSimulatedPersona(indicators, simulatedLifestyle);
    
    setSimulatedIndicators(indicators);
    setSimulatedPersona(persona);
    setIsSimulating(false);
  };

  const resetSimulation = () => {
    if (!twin) return;
    setSimulatedLifestyle({ ...twin.lifestyle });
    setSimulatedIndicators(null);
    setSimulatedPersona(null);
  };

  if (!twin || !simulatedLifestyle) return null;

  const generateFutureNarrative = () => {
    if (!simulatedPersona || !simulatedIndicators) return '';
    
    const improvements: string[] = [];
    const original = twin.indicators;
    
    if (simulatedIndicators.hormoneBalance > original.hormoneBalance) {
      improvements.push('improved hormone balance');
    }
    if (simulatedIndicators.inflammationIndex < original.inflammationIndex) {
      improvements.push('reduced inflammation');
    }
    if (simulatedIndicators.energyLevel > original.energyLevel) {
      improvements.push('higher energy levels');
    }
    
    if (improvements.length === 0) {
      return `After ${timeHorizon} days, your twin shows stable health patterns. Consider adjusting your lifestyle inputs to see potential improvements.`;
    }
    
    return `After ${timeHorizon} days of these lifestyle changes, your twin could experience ${improvements.join(', ')}. This simulation suggests transitioning to the ${simulatedPersona.replace('-', ' ')} persona.`;
  };

  return (
    <div className="min-h-screen bg-hero">
      <Navbar />
      
      <PageTransition>
        <div className="pt-24 pb-12 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <FadeIn className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                    What-If Simulation
                  </h1>
                  <p className="text-muted-foreground">
                    Explore how lifestyle changes could affect your health over time
                  </p>
                </div>
                <Button variant="outline" onClick={resetSimulation} className="gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Reset
                </Button>
              </div>
            </FadeIn>

            <div className="grid lg:grid-cols-12 gap-6">
              {/* Left Panel - Controls */}
              <FadeIn delay={0.1} className="lg:col-span-4">
                <div className="glass-card rounded-3xl p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-5 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Simulation Controls
                  </h3>

                  {/* Time Horizon */}
                  <div className="mb-6">
                    <label className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      Time Horizon
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {([7, 14, 30] as const).map((days) => (
                        <button
                          key={days}
                          onClick={() => setTimeHorizon(days)}
                          className={`py-3 rounded-xl text-sm font-medium transition-all ${
                            timeHorizon === days
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted hover:bg-muted/80 text-foreground'
                          }`}
                        >
                          {days} days
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Lifestyle Sliders */}
                  <div className="space-y-5">
                    {/* Sleep */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                          <Bed className="w-4 h-4 text-luna-sky-dark" />
                          Sleep Hours
                        </label>
                        <span className="text-sm font-bold text-primary">{simulatedLifestyle.sleepHours}h</span>
                      </div>
                      <Slider
                        value={[simulatedLifestyle.sleepHours]}
                        onValueChange={([val]) => setSimulatedLifestyle({ ...simulatedLifestyle, sleepHours: val })}
                        min={3}
                        max={12}
                        step={0.5}
                      />
                    </div>

                    {/* Activity */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                          <Footprints className="w-4 h-4 text-luna-mint-dark" />
                          Daily Steps
                        </label>
                        <span className="text-sm font-bold text-primary">{simulatedLifestyle.activityLevel}%</span>
                      </div>
                      <Slider
                        value={[simulatedLifestyle.activityLevel]}
                        onValueChange={([val]) => setSimulatedLifestyle({ ...simulatedLifestyle, activityLevel: val })}
                        min={0}
                        max={100}
                        step={5}
                      />
                    </div>

                    {/* Water */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                          <Droplets className="w-4 h-4 text-blue-500" />
                          Water Intake
                        </label>
                        <span className="text-sm font-bold text-primary">{simulatedLifestyle.waterIntake} glasses</span>
                      </div>
                      <Slider
                        value={[simulatedLifestyle.waterIntake]}
                        onValueChange={([val]) => setSimulatedLifestyle({ ...simulatedLifestyle, waterIntake: val })}
                        min={1}
                        max={15}
                        step={1}
                      />
                    </div>

                    {/* Diet */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                          <Utensils className="w-4 h-4 text-amber-500" />
                          Sugar Reduction
                        </label>
                        <span className="text-sm font-bold text-primary">{simulatedLifestyle.dietPattern}%</span>
                      </div>
                      <Slider
                        value={[simulatedLifestyle.dietPattern]}
                        onValueChange={([val]) => setSimulatedLifestyle({ ...simulatedLifestyle, dietPattern: val })}
                        min={0}
                        max={100}
                        step={5}
                      />
                    </div>
                  </div>

                  <Button 
                    variant="hero" 
                    className="w-full mt-6 gap-2"
                    onClick={runSimulation}
                    disabled={isSimulating}
                  >
                    {isSimulating ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Simulating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Run Simulation
                      </>
                    )}
                  </Button>
                </div>
              </FadeIn>

              {/* Center - Twin Comparison */}
              <FadeIn delay={0.2} className="lg:col-span-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Current Twin */}
                  <div className="glass-card rounded-3xl p-6">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-4 text-center">
                      Current State
                    </h3>
                    <div className="h-72">
                      <EtherealTwinAvatar 
                        persona={twin.persona}
                        indicators={twin.indicators}
                      />
                    </div>
                    <div className="mt-4 space-y-2">
                      {Object.entries(twin.indicators).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="font-medium">{value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Simulated Twin */}
                  <div className={`glass-card rounded-3xl p-6 ${!simulatedIndicators ? 'opacity-50' : ''}`}>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-4 text-center">
                      After {timeHorizon} Days
                    </h3>
                    <div className="h-72">
                      {simulatedIndicators && simulatedPersona ? (
                        <EtherealTwinAvatar 
                          persona={simulatedPersona}
                          indicators={simulatedIndicators}
                        />
                      ) : (
                        <div className="h-full flex items-center justify-center">
                          <p className="text-muted-foreground text-center">
                            Adjust the controls and run<br />simulation to see results
                          </p>
                        </div>
                      )}
                    </div>
                    {simulatedIndicators && (
                      <div className="mt-4 space-y-2">
                        {Object.entries(simulatedIndicators).map(([key, value]) => {
                          const original = twin.indicators[key as keyof HealthIndicators];
                          const diff = value - original;
                          return (
                            <div key={key} className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{value}%</span>
                                {diff !== 0 && (
                                  <span className={`text-xs ${diff > 0 ? 'text-health-balanced' : 'text-health-stress'}`}>
                                    {diff > 0 ? '+' : ''}{diff}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Future Narrative */}
                {simulatedIndicators && (
                  <FadeIn delay={0.1} className="mt-6">
                    <div className="glass-card rounded-3xl p-6">
                      <h3 className="font-display text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        Projected Outcome
                      </h3>
                      <p className="text-foreground leading-relaxed">
                        {generateFutureNarrative()}
                      </p>
                    </div>
                  </FadeIn>
                )}
              </FadeIn>
            </div>
          </div>
        </div>
      </PageTransition>
    </div>
  );
}
