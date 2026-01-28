import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { PageTransition, FadeIn } from '@/components/layout/PageTransition';
import { EtherealTwinAvatar } from '@/components/twin/EtherealTwinAvatar';
import { PersonaType, TwinLifestyle, HealthIndicators } from '@/types/twin';
import { 
  Sparkles, 
  ArrowRight,
  Moon,
  Activity,
  Brain,
  Flame,
  Heart,
  Zap,
  MessageCircle,
  TrendingUp
} from 'lucide-react';

// Demo twin data
const demoTwin = {
  lifestyle: {
    sleepHours: 6.5,
    stressLevel: 65,
    activityLevel: 45,
    dietPattern: 55,
    waterIntake: 5,
    screenTime: 7,
  } as TwinLifestyle,
  indicators: {
    hormoneBalance: 58,
    inflammationIndex: 52,
    insulinSensitivity: 62,
    energyLevel: 55,
    cycleRegularity: 48,
  } as HealthIndicators,
  persona: 'stress-amplified' as PersonaType,
};

const personaInfo = {
  name: 'Stress-Amplified',
  description: 'This demo twin is experiencing elevated stress responses, which may be affecting hormone balance and increasing inflammation markers.',
};

const features = [
  { 
    icon: Moon, 
    title: '3D Digital Twin', 
    desc: 'Interactive visualization that reflects your health state'
  },
  { 
    icon: Brain, 
    title: 'Health Personas', 
    desc: 'AI-assigned personas based on your unique patterns'
  },
  { 
    icon: MessageCircle, 
    title: 'Chat Interface', 
    desc: 'Ask questions and get personalized explanations'
  },
  { 
    icon: TrendingUp, 
    title: 'What-If Simulations', 
    desc: 'See how lifestyle changes could affect your health'
  },
];

