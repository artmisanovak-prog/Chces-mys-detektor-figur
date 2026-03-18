// ========== figury/repetice/repetice.js ==========
// Detektor repetic – hledá opakování stejných slov v krátkém okně

function detekujRepetici(text) {
    const vety = text.split(/[.!?…]+/).map(v => v.trim()).filter(v => v.length > 0);
    const nalezy = [];

    vety.forEach((veta, index) => {
        // Rozdělíme na slova, odstraníme interpunkci
        const slova = veta.toLowerCase().replace(/[.,!?;:()–-]/g, '').split(/\s+/).filter(s => s.length > 2);
        const frekvence = {};

        slova.forEach(slovo => {
            frekvence[slovo] = (frekvence[slovo] || 0) + 1;
        });

        // Hledáme slova s frekvencí >= 3 (ve větě)
        for (let [slovo, pocet] of Object.entries(frekvence)) {
            if (pocet >= 3) {
                nalezy.push({
                    figura: 'repetice',
                    text: veta.substring(0, 60) + (veta.length > 60 ? '…' : ''),
                    index: index,
                    typ: `opakování slova „${slovo}“ (${pocet}x)`,
                    kontext: veta
                });
            }
        }

        // Hledáme opakování frází (2-3 slov) – zjednodušeně
        if (slova.length >= 4) {
            for (let i = 0; i < slova.length - 1; i++) {
                const fráze = slova.slice(i, i + 2).join(' ');
                const regex = new RegExp(`\\b${fráze.replace(/\s+/, '\\s+')}\\b`, 'gi');
                const match = veta.match(regex);
                if (match && match.length >= 2) {
                    nalezy.push({
                        figura: 'repetice',
                        text: veta.substring(0, 60) + (veta.length > 60 ? '…' : ''),
                        index: index,
                        typ: `opakování fráze „${fráze}“`,
                        kontext: veta
                    });
                    break; // aby se neopakovalo pro více frází v jedné větě
                }
            }
        }
    });

    // Odstranění duplicit (pokud stejná věta sedí na více pravidel)
    const unikatni = [];
    const seen = new Set();
    nalezy.forEach(n => {
        if (!seen.has(n.text)) {
            seen.add(n.text);
            unikatni.push(n);
        }
    });

    return unikatni;
}
