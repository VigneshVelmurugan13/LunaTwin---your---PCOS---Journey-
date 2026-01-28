import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { PageTransition, FadeIn, StaggerContainer, StaggerItem } from '@/components/layout/PageTransition';
import { 
  Moon, 
  Sparkles, 
  Brain, 
  Activity, 
  Heart, 
  Zap,
  ArrowRight,
  Play,
  Shield,
  TrendingUp
} from 'lucide-react';

const features = [
  {
    icon: Moon,
    title: 'Digital Twin',
    description: 'Create a personalized 3D avatar that mirrors your unique PCOS health profile.',
    color: 'bg-luna-lavender-light text-primary',
  },
  {
    icon: Brain,
    title: 'Health Personas',
    description: 'Understand your health patterns through intuitive persona-based insights.',
    color: 'bg-luna-sky text-secondary-foreground',
  },
  {
    icon: Sparkles,
    title: 'Explainable AI',
    description: 'Receive clear, narrative explanations of how lifestyle affects your health.',
    color: 'bg-luna-rose text-accent-foreground',
  },
];

const stats = [
  { value: '6+', label: 'Health Personas' },
  { value: '5', label: 'Key Indicators' },
  { value: '30 Days', label: 'Simulation Range' },
  { value: '24/7', label: 'Twin Access' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-hero overflow-hidden">
      <Navbar />
      
      <PageTransition>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Hero Content */}
              <div className="text-center lg:text-left">
                <FadeIn delay={0.1}>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-primary/10 text-sm font-medium text-primary mb-6">
                    <Sparkles className="w-4 h-4" />
                    GenAI-Powered PCOS Management
                  </div>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
                    Create Your{' '}
                    <span className="text-gradient-primary">PCOS Digital Twin</span>
                  </h1>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8">
                    Understand your body, not just numbers. Experience a revolutionary approach to PCOS health management through personalized AI-driven insights.
                  </p>
                </FadeIn>

                <FadeIn delay={0.4}>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Link to="/auth">
                      <Button variant="hero" className="group">
                        Get Started
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link to="/demo">
                      <Button variant="hero-outline" className="group">
                        <Play className="w-5 h-5" />
                        View Demo
                      </Button>
                    </Link>
                  </div>
                </FadeIn>
              </div>

              {/* Hero Visual */}
              <FadeIn delay={0.5} className="relative">
                <div className="relative w-full aspect-square max-w-lg mx-auto">
                  {/* Animated Rings */}
                  <motion.div 
                    className="absolute inset-0 rounded-full border-2 border-primary/10"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <motion.div 
                    className="absolute inset-8 rounded-full border-2 border-primary/20"
                    animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.2, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.div 
                    className="absolute inset-16 rounded-full border-2 border-primary/30"
                    animate={{ scale: [1, 1.03, 1], opacity: [0.7, 0.4, 0.7] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                  />
                  
                  {/* Central Avatar Container */}
                  <div className="absolute inset-24 glass-card-strong rounded-full flex items-center justify-center shadow-glow">
                    <div className="text-center">
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-primary flex items-center justify-center"
                      >
                        <Moon className="w-10 h-10 text-white" />
                      </motion.div>
                      <p className="text-sm font-medium text-muted-foreground">Your Twin Awaits</p>
                    </div>
                  </div>

                  {/* Floating Icons */}
                  <motion.div 
                    className="absolute top-12 right-12 p-3 glass-card rounded-xl shadow-medium"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Heart className="w-6 h-6 text-luna-rose-dark" />
                  </motion.div>
                  <motion.div 
                    className="absolute bottom-20 left-8 p-3 glass-card rounded-xl shadow-medium"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                  >
                    <Activity className="w-6 h-6 text-health-balanced" />
                  </motion.div>
                  <motion.div 
                    className="absolute top-1/3 left-4 p-3 glass-card rounded-xl shadow-medium"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  >
                    <Zap className="w-6 h-6 text-health-mild" />
                  </motion.div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="glass-card rounded-3xl p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <FadeIn key={stat.label} delay={0.1 * index}>
                    <div className="text-center">
                      <p className="font-display text-3xl md:text-4xl font-bold text-gradient-primary mb-1">
                        {stat.value}
                      </p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <FadeIn className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Understanding PCOS, Reimagined
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Experience a new paradigm in health awareness through interactive visualization and AI-powered insights.
              </p>
            </FadeIn>

            <StaggerContainer className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <StaggerItem key={feature.title}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card rounded-3xl p-8 h-full"
                  >
                    <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6`}>
                      <feature.icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-transparent via-luna-lavender-light/30 to-transparent">
          <div className="max-w-6xl mx-auto">
            <FadeIn className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                How It Works
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Three simple steps to create your personalized PCOS Digital Twin
              </p>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Share Your Story', desc: 'Input your basic info and lifestyle habits through our intuitive forms.' },
                { step: '02', title: 'Meet Your Twin', desc: 'Watch as your personalized digital twin comes to life with health insights.' },
                { step: '03', title: 'Explore & Learn', desc: 'Simulate scenarios, chat with your twin, and understand your health patterns.' },
              ].map((item, index) => (
                <FadeIn key={item.step} delay={0.2 * index}>
                  <div className="relative">
                    <div className="text-7xl font-display font-bold text-primary/10 absolute -top-4 -left-2">
                      {item.step}
                    </div>
                    <div className="pt-12">
                      <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card rounded-3xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <FadeIn>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-luna-mint flex items-center justify-center">
                      <Shield className="w-6 h-6 text-luna-mint-dark" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground">
                      Your Privacy Matters
                    </h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    LunaTwin is designed with privacy first. Your health data stays yours — we never share or sell your information.
                  </p>
                  <ul className="space-y-2">
                    {['End-to-end encryption', 'No medical diagnoses', 'Educational insights only'].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-health-balanced" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-luna-sky flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-luna-sky-dark" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground">
                      Continuous Learning
                    </h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Your digital twin evolves as you log more data, providing increasingly personalized insights over time.
                  </p>
                  <ul className="space-y-2">
                    {['Adaptive health personas', 'Trend analysis', 'Personalized recommendations'].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
                Ready to Meet Your Twin?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Start your journey to understanding PCOS in a whole new way. Your digital twin is waiting.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/auth">
                  <Button variant="hero" className="group">
                    Create Your Twin
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/demo">
                  <Button variant="hero-outline">
                    Explore Demo First
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Moon className="w-4 h-4 text-white" />
                </div>
                <span className="font-display font-semibold text-foreground">LunaTwin</span>
              </div>
              <p className="text-sm text-muted-foreground">
                © 2024 LunaTwin. For educational purposes only. Not medical advice.
              </p>
            </div>
          </div>
        </footer>
      </PageTransition>
    </div>
  );
}
