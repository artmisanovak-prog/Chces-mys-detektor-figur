// ========== figury/definice/definice.js ==========
// Detektor definic – hledá explicitní definiční vzorce

function detekujDefinici(text) {
    const vety = text.split(/[.!?…]+/).map(v => v.trim()).filter(v => v.length > 0);
    const nalezy = [];

    // Vzorce pro definice
    const definicniVzorce = [
        // X je Y
        { regex: /\b(\w+(?:\s+\w+)?)\s+(je|jsou|byl|byla|jsou|znamená|představuje|označuje)\s+(\w+(?:\s+\w+)?)\b/i, typ: 'explicitní definice (je)' },
        
        // X, tedy Y
        { regex: /\b(\w+(?:\s+\w+)?)\s*,\s*(tedy|neboli|čili)\s+(\w+(?:\s+\w+)?)\b/i, typ: 'vysvětlovací definice' },
        
        // X – Y (pomlčka jako definice)
        { regex: /\b(\w+(?:\s+\w+)?)\s*–\s+(\w+(?:\s+\w+)?)\b/i, typ: 'definice s pomlčkou' },
        
        // definice negací (X není Y, není Z...)
        { regex: /(\w+(?:\s+\w+)?)\s+(není|nejsou|nebyl)\s+(\w+).*?(není|nejsou|nebyl)\s+(\w+)/i, typ: 'definice negacemi' }
    ];

    vety.forEach((veta, index) => {
        for (let vzor of definicniVzorce) {
            if (vzor.regex.test(veta)) {
                nalezy.push({
                    figura: 'definice',
                    text: veta.substring(0, 60) + (veta.length > 60 ? '…' : ''),
                    index: index,
                    typ: vzor.typ,
                    kontext: veta
                });
                break; // jedna věta = jedna definice
            }
        }
    });

    return nalezy;
}
