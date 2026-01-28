import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { PersonaType } from '@/types/twin';
import { Moon, Heart, Flame, Zap, Droplets, Activity } from 'lucide-react';

import twinBalanced from '@/assets/twin-avatar-balanced.png';
import twinStress from '@/assets/twin-avatar-stress.png';
import twinMild from '@/assets/twin-avatar-mild.png';

interface EtherealTwinAvatarProps {
  persona: PersonaType;
  indicators: {
    hormoneBalance: number;
    inflammationIndex: number;
    energyLevel: number;
    cycleRegularity?: number;
    insulinSensitivity?: number;
  };
  className?: string;
}

const floatingIconVariants = {
  float: (delay: number) => ({
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay * 0.3,
    }
  })
};

const pulseVariants = {
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const FloatingIcon = ({ 
  Icon, 
  position, 
  color, 
  delay,
  value
}: { 
  Icon: typeof Moon;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  color: string;
  delay: number;
  value: number;
}) => {
  const getColorIntensity = () => {
    if (value >= 70) return 'ring-health-balanced/50';
    if (value >= 40) return 'ring-health-mild/50';
    return 'ring-health-stress/50';
  };

  return (
    <motion.div
      className={`absolute z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm 
        flex items-center justify-center border border-white/30 shadow-lg ring-2 ${getColorIntensity()}`}
      style={position}
      variants={floatingIconVariants}
      custom={delay}
      animate="float"
    >
      <Icon className={`w-5 h-5 md:w-6 md:h-6 ${color}`} />
    </motion.div>
  );
};

export function EtherealTwinAvatar({ persona, indicators, className = '' }: EtherealTwinAvatarProps) {
  const { avatarImage, auraClass, glowColor } = useMemo(() => {
    switch (persona) {
      case 'balanced-bloom':
        return {
          avatarImage: twinBalanced,
          auraClass: 'from-emerald-500/20 via-cyan-400/15 to-teal-500/20',
          glowColor: 'shadow-[0_0_80px_20px_rgba(52,211,153,0.3)]'
        };
      case 'stress-amplified':
      case 'inflammation-spike':
        return {
          avatarImage: twinStress,
          auraClass: 'from-orange-500/25 via-red-400/20 to-amber-500/25',
          glowColor: 'shadow-[0_0_80px_20px_rgba(249,115,22,0.35)]'
        };
      case 'insulin-resistant':
      case 'irregular-rhythm':
      case 'hormone-reset':
      default:
        return {
          avatarImage: twinMild,
          auraClass: 'from-amber-400/20 via-yellow-300/15 to-orange-400/20',
          glowColor: 'shadow-[0_0_80px_20px_rgba(234,179,8,0.3)]'
        };
    }
  }, [persona]);

  const overallHealth = useMemo(() => {
    return (
      indicators.hormoneBalance + 
      (100 - indicators.inflammationIndex) + 
      indicators.energyLevel +
      (indicators.cycleRegularity || 60) +
      (indicators.insulinSensitivity || 60)
    ) / 5;
  }, [indicators]);

  return (
    <div className={`relative w-full h-full min-h-[400px] flex items-center justify-center ${className}`}>
      {/* Cosmic background */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <div className={`absolute inset-0 bg-gradient-radial ${auraClass}`} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-background/50 to-background" />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main avatar container */}
      <motion.div 
        className={`relative z-0 ${glowColor} rounded-full`}
        variants={pulseVariants}
        animate="pulse"
      >
        {/* Avatar image */}
        <motion.img
          src={avatarImage}
          alt="Digital Twin Avatar"
          className="w-64 h-80 md:w-72 md:h-96 object-contain drop-shadow-2xl"
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Inner core glow */}
        <motion.div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 w-20 h-24 rounded-full blur-2xl
            ${persona === 'balanced-bloom' ? 'bg-emerald-400/40' : 
              persona === 'stress-amplified' || persona === 'inflammation-spike' ? 'bg-orange-400/50' : 
              'bg-amber-400/40'}`}
          animate={{
            scale: [0.9, 1.1, 0.9],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Floating health icons */}
      <FloatingIcon 
        Icon={Moon} 
        position={{ top: '10%', left: '10%' }}
        color="text-indigo-400"
        delay={0}
        value={indicators.cycleRegularity || 60}
      />
      <FloatingIcon 
        Icon={Heart} 
        position={{ top: '15%', right: '10%' }}
        color="text-rose-400"
        delay={1}
        value={indicators.hormoneBalance}
      />
      <FloatingIcon 
        Icon={Flame} 
        position={{ top: '45%', right: '5%' }}
        color="text-orange-400"
        delay={2}
        value={100 - indicators.inflammationIndex}
      />
      <FloatingIcon 
        Icon={Zap} 
        position={{ bottom: '30%', right: '8%' }}
        color="text-yellow-400"
        delay={3}
        value={indicators.energyLevel}
      />
      <FloatingIcon 
        Icon={Droplets} 
        position={{ bottom: '25%', left: '8%' }}
        color="text-cyan-400"
        delay={4}
        value={indicators.insulinSensitivity || 60}
      />
      <FloatingIcon 
        Icon={Activity} 
        position={{ top: '50%', left: '5%' }}
        color="text-emerald-400"
        delay={5}
        value={overallHealth}
      />

      {/* Orbital ring */}
      <motion.div
        className="absolute w-[320px] h-[320px] md:w-[400px] md:h-[400px] border border-white/10 rounded-full"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="absolute -top-1 left-1/2 w-2 h-2 bg-primary/60 rounded-full" />
        <div className="absolute top-1/2 -right-1 w-1.5 h-1.5 bg-luna-rose-dark/60 rounded-full" />
      </motion.div>

      {/* Health status indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
        <div className={`w-2 h-2 rounded-full animate-pulse ${
          overallHealth >= 70 ? 'bg-health-balanced' :
          overallHealth >= 40 ? 'bg-health-mild' :
          'bg-health-stress'
        }`} />
        <span className="text-xs font-medium text-foreground/80">
          {overallHealth >= 70 ? 'Thriving' : overallHealth >= 40 ? 'Adjusting' : 'Needs Attention'}
        </span>
      </div>
    </div>
  );
}
