import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { PageTransition, FadeIn } from '@/components/layout/PageTransition';
import { EtherealTwinAvatar } from '@/components/twin/EtherealTwinAvatar';
import { HealthIndicatorsPanel } from '@/components/twin/HealthIndicatorsPanel';
import { PersonaCard } from '@/components/twin/PersonaCard';
import { HealthTrendsChart } from '@/components/twin/HealthTrendsChart';
import { useTwin } from '@/contexts/TwinContext';
import { 
  Sparkles, 
  MessageCircle, 
  TrendingUp,
  Calendar,
  Settings
} from 'lucide-react';

export default function DashboardPage() {
  const { twin, isAuthenticated, healthHistory } = useTwin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    } else if (!twin) {
      navigate('/create-twin');
    }
  }, [isAuthenticated, twin, navigate]);

  if (!twin) return null;

  const quickActions = [
    { icon: TrendingUp, label: 'What-If Simulation', path: '/simulate', color: 'bg-luna-mint' },
    { icon: MessageCircle, label: 'Chat with Twin', path: '/chat', color: 'bg-luna-rose' },
    { icon: Calendar, label: 'Update Lifestyle', path: '/create-twin', color: 'bg-luna-sky' },
  ];

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
                    Your Digital Twin
                  </h1>
                  <p className="text-muted-foreground">
                    Real-time insights into your PCOS health patterns
                  </p>
                </div>
                <div className="flex gap-3">
                  {quickActions.map((action) => (
                    <Link key={action.path} to={action.path}>
                      <Button variant="glass" size="sm" className="gap-2">
                        <action.icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{action.label}</span>
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-12 gap-6">
              {/* Left Panel - Persona */}
              <FadeIn delay={0.1} className="lg:col-span-3">
                <PersonaCard />
              </FadeIn>

              {/* Center - Ethereal Twin Avatar */}
              <FadeIn delay={0.2} className="lg:col-span-6">
                <div className="glass-card rounded-3xl p-6 h-full min-h-[500px] overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <h3 className="font-display text-lg font-semibold text-foreground">
                        Your Twin
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full animate-pulse ${
                        twin.persona === 'balanced-bloom' ? 'bg-health-balanced' :
                        twin.persona === 'stress-amplified' || twin.persona === 'inflammation-spike' ? 'bg-health-stress' :
                        'bg-health-mild'
                      }`} />
                      <span className="text-xs text-muted-foreground">Live</span>
                    </div>
                  </div>
                  
                  <EtherealTwinAvatar 
                    persona={twin.persona}
                    indicators={{
                      hormoneBalance: twin.indicators.hormoneBalance,
                      inflammationIndex: twin.indicators.inflammationIndex,
                      energyLevel: twin.indicators.energyLevel,
                      cycleRegularity: twin.indicators.cycleRegularity,
                      insulinSensitivity: twin.indicators.insulinSensitivity,
                    }}
                  />
                </div>
              </FadeIn>

              {/* Right Panel - Indicators */}
              <FadeIn delay={0.3} className="lg:col-span-3">
                <HealthIndicatorsPanel />
              </FadeIn>
            </div>

            {/* Health Trends Chart */}
            <FadeIn delay={0.35} className="mt-6">
              <HealthTrendsChart history={healthHistory} />
            </FadeIn>

            {/* Lifestyle Summary */}
            <FadeIn delay={0.4} className="mt-6">
              <div className="glass-card rounded-3xl p-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  Current Lifestyle Inputs
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {[
                    { label: 'Sleep', value: `${twin.lifestyle.sleepHours}h`, color: 'bg-luna-sky' },
                    { label: 'Stress', value: `${twin.lifestyle.stressLevel}%`, color: 'bg-luna-rose' },
                    { label: 'Activity', value: `${twin.lifestyle.activityLevel}%`, color: 'bg-luna-mint' },
                    { label: 'Diet', value: `${twin.lifestyle.dietPattern}%`, color: 'bg-luna-warm' },
                    { label: 'Water', value: `${twin.lifestyle.waterIntake}`, color: 'bg-luna-sky' },
                    { label: 'Screen', value: `${twin.lifestyle.screenTime}h`, color: 'bg-luna-lavender-light' },
                  ].map((item) => (
                    <div key={item.label} className={`rounded-xl p-4 ${item.color}`}>
                      <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                      <p className="text-xl font-display font-bold text-foreground">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </PageTransition>
    </div>
  );
}