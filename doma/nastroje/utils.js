// utils.js – pomocné funkce pro všechny detektory

// Jednoduchá aproximace slovních druhů (pro detekci sloves)
function tagujSlovniDruhy(veta) {
    const slova = veta.toLowerCase().split(/\s+/);
    const tagy = [];
    
    // Velmi zjednodušené pravidlo – koncovky typické pro slovesa
    const koncovkySloves = ['ám', 'áš', 'á', 'íme', 'íte', 'ají', 
                            'l', 'la', 'lo', 'li', 'ly',
                            't', 'ta', 'to', 'ti', 'ty'];

    slova.forEach(slovo => {
        let tag = 'NN'; // podstatné jméno (výchozí)
        
        // Je to sloveso?
        for (let koncovka of koncovkySloves) {
            if (slovo.endsWith(koncovka) && slovo.length > 3) {
                tag = 'VB'; // sloveso
                break;
            }
        }
        
        // Pomocná slovesa (být, mít)
        if (slovo === 'je' || slovo === 'jsou' || slovo === 'byl' || 
            slovo === 'byla' || slovo === 'byli' || slovo === 'bylo' ||
            slovo === 'má' || slovo === 'mají' || slovo === 'měl') {
            tag = 'VB';
        }
        
        tagy.push(tag);
    });
    
    return tagy;
}

// Získání kontextu kolem pozice (pro zobrazení)
function ziskejKontext(text, start, length = 50) {
    if (start < 0) start = 0;
    let konec = start + length;
    if (konec > text.length) konec = text.length;
    return text.substring(start, konec);
}

// Normalizace textu (odstranění diakritiky, převod na malá písmena)
function normalizujText(text) {
    return text.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
