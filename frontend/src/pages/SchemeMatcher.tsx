import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ChevronDown, ExternalLink, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

const states = [
  'Andhra Pradesh', 'Bihar', 'Delhi', 'Gujarat', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan',
  'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'
];

const incomeRanges = [
  { value: '0-100000', label: { en: 'Below 1 Lakh', hi: '1 लाख से कम' } },
  { value: '100000-300000', label: { en: '1 - 3 Lakhs', hi: '1 - 3 लाख' } },
  { value: '300000-500000', label: { en: '3 - 5 Lakhs', hi: '3 - 5 लाख' } },
  { value: '500000+', label: { en: 'Above 5 Lakhs', hi: '5 लाख से अधिक' } },
];

const occupations = [
  { value: 'farmer', label: { en: 'Farmer', hi: 'किसान' } },
  { value: 'student', label: { en: 'Student', hi: 'छात्र' } },
  { value: 'salaried', label: { en: 'Salaried Employee', hi: 'वेतनभोगी कर्मचारी' } },
  { value: 'self-employed', label: { en: 'Self Employed', hi: 'स्वरोजगार' } },
  { value: 'unemployed', label: { en: 'Unemployed', hi: 'बेरोजगार' } },
];

const ageGroups = [
  { value: '18-25', label: { en: '18 - 25 years', hi: '18 - 25 वर्ष' } },
  { value: '26-40', label: { en: '26 - 40 years', hi: '26 - 40 वर्ष' } },
  { value: '41-60', label: { en: '41 - 60 years', hi: '41 - 60 वर्ष' } },
  { value: '60+', label: { en: 'Above 60 years', hi: '60 वर्ष से अधिक' } },
];

interface Scheme {
  id: string;
  name: { en: string; hi: string };
  benefit: { en: string; hi: string };
  portal: string;
}

const mockSchemes: Scheme[] = [
  {
    id: '1',
    name: { en: 'PM Kisan Samman Nidhi', hi: 'पीएम किसान सम्मान निधि' },
    benefit: { en: 'Rs. 6,000 per year', hi: 'प्रति वर्ष 6,000 रुपये' },
    portal: 'https://pmkisan.gov.in',
  },
  {
    id: '2',
    name: { en: 'Ayushman Bharat Yojana', hi: 'आयुष्मान भारत योजना' },
    benefit: { en: 'Rs. 5 Lakh health cover', hi: '5 लाख रुपये स्वास्थ्य कवर' },
    portal: 'https://pmjay.gov.in',
  },
  {
    id: '3',
    name: { en: 'Pradhan Mantri Awas Yojana', hi: 'प्रधानमंत्री आवास योजना' },
    benefit: { en: 'Subsidy up to Rs. 2.67 Lakh', hi: '2.67 लाख रुपये तक सब्सिडी' },
    portal: 'https://pmaymis.gov.in',
  },
];

const SchemeMatcher = () => {
  const { t, language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const [formData, setFormData] = useState({
    state: '',
    income: '',
    occupation: '',
    age: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [schemes, setSchemes] = useState<Scheme[] | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSchemes(null);

    setTimeout(() => {
      setSchemes(mockSchemes);
      setIsLoading(false);
    }, 2000);
  };

  const SelectField = ({
    label,
    placeholder,
    value,
    options,
    onChange,
  }: {
    label: string;
    placeholder: string;
    value: string;
    options: { value: string; label: string | { en: string; hi: string } }[];
    onChange: (value: string) => void;
  }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-12 px-4 pr-10 rounded-xl bg-muted border border-border text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {typeof opt.label === 'string' ? opt.label : opt.label[language]}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="civic-container">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              {t('schemes.title')}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {t('schemes.subtitle')}
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="mt-12 max-w-xl mx-auto"
          >
            <div className="civic-card p-6 sm:p-8 space-y-6">
              <SelectField
                label={t('schemes.state')}
                placeholder={t('schemes.state.placeholder')}
                value={formData.state}
                options={states.map((s) => ({ value: s, label: s }))}
                onChange={(value) => setFormData({ ...formData, state: value })}
              />

              <SelectField
                label={t('schemes.income')}
                placeholder={t('schemes.income.placeholder')}
                value={formData.income}
                options={incomeRanges}
                onChange={(value) => setFormData({ ...formData, income: value })}
              />

              <SelectField
                label={t('schemes.occupation')}
                placeholder={t('schemes.occupation.placeholder')}
                value={formData.occupation}
                options={occupations}
                onChange={(value) => setFormData({ ...formData, occupation: value })}
              />

              <SelectField
                label={t('schemes.age')}
                placeholder={t('schemes.age.placeholder')}
                value={formData.age}
                options={ageGroups}
                onChange={(value) => setFormData({ ...formData, age: value })}
              />

              <Button
                type="submit"
                variant="civic"
                size="xl"
                className="w-full mt-4"
                disabled={isLoading || !formData.state || !formData.income || !formData.occupation || !formData.age}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Finding schemes...</span>
                  </>
                ) : (
                  t('schemes.cta')
                )}
              </Button>
            </div>
          </motion.form>

          {/* Results */}
          <AnimatePresence mode="wait">
            {isLoading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-12 max-w-xl mx-auto space-y-4"
              >
                {[1, 2, 3].map((i) => (
                  <div key={i} className="civic-card p-6 animate-pulse">
                    <div className="h-5 bg-muted rounded w-3/4" />
                    <div className="mt-3 h-4 bg-muted rounded w-1/2" />
                    <div className="mt-4 h-10 bg-muted rounded w-1/3" />
                  </div>
                ))}
              </motion.div>
            )}

            {schemes && !isLoading && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-12 max-w-xl mx-auto"
              >
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  {t('schemes.results')} ({schemes.length})
                </h2>
                <div className="space-y-4">
                  {schemes.map((scheme, index) => (
                    <motion.div
                      key={scheme.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="civic-card p-6"
                    >
                      <h3 className="text-lg font-semibold text-foreground">
                        {scheme.name[language]}
                      </h3>
                      <p className="mt-2 text-muted-foreground">
                        <span className="font-medium text-foreground">{t('schemes.benefit')}: </span>
                        {scheme.benefit[language]}
                      </p>
                      <Button
                        variant="civic-outline"
                        size="sm"
                        className="mt-4"
                        asChild
                      >
                        <a href={scheme.portal} target="_blank" rel="noopener noreferrer">
                          {t('schemes.apply')}
                          <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default SchemeMatcher;
