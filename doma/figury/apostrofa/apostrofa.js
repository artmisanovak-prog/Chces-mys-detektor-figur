// ========== figury/apostrofa/apostrofa.js ==========
// Detektor apostrofy – hledá oslovení čtenáře, 2. osobu, vokativ

function detekujApostrofu(text) {
    const vety = text.split(/[.!?…]+/).map(v => v.trim()).filter(v => v.length > 0);
    const nalezy = [];

    // Zájmena 2. osoby
    const druhaOsoba = ['ty', 'tě', 'tobě', 'ti', 'tebe', 'vy', 'vás', 'vám', 'vámi'];

    // Slovesa v 2. osobě (orientačně – koncovky)
    const koncovky2os = ['áš', 'íš', 'uješ', 'áš', 'íš', 'ete', 'íte', 'ou'];

    // Běžné fráze oslovení čtenáře
    const osloveniFrazemy = [
        'představte si', 'představ si', 'dovedete si představit', 'dokážeš si představit',
        'věřte mi', 'věř mi', 'poslouchejte', 'poslouchej', 'podívejte se', 'podívej se',
        'řekněte', 'řekni', 'zkuste', 'zkus', 'myslete si', 'mysli si'
    ];

    vety.forEach((veta, index) => {
        const vetaLower = veta.toLowerCase();

        // 1. Hledání frází oslovení
        for (let fráze of osloveniFrazemy) {
            if (vetaLower.includes(fráze)) {
                nalezy.push({
                    figura: 'apostrofa',
                    text: veta.substring(0, 60) + (veta.length > 60 ? '…' : ''),
                    index: index,
                    typ: `oslovení čtenáře: „${fráze}“`,
                    kontext: veta
                });
                break;
            }
        }

        // 2. Hledání zájmen 2. osoby
        for (let zajmeno of druhaOsoba) {
            if (vetaLower.includes(zajmeno)) {
                nalezy.push({
                    figura: 'apostrofa',
                    text: veta.substring(0, 60) + (veta.length > 60 ? '…' : ''),
                    index: index,
                    typ: `zájmeno 2. osoby: „${zajmeno}“`,
                    kontext: veta
                });
                break;
            }
        }

        // 3. Hledání sloves v 2. osobě (velmi zjednodušeně – koncovky)
        const slova = vetaLower.split(/\s+/);
        for (let slovo of slova) {
            for (let koncovka of koncovky2os) {
                if (slovo.endsWith(koncovka) && slovo.length > 4) {
                    nalezy.push({
                        figura: 'apostrofa',
                        text: veta.substring(0, 60) + (veta.length > 60 ? '…' : ''),
                        index: index,
                        typ: `sloveso ve 2. osobě: „${slovo}“`,
                        kontext: veta
                    });
                    break;
                }
            }
        }
    });

    // Odstranění duplicit
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
