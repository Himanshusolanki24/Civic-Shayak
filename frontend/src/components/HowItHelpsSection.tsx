import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageSquare, Languages, ClipboardCheck, ArrowUpRight } from 'lucide-react';

const HowItHelpsSection = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    {
      icon: MessageSquare,
      title: t('how.step1.title'),
      description: t('how.step1.desc'),
    },
    {
      icon: Languages,
      title: t('how.step2.title'),
      description: t('how.step2.desc'),
    },
    {
      icon: ClipboardCheck,
      title: t('how.step3.title'),
      description: t('how.step3.desc'),
    },
    {
      icon: ArrowUpRight,
      title: t('how.step4.title'),
      description: t('how.step4.desc'),
    },
  ];

  const lineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 1.2,
        ease: 'easeOut',
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: 0.3 + index * 0.2,
      },
    }),
  };

  const iconContainerVariants = {
    hidden: { scale: 0, rotate: -90 },
    visible: (index: number) => ({
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 12,
        delay: 0.4 + index * 0.2,
      },
    }),
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.5 + index * 0.2,
        duration: 0.3,
      },
    }),
  };

  const pulseVariants = {
    initial: { scale: 1, opacity: 0.5 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 0, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section ref={ref} id="how" className="civic-section bg-muted/30">
      <div className="civic-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground"
          >
            {t('how.title')}
          </motion.h2>
        </motion.div>

        {/* Timeline */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="relative">
            {/* Animated Vertical line */}
            <motion.div
              variants={lineVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              style={{ originY: 0 }}
              className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-border"
            />

            {steps.map((step, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={stepVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="relative flex gap-6 pb-12 last:pb-0 group"
              >
                {/* Step icon circle with pulse effect */}
                <div className="relative z-10 flex-shrink-0">
                  {/* Pulse ring */}
                  <motion.div
                    variants={pulseVariants}
                    initial="initial"
                    animate={isInView ? 'animate' : 'initial'}
                    style={{ animationDelay: `${index * 0.5}s` }}
                    className="absolute inset-0 rounded-2xl bg-primary/30"
                  />
                  
                  <motion.div
                    custom={index}
                    variants={iconContainerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5,
                      transition: { duration: 0.2 }
                    }}
                    className="relative w-16 h-16 rounded-2xl bg-card border-2 border-primary/20 flex items-center justify-center shadow-civic-md group-hover:border-primary/50 group-hover:shadow-civic-lg transition-all duration-300"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ 
                        type: 'spring',
                        stiffness: 300,
                        delay: 0.5 + index * 0.2 
                      }}
                    >
                      <step.icon className="w-7 h-7 text-primary" />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="pt-2">
                  <motion.div
                    custom={index}
                    variants={badgeVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="flex items-center gap-3"
                  >
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold"
                    >
                      Step {index + 1}
                    </motion.span>
                  </motion.div>
                  
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.2 }}
                    className="mt-3 text-xl font-semibold text-foreground"
                  >
                    {step.title}
                  </motion.h3>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7 + index * 0.2 }}
                    className="mt-2 text-muted-foreground leading-relaxed"
                  >
                    {step.description}
                  </motion.p>
                </div>

                {/* Connector dot between steps */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: 0.8 + index * 0.2 }}
                    className="absolute left-[30px] bottom-4 w-2 h-2 rounded-full bg-primary/40"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItHelpsSection;
