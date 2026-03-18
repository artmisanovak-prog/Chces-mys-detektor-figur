// ========== figury/fragment/fragment.js ==========
// Detektor fragmentů – hledá krátké úseky, které nejsou úplnými větami

function detekujFragment(text) {
    // Rozdělíme na potenciální fragmenty podle konců vět a mezer
    const rawSegments = text.split(/(?<=[.!?…])\s+/);
    const nalezy = [];

    rawSegments.forEach((segment, index) => {
        segment = segment.trim();
        if (!segment) return;

        const slova = segment.split(/\s+/).filter(s => s.length > 0);
        const pocetSlov = slova.length;

        // Kritéria pro fragment:
        // 1. Krátký (1–3 slova) a neobsahuje určité sloveso (zjednodušeně)
        // 2. Končí třemi tečkami
        // 3. Je to samostatná pomlčka nebo výčet (např. "–")

        if (pocetSlov <= 3 && pocetSlov > 0) {
            // Jednoduchá kontrola, zda obsahuje sloveso (končí na -t, -l atd.)
            const posledniSlovo = slova[slova.length - 1].toLowerCase();
            const jeSloveso = posledniSlovo.endsWith('t') || 
                               posledniSlovo.endsWith('l') || 
                               posledniSlovo.endsWith('a') || 
                               posledniSlovo.endsWith('o') || 
                               posledniSlovo.endsWith('i') ||
                               posledniSlovo.endsWith('y') ||
                               posledniSlovo.endsWith('li') ||
                               posledniSlovo.endsWith('ly');

            // Pokud není sloveso (nebo je to citoslovce), považujeme za fragment
            if (!jeSloveso || segment.includes('…') || segment.startsWith('–')) {
                nalezy.push({
                    figura: 'fragment',
                    text: segment.substring(0, 50),
                    index: index,
                    typ: pocetSlov === 1 ? 'jednoslovný fragment' : 'krátký fragment',
                    kontext: segment
                });
            }
        }

        // Explicitní fragmenty s třemi tečkami (i delší)
        if (segment.includes('…') && !segment.includes(' ') && segment.length > 0) {
            nalezy.push({
                figura: 'fragment',
                text: segment,
                index: index,
                typ: 'fragment s třemi tečkami',
                kontext: segment
            });
        }

        // Fragmenty začínající pomlčkou (výčty)
        if (segment.startsWith('–') || segment.startsWith('-')) {
            nalezy.push({
                figura: 'fragment',
                text: segment,
                index: index,
                typ: 'výčtový fragment',
                kontext: segment
            });
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
