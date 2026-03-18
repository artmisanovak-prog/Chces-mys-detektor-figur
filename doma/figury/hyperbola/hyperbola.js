// ========== figury/hyperbola/hyperbola.js ==========
// Závisí na utils.js (pokud je potřeba, ale hyperbola je spíš podle klíčových slov)

function detekujHyperbolu(text) {
    const vety = text.split(/[.!?…]+/).map(v => v.trim()).filter(v => v.length > 0);
    const nalezy = [];

    // Klíčová slova indikující hyperbolu
    const hyperKlicova = [
        'všechno', 'nikdo', 'nikdy', 'vždycky', 'absolutně', 'úplně', 'dokonale',
        'obrovský', 'neskutečný', 'nekonečný', 'věčný', 'donekonečna'
    ];

    // Vzorce: "tak X, že až Y" (extrémní důsledek)
    const vzorecExtrem = /tak\s+(\w+)\s*,\s*že\s+až?\s+(\w+)/i;

    vety.forEach((veta, index) => {
        // Hledání klíčových slov
        for (let slovo of hyperKlicova) {
            if (veta.toLowerCase().includes(slovo)) {
                nalezy.push({
                    figura: 'hyperbola',
                    text: veta.substring(0, 60) + (veta.length > 60 ? '…' : ''),
                    index: index,
                    typ: `klíčové slovo: ${slovo}`,
                    kontext: veta
                });
                break; // aby se neopakovalo pro více slov v jedné větě
            }
        }

        // Hledání extrémního vzorce
        const match = veta.match(vzorecExtrem);
        if (match) {
            nalezy.push({
                figura: 'hyperbola',
                text: veta.substring(0, 60) + (veta.length > 60 ? '…' : ''),
                index: index,
                typ: 'extrémní důsledek (tak… že až…)',
                kontext: veta
            });
        }

        // Detekce číselných nadsázek (tisíce, miliony)
        if (/\b(tisíc|tisíce|milión|milióny|miliard|nekonečno)\b/i.test(veta)) {
            nalezy.push({
                figura: 'hyperbola',
                text: veta.substring(0, 60) + (veta.length > 60 ? '…' : ''),
                index: index,
                typ: 'číselná nadsázka',
                kontext: veta
            });
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