export default function DemoPage() {
  const [activePersona, setActivePersona] = useState<PersonaType>('stress-amplified');
  const [demoIndicators, setDemoIndicators] = useState(demoTwin.indicators);

  const personas: { type: PersonaType; name: string; color: string }[] = [
    { type: 'balanced-bloom', name: 'Balanced Bloom', color: 'bg-health-balanced' },
    { type: 'stress-amplified', name: 'Stress-Amplified', color: 'bg-health-stress' },
    { type: 'hormone-reset', name: 'Hormone Reset', color: 'bg-health-mild' },
    { type: 'inflammation-spike', name: 'Inflammation Spike', color: 'bg-orange-500' },
  ];

  // Update indicators based on persona
  useEffect(() => {
    const indicatorsByPersona: Record<PersonaType, HealthIndicators> = {
      'balanced-bloom': { hormoneBalance: 78, inflammationIndex: 28, insulinSensitivity: 82, energyLevel: 85, cycleRegularity: 80 },
      'stress-amplified': { hormoneBalance: 58, inflammationIndex: 52, insulinSensitivity: 62, energyLevel: 55, cycleRegularity: 48 },
      'hormone-reset': { hormoneBalance: 65, inflammationIndex: 42, insulinSensitivity: 70, energyLevel: 68, cycleRegularity: 60 },
      'inflammation-spike': { hormoneBalance: 52, inflammationIndex: 68, insulinSensitivity: 55, energyLevel: 48, cycleRegularity: 45 },
      'insulin-resistant': { hormoneBalance: 55, inflammationIndex: 55, insulinSensitivity: 38, energyLevel: 50, cycleRegularity: 52 },
      'irregular-rhythm': { hormoneBalance: 60, inflammationIndex: 45, insulinSensitivity: 65, energyLevel: 58, cycleRegularity: 35 },
    };
    setDemoIndicators(indicatorsByPersona[activePersona]);
  }, [activePersona]);

  return (
    <div className="min-h-screen bg-hero">
      <Navbar />
      
      <PageTransition>
        <div className="pt-24 pb-12 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <FadeIn className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                Interactive Demo
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                Experience Your Digital Twin
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore a sample PCOS digital twin. See how personas, health indicators, and narratives work together.
              </p>
            </FadeIn>

            {/* Main Demo Area */}
            <div className="grid lg:grid-cols-12 gap-6 mb-12">
              {/* Persona Selector */}
              <FadeIn delay={0.1} className="lg:col-span-3">
                <div className="glass-card rounded-3xl p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                    Try Different Personas
                  </h3>
                  <div className="space-y-2">
                    {personas.map((p) => (
                      <button
                        key={p.type}
                        onClick={() => setActivePersona(p.type)}
                        className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${
                          activePersona === p.type
                            ? 'bg-primary/10 border-2 border-primary'
                            : 'bg-muted hover:bg-muted/80 border-2 border-transparent'
                        }`}
                      >
                        <div className={`w-3 h-3 rounded-full ${p.color}`} />
                        <span className="text-sm font-medium text-foreground">{p.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* 3D Twin */}
              <FadeIn delay={0.2} className="lg:col-span-6">
                <div className="glass-card rounded-3xl p-6 min-h-[500px]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                      <Moon className="w-5 h-5 text-primary" />
                      Demo Twin
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full animate-pulse ${
                        activePersona === 'balanced-bloom' ? 'bg-health-balanced' :
                        activePersona === 'stress-amplified' || activePersona === 'inflammation-spike' ? 'bg-health-stress' :
                        'bg-health-mild'
                      }`} />
                      <span className="text-xs text-muted-foreground">Demo Mode</span>
                    </div>
                  </div>
                  
                  <EtherealTwinAvatar 
                    persona={activePersona}
                    indicators={demoIndicators}
                  />
                </div>
              </FadeIn>

              {/* Health Indicators */}
              <FadeIn delay={0.3} className="lg:col-span-3">
                <div className="glass-card rounded-3xl p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    Indicators
                  </h3>
                  <div className="space-y-4">
                    {[
                      { name: 'Hormone Balance', value: demoIndicators.hormoneBalance, icon: Moon, color: 'text-primary' },
                      { name: 'Inflammation', value: demoIndicators.inflammationIndex, icon: Flame, color: 'text-health-stress', inverse: true },
                      { name: 'Insulin Sensitivity', value: demoIndicators.insulinSensitivity, icon: Activity, color: 'text-luna-mint-dark' },
                      { name: 'Energy', value: demoIndicators.energyLevel, icon: Zap, color: 'text-health-mild' },
                      { name: 'Cycle Regularity', value: demoIndicators.cycleRegularity, icon: Heart, color: 'text-luna-rose-dark' },
                    ].map((indicator) => (
                      <motion.div
                        key={indicator.name}
                        layout
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <indicator.icon className={`w-4 h-4 ${indicator.color}`} />
                            <span className="text-xs text-muted-foreground">{indicator.name}</span>
                          </div>
                          <motion.span 
                            key={indicator.value}
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            className="text-sm font-bold"
                          >
                            {indicator.value}%
                          </motion.span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${indicator.value}%` }}
                            transition={{ duration: 0.5 }}
                            className={`h-full rounded-full ${
                              indicator.inverse 
                                ? (indicator.value < 40 ? 'bg-health-balanced' : indicator.value < 60 ? 'bg-health-mild' : 'bg-health-stress')
                                : (indicator.value >= 70 ? 'bg-health-balanced' : indicator.value >= 40 ? 'bg-health-mild' : 'bg-health-stress')
                            }`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Feature Highlights */}
            <FadeIn delay={0.4} className="mb-12">
              <div className="glass-card rounded-3xl p-8">
                <h3 className="font-display text-xl font-bold text-foreground mb-6 text-center">
                  Platform Features
                </h3>
                <div className="grid md:grid-cols-4 gap-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-luna-lavender-light flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* CTA */}
            <FadeIn delay={0.6} className="text-center">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Ready to Create Your Own Twin?
              </h2>
              <p className="text-muted-foreground mb-6">
                Get personalized insights based on your actual lifestyle and health patterns.
              </p>
              <Link to="/auth">
                <Button variant="hero" className="gap-2">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </FadeIn>
          </div>
        </div>
      </PageTransition>
    </div>
  );
}
