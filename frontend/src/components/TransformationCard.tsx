import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import beforeImage from '@/assets/before-paperwork.jpg';
import afterImage from '@/assets/after-digital.jpg';

const TransformationCard = () => {
  const { t } = useLanguage();
  const [showAfter, setShowAfter] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setShowAfter((prev) => !prev);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full max-w-md mx-auto"
    >
      {/* Main Card */}
      <div className="relative bg-card rounded-2xl border-2 border-primary/20 shadow-civic-xl overflow-hidden">
        {/* Orange accent border glow */}
        <div className="absolute inset-0 rounded-2xl opacity-50">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
        </div>

        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <AnimatePresence mode="wait">
            {!showAfter ? (
              <motion.div
                key="before"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <img
                  src={beforeImage}
                  alt={t('transform.before')}
                  className="w-full h-full object-cover grayscale-[30%] brightness-90"
                />
                {/* Overlay for before state */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
              </motion.div>
            ) : (
              <motion.div
                key="after"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <img
                  src={afterImage}
                  alt={t('transform.after')}
                  className="w-full h-full object-cover"
                />
                {/* Warm overlay for after state */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                
                {/* Light sweep animation */}
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent skew-x-12"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Caption */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <AnimatePresence mode="wait">
              <motion.p
                key={showAfter ? 'after-caption' : 'before-caption'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-primary-foreground text-sm font-medium text-center"
              >
                {showAfter ? t('transform.after') : t('transform.before')}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="h-1 bg-muted">
          <motion.div
            key={showAfter ? 'progress-after' : 'progress-before'}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 4, ease: 'linear' }}
            className="h-full bg-primary"
          />
        </div>
      </div>

      {/* Stat Badge */}
      <AnimatePresence>
        {showAfter && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2"
          >
            <div className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold shadow-civic-lg">
              {t('transform.stat')}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating UI Elements for After State */}
      <AnimatePresence>
        {showAfter && (
          <>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="absolute top-4 right-4 px-3 py-1.5 bg-card/90 backdrop-blur border border-border rounded-lg shadow-civic-md"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-xs font-medium text-foreground">Verified</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="absolute top-16 left-4 px-3 py-1.5 bg-card/90 backdrop-blur border border-border rounded-lg shadow-civic-md"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-xs font-medium text-foreground">Approved</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TransformationCard;
