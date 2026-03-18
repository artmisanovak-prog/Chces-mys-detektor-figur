// ========== figury/anafora/anafora.js ==========

function detekujAnaforu(text) {
    const vety = text.split(/[.!?…]+/).map(v => v.trim()).filter(v => v.length > 0);
    const nalezy = [];

    for (let i = 0; i < vety.length - 1; i++) {
        const prvniSlova1 = vety[i].split(/\s+/).slice(0, 3).join(' '); // první 3 slova
        const prvniSlova2 = vety[i + 1].split(/\s+/).slice(0, 3).join(' ');

        if (prvniSlova1 && prvniSlova2 && prvniSlova1 === prvniSlova2) {
            nalezy.push({
                figura: 'anafora',
                text: `${vety[i].substring(0, 40)}… / ${vety[i + 1].substring(0, 40)}…`,
                index: i,
                typ: `stejný začátek: „${prvniSlova1}“`,
                kontext: vety[i] + ' / ' + vety[i + 1]
            });
        }
    }

    return nalezy;
}
