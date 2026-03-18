// slovniky.js – společné slovníky pro všechny detektory

const SLOVNIKY = {
    // Lidská slovesa (pro personifikaci)
    lidskaSlovesa: [
        'mluví', 'řekl', 'říká', 'zeptala', 'odpověděla', 'vysvětloval', 'přemýšlí',
        'myslí', 'cítí', 'vidí', 'slyší', 'chce', 'touží', 'bojí se', 'raduje se',
        'směje', 'pláče', 'vzpomíná', 'zapomněl', 'pamatuje', 'sní', 'přemýšlí',
        'rozumí', 'nerozumí', 'pochybuje', 'věří', 'nevěří', 'rozhodl', 'váhá',
        'píše', 'zapisuje', 'kreslí', 'počítá', 'počítal', 'měří', 'pozoruje', 'vnímá'
    ],

    // Fyzická slovesa (pro fyzikalizaci)
    fyzickaSlovesa: [
        'padá', 'spadl', 'padají', 'letí', 'letěl', 'vznáší se', 'stoupá', 'klesá',
        'teče', 'plyne', 'teče', 'kapal', 'kape', 'tuhne', 'tvrdne', 'měkne',
        'visí', 'visel', 'zavěsil', 'přilepil', 'odlepil', 'rozbil', 'rozpadl',
        'spolkl', 'polyká', 'krká', 'vyplivl', 'dýchá', 'hýbe se', 'pohybuje'
    ],

    // Běžná spojení (co není metafora)
    beznaSpojeni: [
        'je člověk', 'je zvíře', 'je pes', 'je kočka', 'je dům', 'je strom',
        'je voda', 'je vzduch', 'je oheň', 'je země', 'je slunce', 'je měsíc',
        'je den', 'je noc', 'je čas', 'je hodina', 'je barva', 'je černá', 'je bílá',
        'je velký', 'je malý', 'je teplý', 'je studený', 'je starý', 'je mladý'
    ],

    // Neživé podmět (pro personifikaci)
    nezivePodmety: [
        'čas', 'den', 'noc', 'tma', 'světlo', 'stín', 'voda', 'vítr', 'oheň',
        'země', 'nebe', 'vesmír', 'svět', 'příroda', 'život', 'smrt', 'láska',
        'nenávist', 'strach', 'radost', 'smutek', 'bolest', 'naděje', 'myšlenka',
        'otázka', 'odpověď', 'problém', 'cesta', 'minulost', 'přítomnost', 'budoucnost',
        'paměť', 'vzpomínka', 'sen', 'město', 'dům', 'strom', 'kámen', 'řeka', 'les'
    ],

    // Abstraktní pojmy (pro fyzikalizaci)
    abstraktni: [
        'slovo', 'věta', 'řeč', 'jazyk', 'myšlenka', 'otázka', 'odpověď',
        'význam', 'smysl', 'pravda', 'lež', 'láska', 'strach', 'radost', 'smutek',
        'bolest', 'naděje', 'paměť', 'vzpomínka', 'sen', 'čas', 'život', 'smrt'
    ]
};
