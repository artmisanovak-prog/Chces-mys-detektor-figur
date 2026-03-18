// ========== figury/paradox/paradox.js ==========
// Detektor paradoxů – hledá logické rozpory, sebepopírání, fyzikální nemožnosti

function detekujParadox(text) {
    const vety = text.split(/[.!?…]+/).map(v => v.trim()).filter(v => v.length > 0);
    const nalezy = [];

    // Vzorce pro paradoxy (inspirované pohádkami)
    const vzorce = [
        // Vzorec: "X a přesto ne-X" nebo "X ale přesto Y" (kde Y je negace X)
        { regex: /(\w+)\s+(a přesto|a přece|ale přesto|ale stejně|avšak)\s+(ne-?\w+|non-?\w+|není\s+\w+)/i, typ: 'rozpor (X a přesto ne-X)' },
        
        // Vzorec: fyzikální nemožnost (padat vzhůru, stoupat dolů)
        { regex: /(padá|letí|stoupá|klesá)\s+(nahoru|vzhůru|dolů).*?(ale|přesto).*?(padá|letí|stoupá|klesá)\s+(dolů|nahoru)/i, typ: 'fyzikální nemožnost' },
        { regex: /(padá|letí).*?(nahoru|vzhůru)/i, typ: 'fyzikální nemožnost (padá nahoru)' },
        
        // Vzorec: sebepopírání (X je Y, ale není to pravda)
        { regex: /(\w+)\s+je\s+(\w+)\s*,\s*ale\s+(není|nejsou)/i, typ: 'sebepopírání' },
        
        // Vzorec: živá mrtvola apod.
        { regex: /\b(živý|živá|živé)\s+(mrtvola|mrtvý|neživý)\b/i, typ: 'spojení protikladů' },
        { regex: /\b(tma|temnota)\s+(světlo|záře|jas)\b|\b(světlo)\s+(tma|temnota)\b/i, typ: 'spojení protikladů' },
        
        // Vzorec: "kdyby X, pak Y, ale Y je nemožné"
        { regex: /kdyby\s+(\w+)\s*,\s*(pak|tak)\s+(\w+).*?(ale|jenže)\s+(není|neexistuje)/i, typ: 'podmíněný paradox' }
    ];

    vety.forEach((veta, index) => {
        for (let vzor of vzorce) {
            if (vzor.regex.test(veta)) {
                nalezy.push({
                    figura: 'paradox',
                    text: veta.substring(0, 80) + (veta.length > 80 ? '…' : ''),
                    index: index,
                    typ: vzor.typ,
                    kontext: veta
                });
                break; // najdeme první odpovídající vzor a jdeme na další větu
            }
        }
    });

    return nalezy;
}
