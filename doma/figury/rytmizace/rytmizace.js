// ========== figury/rytmizace/rytmizace.js ==========
// Detektor rytmizace – hledá pravidelnost v délkách vět

function detekujRytmizaci(text) {
    const vety = text.split(/[.!?…]+/).map(v => v.trim()).filter(v => v.length > 0);
    const nalezy = [];

    // Funkce pro získání délky věty v počtu slov
    function delkaVety(veta) {
        return veta.split(/\s+/).length;
    }

    // Potřebujeme alespoň 3 věty za sebou
    for (let i = 0; i < vety.length - 2; i++) {
        const delky = [
            delkaVety(vety[i]),
            delkaVety(vety[i + 1]),
            delkaVety(vety[i + 2])
        ];

        // 1. Tři věty stejně dlouhé (krátké)
        if (delky[0] === delky[1] && delky[1] === delky[2] && delky[0] <= 3) {
            nalezy.push({
                figura: 'rytmizace',
                text: vety.slice(i, i + 3).join(' · ').substring(0, 80) + '…',
                index: i,
                typ: `tři krátké věty (${delky[0]} slova)`,
                kontext: vety.slice(i, i + 3).join(' ')
            });
        }

        // 2. Pravidelný rytmus 1-2-1, 2-1-2 apod. (jednoduchá detekce)
        if (delky[0] === delky[2] && delky[0] !== delky[1]) {
            nalezy.push({
                figura: 'rytmizace',
                text: vety.slice(i, i + 3).join(' · ').substring(0, 80) + '…',
                index: i,
                typ: 'střídavý rytmus (X-Y-X)',
                kontext: vety.slice(i, i + 3).join(' ')
            });
        }

        // 3. Gradace délek (např. 1-2-3)
        if (delky[0] < delky[1] && delky[1] < delky[2]) {
            nalezy.push({
                figura: 'rytmizace',
                text: vety.slice(i, i + 3).join(' · ').substring(0, 80) + '…',
                index: i,
                typ: 'gradace délek (rostoucí)',
                kontext: vety.slice(i, i + 3).join(' ')
            });
        }
        if (delky[0] > delky[1] && delky[1] > delky[2]) {
            nalezy.push({
                figura: 'rytmizace',
                text: vety.slice(i, i + 3).join(' · ').substring(0, 80) + '…',
                index: i,
                typ: 'gradace délek (klesající)',
                kontext: vety.slice(i, i + 3).join(' ')
            });
        }
    }

    // Odstranění duplicit (podle textu)
    const unikatni = [];
    const seen = new Set();
    nalezy.forEach(n => {
        const key = n.text.substring(0, 40); // pro zjednodušení
        if (!seen.has(key)) {
            seen.add(key);
            unikatni.push(n);
        }
    });

    return unikatni;
}
