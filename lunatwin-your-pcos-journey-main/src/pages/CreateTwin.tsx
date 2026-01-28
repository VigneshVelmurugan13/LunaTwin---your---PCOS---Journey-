import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Navbar } from '@/components/layout/Navbar';
import { PageTransition, FadeIn } from '@/components/layout/PageTransition';
import { useTwin } from '@/contexts/TwinContext';
import { TwinBasicInfo, TwinLifestyle } from '@/types/twin';
import { 
  Moon, 
  ArrowRight, 
  ArrowLeft,
  Check,
  User,
  Activity,
  ClipboardCheck,
  Bed,
  Brain,
  Footprints,
  Utensils,
  Droplets,
  Monitor
} from 'lucide-react';

const steps = [
  { id: 1, title: 'Basic Info', icon: User, description: 'Tell us about yourself' },
  { id: 2, title: 'Lifestyle', icon: Activity, description: 'Your daily habits' },
  { id: 3, title: 'Review', icon: ClipboardCheck, description: 'Confirm your details' },
];

const ageRanges = ['18-24', '25-34', '35-44', '45-54', '55+'];
const pcosDurations = ['Newly diagnosed', '1-2 years', '3-5 years', '5-10 years', '10+ years'];

export default function CreateTwinPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const { createTwin } = useTwin();
  const navigate = useNavigate();

  // Basic Info State
  const [basicInfo, setBasicInfo] = useState<TwinBasicInfo>({
    ageRange: '',
    height: undefined,
    weight: undefined,
    pcosDuration: '',
  });

  // Lifestyle State
  const [lifestyle, setLifestyle] = useState<TwinLifestyle>({
    sleepHours: 7,
    stressLevel: 50,
    activityLevel: 50,
    dietPattern: 50,
    waterIntake: 6,
    screenTime: 4,
  });

  const canProceedStep1 = basicInfo.ageRange && basicInfo.pcosDuration;
  const canProceedStep2 = true; // Sliders always have values

  const handleCreateTwin = async () => {
    setIsCreating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    createTwin(basicInfo, lifestyle);
    navigate('/dashboard');
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <motion.div
            initial={false}
            animate={{
              scale: currentStep === step.id ? 1.1 : 1,
              backgroundColor: currentStep >= step.id ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
            }}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              currentStep >= step.id ? 'text-primary-foreground' : 'text-muted-foreground'
            }`}
          >
            {currentStep > step.id ? (
              <Check className="w-5 h-5" />
            ) : (
              <step.icon className="w-5 h-5" />
            )}
          </motion.div>
          {index < steps.length - 1 && (
            <div
              className={`w-16 h-1 mx-2 rounded-full transition-colors ${
                currentStep > step.id ? 'bg-primary' : 'bg-muted'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Let's Get to Know You
        </h2>
        <p className="text-muted-foreground">
          This information helps personalize your digital twin
        </p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Age Range</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {ageRanges.map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setBasicInfo({ ...basicInfo, ageRange: range })}
                className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                  basicInfo.ageRange === range
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border/50 hover:border-primary/30 text-foreground'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="height" className="text-sm font-medium">
              Height (cm) <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="height"
              type="number"
              placeholder="165"
              value={basicInfo.height || ''}
              onChange={(e) => setBasicInfo({ ...basicInfo, height: e.target.value ? Number(e.target.value) : undefined })}
              className="h-12 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight" className="text-sm font-medium">
              Weight (kg) <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="weight"
              type="number"
              placeholder="60"
              value={basicInfo.weight || ''}
              onChange={(e) => setBasicInfo({ ...basicInfo, weight: e.target.value ? Number(e.target.value) : undefined })}
              className="h-12 rounded-xl"
            />
          </div>
        </div>

        <div className="p-3 rounded-xl bg-luna-mint/30 border border-luna-mint-dark/20">
          <p className="text-xs text-muted-foreground flex items-start gap-2">
            <span className="text-luna-mint-dark">ℹ</span>
            Weight is used only as a lifestyle indicator, never for body visualization.
          </p>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">PCOS Duration</Label>
          <div className="grid grid-cols-2 gap-2">
            {pcosDurations.map((duration) => (
              <button
                key={duration}
                type="button"
                onClick={() => setBasicInfo({ ...basicInfo, pcosDuration: duration })}
                className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                  basicInfo.pcosDuration === duration
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border/50 hover:border-primary/30 text-foreground'
                }`}
              >
                {duration}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Your Daily Lifestyle
        </h2>
        <p className="text-muted-foreground">
          These habits influence your digital twin's health indicators
        </p>
      </div>

      <div className="space-y-6">
        {/* Sleep Hours */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-luna-sky flex items-center justify-center">
              <Bed className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div>
              <p className="font-medium text-foreground">Sleep Hours</p>
              <p className="text-sm text-muted-foreground">Average per night</p>
            </div>
            <span className="ml-auto text-2xl font-display font-bold text-primary">
              {lifestyle.sleepHours}h
            </span>
          </div>
          <Slider
            value={[lifestyle.sleepHours]}
            onValueChange={([val]) => setLifestyle({ ...lifestyle, sleepHours: val })}
            min={3}
            max={12}
            step={0.5}
            className="w-full"
          />
        </div>

        {/* Stress Level */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-luna-rose flex items-center justify-center">
              <Brain className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <p className="font-medium text-foreground">Stress Level</p>
              <p className="text-sm text-muted-foreground">How stressed do you feel?</p>
            </div>
            <span className="ml-auto text-2xl font-display font-bold text-primary">
              {lifestyle.stressLevel}%
            </span>
          </div>
          <Slider
            value={[lifestyle.stressLevel]}
            onValueChange={([val]) => setLifestyle({ ...lifestyle, stressLevel: val })}
            min={0}
            max={100}
            step={5}
            className="w-full"
          />
        </div>

        {/* Activity Level */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-luna-mint flex items-center justify-center">
              <Footprints className="w-5 h-5 text-luna-mint-dark" />
            </div>
            <div>
              <p className="font-medium text-foreground">Activity Level</p>
              <p className="text-sm text-muted-foreground">Daily physical activity</p>
            </div>
            <span className="ml-auto text-2xl font-display font-bold text-primary">
              {lifestyle.activityLevel}%
            </span>
          </div>
          <Slider
            value={[lifestyle.activityLevel]}
            onValueChange={([val]) => setLifestyle({ ...lifestyle, activityLevel: val })}
            min={0}
            max={100}
            step={5}
            className="w-full"
          />
        </div>

        {/* Diet Pattern */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-luna-warm flex items-center justify-center">
              <Utensils className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <p className="font-medium text-foreground">Diet Quality</p>
              <p className="text-sm text-muted-foreground">Overall eating habits</p>
            </div>
            <span className="ml-auto text-2xl font-display font-bold text-primary">
              {lifestyle.dietPattern}%
            </span>
          </div>
          <Slider
            value={[lifestyle.dietPattern]}
            onValueChange={([val]) => setLifestyle({ ...lifestyle, dietPattern: val })}
            min={0}
            max={100}
            step={5}
            className="w-full"
          />
        </div>

        {/* Water Intake */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-luna-sky flex items-center justify-center">
              <Droplets className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div>
              <p className="font-medium text-foreground">Water Intake</p>
              <p className="text-sm text-muted-foreground">Glasses per day</p>
            </div>
            <span className="ml-auto text-2xl font-display font-bold text-primary">
              {lifestyle.waterIntake}
            </span>
          </div>
          <Slider
            value={[lifestyle.waterIntake]}
            onValueChange={([val]) => setLifestyle({ ...lifestyle, waterIntake: val })}
            min={1}
            max={15}
            step={1}
            className="w-full"
          />
        </div>

        {/* Screen Time */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-luna-lavender-light flex items-center justify-center">
              <Monitor className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Screen Time</p>
              <p className="text-sm text-muted-foreground">Hours per day</p>
            </div>
            <span className="ml-auto text-2xl font-display font-bold text-primary">
              {lifestyle.screenTime}h
            </span>
          </div>
          <Slider
            value={[lifestyle.screenTime]}
            onValueChange={([val]) => setLifestyle({ ...lifestyle, screenTime: val })}
            min={0}
            max={16}
            step={0.5}
            className="w-full"
          />
        </div>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Review Your Profile
        </h2>
        <p className="text-muted-foreground">
          Everything looks good? Let's create your digital twin!
        </p>
      </div>

      <div className="space-y-4">
        {/* Basic Info Summary */}
        <div className="glass-card rounded-2xl p-5">
          <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            Basic Information
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground">Age Range</p>
              <p className="font-medium">{basicInfo.ageRange}</p>
            </div>
            <div>
              <p className="text-muted-foreground">PCOS Duration</p>
              <p className="font-medium">{basicInfo.pcosDuration}</p>
            </div>
            {basicInfo.height && (
              <div>
                <p className="text-muted-foreground">Height</p>
                <p className="font-medium">{basicInfo.height} cm</p>
              </div>
            )}
            {basicInfo.weight && (
              <div>
                <p className="text-muted-foreground">Weight</p>
                <p className="font-medium">{basicInfo.weight} kg</p>
              </div>
            )}
          </div>
        </div>

        {/* Lifestyle Summary */}
        <div className="glass-card rounded-2xl p-5">
          <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            Lifestyle Habits
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Bed className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Sleep:</span>
              <span className="font-medium">{lifestyle.sleepHours}h</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Stress:</span>
              <span className="font-medium">{lifestyle.stressLevel}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Footprints className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Activity:</span>
              <span className="font-medium">{lifestyle.activityLevel}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Utensils className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Diet:</span>
              <span className="font-medium">{lifestyle.dietPattern}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Water:</span>
              <span className="font-medium">{lifestyle.waterIntake} glasses</span>
            </div>
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Screen:</span>
              <span className="font-medium">{lifestyle.screenTime}h</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-hero">
      <Navbar />
      
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center px-4 py-24">
          <div className="w-full max-w-xl">
            <FadeIn>
              <div className="glass-card-strong rounded-3xl p-8 shadow-strong">
                {/* Progress Indicator */}
                {renderStepIndicator()}

                {/* Step Content */}
                <AnimatePresence mode="wait">
                  {currentStep === 1 && renderStep1()}
                  {currentStep === 2 && renderStep2()}
                  {currentStep === 3 && renderStep3()}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                  <Button
                    variant="ghost"
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                    disabled={currentStep === 1}
                    className="gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </Button>

                  {currentStep < 3 ? (
                    <Button
                      variant="default"
                      onClick={() => setCurrentStep(currentStep + 1)}
                      disabled={currentStep === 1 ? !canProceedStep1 : !canProceedStep2}
                      className="gap-2"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="hero"
                      onClick={handleCreateTwin}
                      disabled={isCreating}
                      className="gap-2"
                    >
                      {isCreating ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Creating...
                        </>
                      ) : (
                        <>
                          <Moon className="w-5 h-5" />
                          Create My Digital Twin
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </PageTransition>
    </div>
  );
}
