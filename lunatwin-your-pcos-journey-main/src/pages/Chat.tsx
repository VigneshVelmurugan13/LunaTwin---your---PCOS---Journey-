import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/layout/Navbar';
import { PageTransition, FadeIn } from '@/components/layout/PageTransition';
import { useTwin } from '@/contexts/TwinContext';
import { ChatMessage } from '@/types/twin';
import { 
  MessageCircle, 
  Send,
  Sparkles,
  Moon,
  User,
  Lightbulb
} from 'lucide-react';

const suggestedQuestions = [
  "Why is my energy low?",
  "Why did inflammation increase?",
  "How can I improve my hormone balance?",
  "What lifestyle changes would help?",
  "Why am I in this persona?",
];

function generateResponse(question: string, twin: ReturnType<typeof useTwin>['twin'], personaInfo: { name: string }): string {
  if (!twin) return "I don't have enough information to answer that.";
  
  const q = question.toLowerCase();
  
  if (q.includes('energy') || q.includes('tired') || q.includes('fatigue')) {
    const reasons: string[] = [];
    if (twin.lifestyle.sleepHours < 7) reasons.push(`your sleep of ${twin.lifestyle.sleepHours} hours is below optimal`);
    if (twin.lifestyle.stressLevel > 60) reasons.push('elevated stress levels are draining your energy reserves');
    if (twin.lifestyle.activityLevel < 40) reasons.push('lower physical activity can reduce overall vitality');
    
    if (reasons.length === 0) {
      return `Your energy level is currently at ${twin.indicators.energyLevel}%. While this is reasonable, you might boost it further by ensuring consistent sleep patterns and moderate daily activity. Remember, energy fluctuates naturally throughout your cycle.`;
    }
    
    return `Your energy level is at ${twin.indicators.energyLevel}%. This may be because ${reasons.join(' and ')}. Consider prioritizing 7-8 hours of quality sleep and incorporating gentle movement like walking or yoga.`;
  }
  
  if (q.includes('inflammation') || q.includes('inflam')) {
    const index = twin.indicators.inflammationIndex;
    if (index > 60) {
      return `Your inflammation index is at ${index}%, which is elevated. This could be influenced by dietary patterns (current: ${twin.lifestyle.dietPattern}%), stress levels, or reduced physical activity. Anti-inflammatory foods like leafy greens, fatty fish, and berries may help, along with stress-reduction practices.`;
    }
    return `Your inflammation index is at ${index}%, which is within a healthy range. Continue with your current balanced approach to diet and activity to maintain this.`;
  }
  
  if (q.includes('hormone') || q.includes('balance')) {
    return `Your hormone balance index is at ${twin.indicators.hormoneBalance}%. This is influenced by your sleep patterns (${twin.lifestyle.sleepHours}h), stress levels (${twin.lifestyle.stressLevel}%), and overall lifestyle factors. To support hormone balance, focus on consistent sleep schedules, stress management, and regular moderate exercise.`;
  }
  
  if (q.includes('persona') || q.includes('why am i')) {
    return `You're currently in the ${personaInfo.name} persona. This is based on your combined health indicators and lifestyle inputs. Your hormone balance (${twin.indicators.hormoneBalance}%), inflammation (${twin.indicators.inflammationIndex}%), and stress level (${twin.lifestyle.stressLevel}%) all contribute to this state. Small consistent changes in sleep, activity, and stress management can help shift your persona over time.`;
  }
  
  if (q.includes('improve') || q.includes('help') || q.includes('change')) {
    const suggestions: string[] = [];
    if (twin.lifestyle.sleepHours < 7) suggestions.push('aim for 7-8 hours of sleep');
    if (twin.lifestyle.stressLevel > 50) suggestions.push('incorporate stress-relief activities like meditation or deep breathing');
    if (twin.lifestyle.activityLevel < 50) suggestions.push('increase daily movement with walks or light exercise');
    if (twin.lifestyle.waterIntake < 6) suggestions.push('stay hydrated with 6-8 glasses of water daily');
    
    if (suggestions.length === 0) {
      return "You're doing well! Continue with your current healthy habits. Consider tracking your patterns to identify what works best for your body.";
    }
    
    return `Based on your current profile, here are some personalized suggestions: ${suggestions.join(', ')}. Remember, small consistent changes are more sustainable than dramatic overhauls. Your digital twin will reflect these changes over time.`;
  }
  
  if (q.includes('weight') || q.includes('body')) {
    return "Weight is a complex factor in PCOS management. Your digital twin uses weight only as a lifestyle indicator, never for body visualization. Focus on how you feel, your energy levels, and your overall well-being rather than numbers. Sustainable lifestyle habits matter more than any single metric.";
  }
  
  return `Thank you for your question. Based on your current ${personaInfo.name} state, your indicators show hormone balance at ${twin.indicators.hormoneBalance}%, energy at ${twin.indicators.energyLevel}%, and cycle regularity at ${twin.indicators.cycleRegularity}%. Would you like to know more about any specific aspect of your health patterns?`;
}

export default function ChatPage() {
  const { twin, isAuthenticated, getPersonaInfo } = useTwin();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    } else if (!twin) {
      navigate('/create-twin');
    } else {
      // Welcome message
      setMessages([{
        id: '1',
        role: 'assistant',
        content: `Hello! I'm your digital twin companion. I can help you understand your health patterns, explain why certain indicators are the way they are, and suggest lifestyle adjustments. What would you like to know?`,
        timestamp: new Date(),
      }]);
    }
  }, [isAuthenticated, twin, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim() || !twin) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const personaInfo = getPersonaInfo(twin.persona);
    const response = generateResponse(messageText, twin, personaInfo);

    const assistantMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages(prev => [...prev, assistantMessage]);
  };

  if (!twin) return null;

  const personaInfo = getPersonaInfo(twin.persona);

  return (
    <div className="min-h-screen bg-hero flex flex-col">
      <Navbar />
      
      <PageTransition className="flex-1 flex flex-col">
        <div className="flex-1 pt-24 pb-4 px-4 flex flex-col max-w-4xl mx-auto w-full">
          {/* Header */}
          <FadeIn className="mb-4">
            <div className="glass-card rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Moon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="font-display text-lg font-bold text-foreground">
                  Chat with Your Twin
                </h1>
                <p className="text-sm text-muted-foreground">
                  Currently: {personaInfo.name}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-health-balanced animate-pulse" />
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>
          </FadeIn>

          {/* Messages */}
          <div className="flex-1 glass-card rounded-3xl p-4 mb-4 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start gap-3 max-w-[85%] ${
                      message.role === 'user' ? 'flex-row-reverse' : ''
                    }`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        message.role === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-luna-lavender-light text-primary'
                      }`}>
                        {message.role === 'user' ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Sparkles className="w-4 h-4" />
                        )}
                      </div>
                      <div className={`rounded-2xl px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-luna-lavender-light flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-muted rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 rounded-full bg-muted-foreground/50"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 rounded-full bg-muted-foreground/50"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 rounded-full bg-muted-foreground/50"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length <= 1 && (
              <div className="pt-4 border-t border-border mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Suggested questions</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="px-3 py-2 rounded-xl bg-muted hover:bg-primary/10 text-sm text-foreground transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <FadeIn>
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="glass-card rounded-2xl p-3 flex items-center gap-3"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your twin anything..."
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 h-12"
                disabled={isTyping}
              />
              <Button 
                type="submit" 
                variant="default"
                size="icon"
                className="h-10 w-10 rounded-xl"
                disabled={!input.trim() || isTyping}
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </FadeIn>
        </div>
      </PageTransition>
    </div>
  );
}
