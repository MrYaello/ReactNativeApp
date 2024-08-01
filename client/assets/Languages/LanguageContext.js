import React, { createContext, useState, useContext } from 'react';
import translations from './translations';
import * as RNLocalize from 'react-native-localize';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(RNLocalize.getLocales()[0].languageCode);

    const changeLanguage = ( lng ) => {
        setLanguage(lng);
    };

    useEffect(() => {
        const handleLocalizationChange = () => {
          const deviceLanguage = RNLocalize.getLocales()[0].languageCode;
          setLanguage(deviceLanguage);
        };
    
        RNLocalize.addEventListener('change', handleLocalizationChange);
    
        return () => {
          RNLocalize.removeEventListener('change', handleLocalizationChange);
        };
    }, []);

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, translations }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);