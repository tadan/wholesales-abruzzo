// Italian translations for the application
const translations = {
    // Page title and header
    'Wholesale Product Catalog': "Catalogo Prodotti all'Ingrosso da Amedeo",
    'Browse our selection of premium Italian products':
        'Sfoglia la nostra selezione di prodotti italiani premium',
    'Premium Italian wholesale products from Abruzzo':
        "Prodotti all'ingrosso premium dall'Abruzzo e dintorni",
    'Wholesale Abruzzo - Premium Italian Products':
        'Ingrosso Abruzzo - Prodotti Italiani Premium',

    // Form filters
    'Search products...': 'Cerca prodotti...',
    'All Categories': 'Tutte le Categorie',
    'All Customer Types': 'Tutti i Tipi di Cliente',
    'Clear Filters': 'Cancella Filtri',
    Products: 'Prodotti',

    // Product cards
    'No image available': 'Immagine non disponibile',
    'No description available': 'Descrizione non disponibile',
    Code: 'Codice',
    Size: 'Formato',
    Aging: 'Stagionatura',
    Expires: 'Scadenza',

    // Empty states
    'Loading product catalog...': 'Caricamento catalogo prodotti...',
    'No products match your search':
        'Nessun prodotto corrisponde alla tua ricerca',
    'Try adjusting your filters or search term':
        'Prova a modificare i filtri o i termini di ricerca',
    'Clear All Filters': 'Cancella Tutti i Filtri',

    // Footer
    '© 2025 Wholesale Abruzzo - Premium Italian Products':
        '© 2025 Ingrosso Abruzzo - Prodotti Italiani Premium',

    // Categories - ensure these match your actual data
    Spirits: 'Alcolici',
    Carne: 'Carne',
    Formaggi: 'Formaggi',
    Latticini: 'Latticini',
    Riso: 'Riso',
    Miele: 'Miele',
    Sale: 'Sale',
    Salumi: 'Salumi',
    Olio: 'Olio',
    Aceto: 'Aceto',

    // Customer types - ensure these match your actual data
    Restaurants: 'Ristoranti',
    Bars: 'Bar',
    'Specialty Butchers': 'Macellerie Specializzate',
    'Specialty Cheese Shops': 'Negozi Specializzati di Formaggio',
    Retail: 'Vendita al Dettaglio',
    'Specialty Food Stores': 'Negozi di Alimentari Specializzati',
    Pizzerias: 'Pizzerie',
    Catering: 'Catering',
    Bakeries: 'Panetterie',

    // Combined target customers (as they appear in your data)
    'Restaurants, Bars': 'Ristoranti, Bar',
    'Restaurants, Specialty Butchers': 'Ristoranti, Macellerie Specializzate',
    'Restaurants, Specialty Cheese Shops':
        'Ristoranti, Negozi Specializzati di Formaggio',
    'Restaurants, Specialty Cheese Shops, Retail':
        'Ristoranti, Negozi Specializzati di Formaggio, Vendita al Dettaglio',
    'Restaurants, Specialty Food Stores':
        'Ristoranti, Negozi di Alimentari Specializzati',
    'Restaurants, Specialty Food Stores, Catering':
        'Ristoranti, Negozi di Alimentari Specializzati, Catering',
    'Restaurants, Pizzerias, Retail':
        'Ristoranti, Pizzerie, Vendita al Dettaglio',
    'Specialty Food Stores, Retail':
        'Negozi di Alimentari Specializzati, Vendita al Dettaglio',
    'Restaurants, Specialty Food Stores, Bakeries':
        'Ristoranti, Negozi di Alimentari Specializzati, Panetterie',
}

/**
 * Translate a string to Italian
 * @param {string} text - The text to translate
 * @returns {string} The translated text
 */
export const translate = (text) => {
    return translations[text] || text
}

/**
 * Translate component props (including React-Bootstrap components)
 * @param {object} props - The props to translate
 * @param {array} keys - The keys to translate
 * @returns {object} The translated props
 */
export const translateProps = (
    props,
    keys = ['placeholder', 'label', 'title']
) => {
    const translatedProps = { ...props }
    keys.forEach((key) => {
        if (translatedProps[key]) {
            translatedProps[key] = translate(translatedProps[key])
        }
    })
    return translatedProps
}

export default translations
