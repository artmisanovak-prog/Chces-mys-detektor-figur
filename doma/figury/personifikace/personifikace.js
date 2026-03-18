// ========== figury/personifikace/personifikace.js ==========
// Detektor personifikace – hledá spojení neživého podmětu s lidským slovesem
// Závisí na slovniky.js (lidskaSlovesa, nezivePodmety)

function detekujPersonifikaci(text) {
    // Kontrola, zda jsou slovníky k dispozici
    if (typeof SLOVNIKY === 'undefined') {
        console.error('Chybí slovniky.js – načti ho před tímto detektorem');
        return [];
    }

    const vety = text.split(/[.!?…]+/).map(v => v.trim()).filter(v => v.length > 0);
    const nalezy = [];

    const lidskaSlovesa = SLOVNIKY.lidskaSlovesa || [];
    const nezivePodmety = SLOVNIKY.nezivePodmety || [];

    vety.forEach((veta, index) => {
        const vetaLower = veta.toLowerCase();

        // Pro každý neživý podmět hledáme, zda se vyskytuje ve větě
        for (let podmět of nezivePodmety) {
            // Hledáme podmět následovaný slovesem (zjednodušeně)
            const regexPodmetSloveso = new RegExp(`\\b${podmět}\\s+(\\w+)`, 'i');
            const match = vetaLower.match(regexPodmetSloveso);

            if (match) {
                const sloveso = match[1];

                // Je toto sloveso v seznamu lidských sloves?
                for (let lidske of lidskaSlovesa) {
                    if (sloveso.includes(lidske) || lidske.includes(sloveso) || sloveso.startsWith(lidske.substring(0, 4))) {
                        nalezy.push({
                            figura: 'personifikace',
                            text: veta.substring(0, 60) + (veta.length > 60 ? '…' : ''),
                            index: index,
                            typ: `${podmět} + lidské sloveso (${sloveso})`,
                            kontext: veta
                        });
                        break; // našli jsme shodu pro tento podmět
                    }
                }
            }

            // Alternativní hledání – sloveso může být před podmětem
            const regexSlovesoPodmet = new RegExp(`(\\w+)\\s+${podmět}`, 'i');
            const match2 = vetaLower.match(regexSlovesoPodmet);
            if (match2) {
                const sloveso = match2[1];
                for (let lidske of lidskaSlovesa) {
                    if (sloveso.includes(lidske) || lidske.includes(sloveso)) {
                        nalezy.push({
                            figura: 'personifikace',
                            text: veta.substring(0, 60) + (veta.length > 60 ? '…' : ''),
                            index: index,
                            typ: `lidské sloveso (${sloveso}) + ${podmět}`,
                            kontext: veta
                        });
                        break;
                    }
                }
            }
        }
    });

    // Odstranění duplicit
    const unikatni = [];
    const seen = new Set();
    nalezy.forEach(n => {
        const key = n.text.substring(0, 40);
        if (!seen.has(key)) {
            seen.add(key);
            unikatni.push(n);
        }
    });

    return unikatni;
}
