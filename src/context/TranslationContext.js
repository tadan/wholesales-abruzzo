import React, { createContext, useContext } from 'react'
import { translate } from '../translations'

// Create translation context
const TranslationContext = createContext(translate)

// Translation provider component
export const TranslationProvider = ({ children }) => {
    return (
        <TranslationContext.Provider value={translate}>
            {children}
        </TranslationContext.Provider>
    )
}

// Hook to use translations
export const useTranslation = () => useContext(TranslationContext)

// Higher-order component for translating text
export const withTranslation = (Component) => {
    return (props) => {
        const t = useTranslation()
        return <Component {...props} t={t} />
    }
}
