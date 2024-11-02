"use client"
// LanguageContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import i18next from "i18next";
import Cookies from "js-cookie";

interface LanguageContextType {
    language: string;
    setLanguage: (language: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState("vi");

    useEffect(() => {
        const savedLanguage = Cookies.get("language") || "vi";
        setLanguageState(savedLanguage);
        i18next.changeLanguage(savedLanguage);
    }, []);

    const setLanguage = (newLanguage: string) => {
        setLanguageState(newLanguage);
        i18next.changeLanguage(newLanguage);
        Cookies.set("language", newLanguage, { expires: 30 });
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
