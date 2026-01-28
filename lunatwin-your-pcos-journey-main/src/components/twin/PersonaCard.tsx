import { motion } from 'framer-motion';
import { useTwin } from '@/contexts/TwinContext';
import { PersonaType } from '@/types/twin';
import { 
  Sparkles, 
  Brain, 
  Flame, 
  Activity, 
  Flower2, 
  RefreshCw,
  MessageCircle
} from 'lucide-react';

const personaIcons: Record<PersonaType, React.ElementType> = {
  'stress-amplified': Brain,
  'insulin-resistant': Activity,
  'inflammation-spike': Flame,
  'irregular-rhythm': RefreshCw,
  'balanced-bloom': Flower2,
  'hormone-reset': Sparkles,
};

const personaColors: Record<PersonaType, { bg: string; text: string; border: string }> = {
  'stress-amplified': { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-200' },
  'insulin-resistant': { bg: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-200' },
  'inflammation-spike': { bg: 'bg-red-100', text: 'text-red-500', border: 'border-red-200' },
  'irregular-rhythm': { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200' },
  'balanced-bloom': { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200' },
  'hormone-reset': { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' },
};

function generateNarrative(persona: PersonaType, lifestyle: { sleepHours: number; stressLevel: number; activityLevel: number }): string {
  const { sleepHours, stressLevel, activityLevel } = lifestyle;
  
  const narratives: Record<PersonaType, string> = {
    'stress-amplified': `Today your digital twin is experiencing the Stress-Amplified state. ${
      sleepHours < 6 ? 'Limited sleep' : stressLevel > 60 ? 'Elevated stress levels' : 'Various factors'
    } are contributing to heightened cortisol responses, which may be affecting your hormone balance and increasing inflammation markers.`,
    
    'insulin-resistant': `Your twin has shifted into the Insulin-Resistant Warrior persona. ${
      activityLevel < 40 ? 'Lower physical activity' : 'Current lifestyle patterns'
    } suggest your body may be working harder to manage blood sugar levels. Gentle movement and balanced meals can help.`,
    
    'inflammation-spike': `The Inflammation Spike persona is active today. ${
      sleepHours < 7 ? 'Insufficient rest combined with' : ''
    } ${stressLevel > 50 ? 'elevated stress' : 'current factors'} may be triggering inflammatory responses. Focus on anti-inflammatory foods and stress relief.`,
    
    'irregular-rhythm': `Your twin is in the Irregular Rhythm phase. Cycle patterns suggest some variability, possibly influenced by ${
      stressLevel > 50 ? 'stress levels' : 'hormonal fluctuations'
    }. Consistent routines may help restore balance.`,
    
    'balanced-bloom': `Wonderful! Your digital twin is in the Balanced Bloom state. Your lifestyle choices — ${
      sleepHours >= 7 ? 'good sleep' : ''
    }${activityLevel >= 50 ? ', regular activity' : ''} — are supporting optimal PCOS management. Keep nurturing this balance!`,
    
    'hormone-reset': `Your twin is in the Hormone Reset phase, working to restore equilibrium. This transitional state shows your body is adapting to lifestyle changes. Stay consistent with healthy habits for continued progress.`,
  };
  
  return narratives[persona];
}

export function PersonaCard() {
  const { twin, getPersonaInfo } = useTwin();
  
  if (!twin) return null;
  
  const personaInfo = getPersonaInfo(twin.persona);
  const PersonaIcon = personaIcons[twin.persona];
  const colors = personaColors[twin.persona];
  const narrative = generateNarrative(twin.persona, twin.lifestyle);

  return (
    <div className="glass-card rounded-3xl p-6 h-full flex flex-col">
      {/* Persona Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl p-4 mb-4 ${colors.bg} border ${colors.border}`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl bg-white/60 flex items-center justify-center`}>
            <PersonaIcon className={`w-6 h-6 ${colors.text}`} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
              Current Persona
            </p>
            <h3 className={`font-display text-lg font-bold ${colors.text}`}>
              {personaInfo.name}
            </h3>
          </div>
        </div>
      </motion.div>

      {/* Persona Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-sm text-muted-foreground mb-4"
      >
        {personaInfo.description}
      </motion.p>

      {/* Daily Narrative */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-3">
          <MessageCircle className="w-4 h-4 text-primary" />
          <h4 className="text-sm font-semibold text-foreground">Today's Insight</h4>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-muted/50 rounded-xl p-4"
        >
          <p className="text-sm text-foreground leading-relaxed">
            {narrative}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
