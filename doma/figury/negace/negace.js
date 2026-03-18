// ========== figury/negace/negace.js ==========
// Detektor negací – hledá slova jako ne, není, nebyl atd.

function detekujNegaci(text) {
    const vety = text.split(/[.!?…]+/).map(v => v.trim()).filter(v => v.length > 0);
    const nalezy = [];

    // Seznam záporných výrazů (včetně tvarů)
    const negativniVyrazy = [
        'ne', 'není', 'nejsou', 'nebyl', 'nebyla', 'nebyli', 'nebylo',
        'nemá', 'nemají', 'neměl', 'neměla', 'neměli', 'nemělo',
        'nesmí', 'nemůže', 'nemohou', 'nechce', 'nechtějí',
        'nikdo', 'nic', 'nikde', 'nikdy', 'nijak', 'žádný', 'žádná', 'žádné'
    ];

    vety.forEach((veta, index) => {
        const vetaLower = veta.toLowerCase();
        let pocetNegaci = 0;
        let nalezenaSlova = [];

        for (let slovo of negativniVyrazy) {
            if (vetaLower.includes(slovo)) {
                pocetNegaci++;
                nalezenaSlova.push(slovo);
            }
        }

        if (pocetNegaci > 0) {
            nalezy.push({
                figura: 'negace',
                text: veta.substring(0, 60) + (veta.length > 60 ? '…' : ''),
                index: index,
                typ: pocetNegaci === 1 ? 'jedna negace' : 
                      (pocetNegaci === 2 ? 'dvojí negace' : 'trojí a více negací'),
                kontext: veta,
                pocet: pocetNegaci,
                slova: nalezenaSlova.join(', ')
            });
        }

        // Speciální detekce: série negací v krátkých větách (např. "Ne zvíře. Ne postava. Ne symbol.")
        if (pocetNegaci >= 3 && veta.split(/\s+/).length <= 5) {
            // Toto už je zachyceno výše, ale můžeme zvýraznit typ
        }
    });

    return nalezy;
}
