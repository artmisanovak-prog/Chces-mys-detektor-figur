// ========== figury/fyzikalizace/fyzikalizace.js ==========
// Detektor fyzikalizace – hledá spojení abstraktních jazykových pojmů s fyzickými slovesy
// Závisí na slovniky.js (fyzickaSlovesa, abstraktni)

function detekujFyzikalizaci(text) {
    if (typeof SLOVNIKY === 'undefined') {
        console.error('Chybí slovniky.js – načti ho před tímto detektorem');
        return [];
    }

    const vety = text.split(/[.!?…]+/).map(v => v.trim()).filter(v => v.length > 0);
    const nalezy = [];

    const fyzickaSlovesa = SLOVNIKY.fyzickaSlovesa || [];
    const abstraktni = SLOVNIKY.abstraktni || [];

    vety.forEach((veta, index) => {
        const vetaLower = veta.toLowerCase();

        // Hledáme abstraktní pojmy spojené s fyzickými slovesy
        for (let abstrakt of abstraktni) {
            const regexAbstraktSloveso = new RegExp(`\\b${abstrakt}\\s+(\\w+)`, 'i');
            const match = vetaLower.match(regexAbstraktSloveso);

            if (match) {
                const sloveso = match[1];

                for (let fyzicke of fyzickaSlovesa) {
                    if (sloveso.includes(fyzicke) || fyzicke.includes(sloveso) || sloveso.startsWith(fyzicke.substring(0, 4))) {
                        nalezy.push({
                            figura: 'fyzikalizace',
                            text: veta.substring(0, 60) + (veta.length > 60 ? '…' : ''),
                            index: index,
                            typ: `${abstrakt} + fyzické sloveso (${sloveso})`,
                            kontext: veta
                        });
                        break;
                    }
                }
            }

            // Může být i obrácené pořadí: sloveso + abstraktní
            const regexSlovesoAbstrakt = new RegExp(`(\\w+)\\s+${abstrakt}`, 'i');
            const match2 = vetaLower.match(regexSlovesoAbstrakt);
            if (match2) {
                const sloveso = match2[1];
                for (let fyzicke of fyzickaSlovesa) {
                    if (sloveso.includes(fyzicke) || fyzicke.includes(sloveso)) {
                        nalezy.push({
                            figura: 'fyzikalizace',
                            text: veta.substring(0, 60) + (veta.length > 60 ? '…' : ''),
                            index: index,
                            typ: `fyzické sloveso (${sloveso}) + ${abstrakt}`,
                            kontext: veta
                        });
                        break;
                    }
                }
            }
        }

        // Speciální případ: materializace emocí (keramický smutek) – materiál + abstraktní
        const materialy = SLOVNIKY.materialy || [];
        const emoce = SLOVNIKY.emoce || [];

        for (let material of materialy) {
            for (let emoceSlovo of emoce) {
                const regexMaterialEmoce = new RegExp(`\\b${material}\\s+${emoceSlovo}\\b|\\b${emoceSlovo}\\s+${material}\\b`, 'i');
                if (regexMaterialEmoce.test(vetaLower)) {
                    nalezy.push({
                        figura: 'fyzikalizace',
                        text: veta.substring(0, 60) + (veta.length > 60 ? '…' : ''),
                        index: index,
                        typ: `materializace: ${material} + ${emoceSlovo}`,
                        kontext: veta
                    });
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
