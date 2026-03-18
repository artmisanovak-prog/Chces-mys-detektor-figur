// elipsa.js – detektor elips
// Závisí na utils.js (tagovani slovnich druhu)

function detekujElipsy(text) {
    if (typeof tagujSlovniDruhy !== 'function') {
        console.error('Chybí utils.js – funkce tagujSlovniDruhy');
        return [];
    }

    const vety = text.split(/[.!?…]+/).map(v => v.trim()).filter(v => v.length > 0);
    const nalezy = [];

    vety.forEach((veta, index) => {
        const tagy = tagujSlovniDruhy(veta);
        
        // Zkontrolujeme, jestli věta obsahuje určité sloveso
        const maSloveso = tagy.some(tag => 
            tag.startsWith('VB') || // sloveso v určitém tvaru
            tag.startsWith('VBP') || // sloveso, přítomný čas
            tag.startsWith('VBD')    // sloveso, minulý čas
        );

        if (!maSloveso && veta.length > 2) {
            nalezy.push({
                figura: 'elipsa',
                text: veta,
                index: index,
                kontext: veta.substring(0, 50),
                typ: 'chybí určité sloveso'
            });
        }
    });

    return nalezy;
}
