import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-background border-t border-border">
      <div className="civic-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Logo & About */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">C</span>
              </div>
              <span className="font-bold text-lg text-foreground">Civic Sahayak</span>
            </div>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-sm">
              {t('footer.disclaimer')}
            </p>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              {t('footer.about.title')}
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.about.mission')}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.about.vision')}
                </a>
              </li>
            </ul>
          </div>

          {/* Transparency */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              {t('footer.transparency.title')}
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.transparency.data')}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.transparency.privacy')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              {t('footer.contact.title')}
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hello@civicsahayak.in" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.contact.email')}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.contact.feedback')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Language Support & Copyright */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{t('footer.language.title')}:</span>
            <div className="flex items-center gap-2">
              <span className={`text-sm ${language === 'en' ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                English
              </span>
              <span className="text-muted-foreground">/</span>
              <span className={`text-sm ${language === 'hi' ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                हिंदी
              </span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
