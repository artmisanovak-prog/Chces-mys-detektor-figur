// ========== figury/kontrast/kontrast.js ==========
// Detektor kontrastu – hledá protiklady, antonyma, "ale", "naopak"

function detekujKontrast(text) {
    const vety = text.split(/[.!?…]+/).map(v => v.trim()).filter(v => v.length > 0);
    const nalezy = [];

    // Základní slovník antonym (pro češtinu)
    const ANTONYMA = [
        ['malý', 'velký'], ['malá', 'velká'], ['malé', 'velké'],
        ['malý', 'obrovský'], ['malá', 'obrovská'], ['malé', 'obrovské'],
        ['krátký', 'dlouhý'], ['krátká', 'dlouhá'], ['krátké', 'dlouhé'],
        ['úzký', 'široký'], ['úzká', 'široká'], ['úzké', 'široké'],
        ['nízký', 'vysoký'], ['nízká', 'vysoká'], ['nízké', 'vysoké'],
        ['mladý', 'starý'], ['mladá', 'stará'], ['mladé', 'staré'],
        ['rychlý', 'pomalý'], ['rychlá', 'pomalá'], ['rychlé', 'pomalé'],
        ['těžký', 'lehký'], ['těžká', 'lehká'], ['těžké', 'lehké'],
        ['teplý', 'studený'], ['teplá', 'studená'], ['teplé', 'studené'],
        ['černý', 'bílý'], ['černá', 'bílá'], ['černé', 'bílé'],
        ['světlý', 'tmavý'], ['světlá', 'tmavá'], ['světlé', 'tmavé'],
        ['nahoře', 'dole'], ['nahoru', 'dolů'], ['vpřed', 'vzad'],
        ['den', 'noc'], ['světlo', 'tma'], ['život', 'smrt'],
        ['láska', 'nenávist'], ['radost', 'smutek'], ['štěstí', 'neštěstí']
    ];

    // Klíčová slova indikující kontrast
    const kontrastKlicova = ['ale', 'avšak', 'naopak', 'naproti tomu', 'zatímco', 'kdežto', '×', 'vs'];

    vety.forEach((veta, index) => {
        const vetaLower = veta.toLowerCase();

        // 1. Hledání kontrastních spojek
        for (let slovo of kontrastKlicova) {
            if (vetaLower.includes(slovo)) {
                nalezy.push({
                    figura: 'kontrast',
                    text: veta.substring(0, 60) + (veta.length > 60 ? '…' : ''),
                    index: index,
                    typ: `kontrastní spojka: „${slovo}“`,
                    kontext: veta
                });
                break; // jedna spojka stačí
            }
        }

        // 2. Hledání antonym v blízkosti (do 50 znaků)
        for (let [a, b] of ANTONYMA) {
            // Hledáme obě varianty pořadí
            if (vetaLower.includes(a) && vetaLower.includes(b)) {
                nalezy.push({
                    figura: 'kontrast',
                    text: veta.substring(0, 60) + (veta.length > 60 ? '…' : ''),
                    index: index,
                    typ: `antonyma: ${a} × ${b}`,
                    kontext: veta
                });
                break; // pro tuto větu stačí jeden nález
            }
        }

        // 3. Hledání paralelních struktur s kontrastem (např. "X, Y – ale Z")
        if (veta.includes('–') && (veta.includes('ale') || veta.includes('naopak'))) {
            nalezy.push({
                figura: 'kontrast',
                text: veta.substring(0, 60) + (veta.length > 60 ? '…' : ''),
                index: index,
                typ: 'paralelní kontrast (pomlčka + ale)',
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
