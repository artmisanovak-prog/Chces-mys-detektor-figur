// ========== figury/gradace/gradace.js ==========

function detekujGradaci(text) {
    const vety = text.split(/[.!?…]+/).map(v => v.trim()).filter(v => v.length > 0);
    const nalezy = [];

    // Hledání stupňovaných adjektiv / adverbií (hlubší, širší...)
    const stupnovanyVzor = /\b(\w+)(ější|ější|ější|ší|ší|ější|ější|ejší|ejší)\b/i;

    // Hledání řady (např. "A. B. C.") – tři a více krátkých vět za sebou
    const radaKratkych = (vety, start) => {
        let count = 1;
        for (let i = start + 1; i < vety.length; i++) {
            if (vety[i].split(/\s+/).length <= 3) count++;
            else break;
        }
        return count >= 3;
    };

    vety.forEach((veta, index) => {
        // 1. Stupňovaná adjektiva
        const match = veta.match(stupnovanyVzor);
        if (match) {
            nalezy.push({
                figura: 'gradace',
                text: veta.substring(0, 60) + (veta.length > 60 ? '…' : ''),
                index: index,
                typ: `stupňované adjektivum: ${match[0]}`,
                kontext: veta
            });
        }

        // 2. Řada krátkých vět za sebou (indikuje gradaci)
        if (index < vety.length - 2 && radaKratkych(vety, index)) {
            // Vezmeme následující 3 věty jako ukázku
            const serie = vety.slice(index, index + 3).join(' · ');
            nalezy.push({
                figura: 'gradace',
                text: serie.substring(0, 60) + (serie.length > 60 ? '…' : ''),
                index: index,
                typ: 'možná gradace (řada krátkých vět)',
                kontext: serie
            });
        }

        // 3. Specifické vzorce: "od X k Y" nebo "čím víc X, tím víc Y"
        if (/od\s+\w+\s+(až|po|k)\s+\w+/i.test(veta) || /čím\s+víc\s+\w+\s*,\s*tím\s+víc/i.test(veta)) {
            nalezy.push({
                figura: 'gradace',
                text: veta.substring(0, 60) + (veta.length > 60 ? '…' : ''),
                index: index,
                typ: 'explicitní gradace (od… k…, čím… tím…)',
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
