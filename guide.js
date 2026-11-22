// Stránky odkazují na české vydání pravidel pro sezonu 2026.
const rulebook = 'https://is.baseball.cz/download/2024/KR/2026_pravidla_baseballu_web.pdf';
const leagueRules = 'https://www.baseball.cz/data/upload/20260501/090300_8c61_CBA-Soutezni-rad-2026.pdf';
const leagueCards = 'https://www.baseball.cz/data/upload/20260601/145335_314d_Soutezni-rad-2026-Karty-soutezi-2026-01-26.pdf';

const chapters = [
  ['Cíl hry', 5, 'Hosté začínají na pálce. Domácí brání a snaží se získat tři auty, aby se družstva vystřídala. Bod vzniká, když se běžec postupně dotkne první, druhé a třetí mety a potom domácí mety. Při třetím autu rozhoduje jeho pořadí a druh. Cestu může rozdělit mezi odpaly několika spoluhráčů.'],
  ['Hřiště a mety', 7, 'Domácí metu poznáš podle pětiúhelníku. Při pohledu z ní leží první meta vpravo a třetí vlevo. Čáry vedené přes tyto dvě mety patří do hracího území. Ve standardním baseballu měří strana čtverce mezi metami 27,43 m.'],
  ['Vybavení a výstroj', 11, 'Pálkař i běžci nosí přilbu. Polaři chytají míč do rukavice, chytač za pálkařem má navíc ochrannou výstroj. Povolené rozměry pálek, rukavic i míčů stanoví pravidla a požadavky soutěže.'],
  ['Před prvním nadhozem', 17, 'Vedoucí družstev předají rozhodčímu sestavy s pořadím pálkařů. Před zápasem se vyjasní také místní pravidla hřiště, například co se stane s míčem u oplocení.'],
  ['Nadhoz, odpal a běh', 23, 'Švih naprázdno je strajk. Pokud pálkař nešvihne a část míče projde strajkovou zónou v letu, rozhodčí také vyhlásí strajk. Po čtyřech ballech získá pálkař první metu zdarma. Po třetím strajku bývá pálkař aut. Pokud chytač třetí strajk nechytí, může pálkař běžet na první, když je volná nebo jsou dva auty.'],
  ['Porušení pravidel', 71, 'Při posuzování překážení záleží na tom, kdo komu zabránil ve hře. Jinak se řeší běžec, který překazí polaři zpracování odpalu, a jinak polař bez míče, který brání běžci v cestě a právě nezpracovává odpal. Kapitola upravuje také nesprávný pohyb nadhazovače (balk).'],
  ['Konec utkání', 93, 'Standardní zápas má devět směn. Vedou-li domácí po horní polovině poslední směny, už na pálku nejdou. Při remíze obvykle následuje další směna. Soutěžní řád ČBA stanoví pro U13 až U18 sedm směn a pro U11 a mladší šest směn. Zvláštní varianty a karty soutěží mohou délku a postup při remíze upravit.'],
  ['Rozhodčí', 101, 'Hlavní rozhodčí za domácí metou posuzuje nadhozy. Rozhodčí v poli sledují například dotek mety nebo běžce při autování. Hru přerušují vyhlášením času a znovu ji zahajují pokynem ke hře.'],
  ['Zápis a statistiky', 109, 'Oficiální zapisovatel zaznamenává průběh utkání. Když pálkař bezpečně doběhne na první, zapisovatel podle průběhu hry rozliší například úspěšný odpal a chybu obrany.']
];

const situations = [
  {title:'Jak vznikne bod?', start:'Běžec stojí na třetí metě. Spoluhráč odpálí po zemi do pole.', path:'M75 103 L130 158', result:'Běžec se dotkne domácí mety. Ani po skončení rozehry nemá obrana víc než dva auty, takže útok získá bod.'},
  {title:'Proč stačí šlápnout na metu?', start:'První meta je obsazená. Po odpalu po zemi běží pálkař na první a běžec ji musí uvolnit.', path:'M185 103 L137 55', batterPath:'M130 158 L179 109', mark:[130,48,'Aut na metě'], result:'Obránce drží míč a dotkne se druhé mety dřív než nucený běžec. Běžec je aut, i když se ho obránce nedotkl.'},
  {title:'Kdy musí obránce tečovat?', start:'Běžec je na druhé metě a první je volná. Pálkař po odpalu běží na první, takže běžec může zůstat na druhé. Rozhodne se ale běžet na třetí.', path:'M130 48 L107 71', mark:[103,75,'Teč běžce'], result:'Běžec postupuje dobrovolně. Obránce ho mezi metami vyřadí dotykem míče nebo rukavice s míčem. Samotné došlápnutí na třetí metu nestačí.'},
  {title:'Kdy vyběhnout po vysokém odpalu?', start:'Je jeden aut a běžec stojí na třetí. Pálkař odpálí vysoko do vnějšího pole.', path:'M75 103 L130 158', mark:[201,55,'Chycený odpal'], result:'Polař odpal chytí ze vzduchu a pálkař je druhý aut. Běžec smí vyběhnout od prvního dotyku polaře s míčem. Pokud vyběhl dřív, může se od tohoto okamžiku třetí mety znovu dotknout a pak běžet domů. Pokud to neudělá, obrana ho může vyautovat hrou na výzvu na třetí metě. Pokud běžec vyrazil správně a bezpečně doběhne domů, bod platí.'}
];

const thirdOut = {
  start:'Jsou dva auty. V obou případech běžec ze třetí doběhne domů dřív, než obrana zahraje třetí aut.',
  plays:[
    {title:'Nucený postup', path:'M75 103 L130 158 M185 103 L137 55', batterPath:'M130 158 L179 109', mark:[130,48,'Třetí aut'], result:'Obsazené jsou všechny mety. Po odpalu obrana zahraje třetí aut na druhé metě při nuceném postupu. Bod se nepočítá.'},
    {title:'Dobrovolný postup', path:'M75 103 L130 158 M130 48 L107 71', mark:[103,75,'Třetí aut'], result:'První meta je volná. Běžec z druhé se po odpalu vydá na třetí a obrana ho tečuje mezi metami. Bod platí.'}
  ]
};

const u7Play = {
  title:'U7 · Proč běžec zastaví na třetí?', start:'Běžec stojí na druhé. Spoluhráč odpálí ze stativu až do zadního pole.',
  path:'M130 48 L75 103', note:[75,130,'Tady běžec zastaví.'],
  result:'Běžec smí doběhnout na třetí. V U7 může při jedné rozehře postoupit nejvýše o jednu metu. Na domácí může běžet při další rozehře.'
};

const playerPitchPlay = {
  title:'U10 a U11 · Kdy vyběhnout při hráčském nadhozu?', start:'Běžec stojí na první metě a nadhazuje hráč.',
  path:'M185 103 L137 55', note:[180,129,'Start z první mety'],
  result:'Běžec smí vyrazit po odpalu nebo jakmile nadhoz proletí kolem pálkaře. Při trenérském nadhozu v U10 může vyběhnout až po odpalu.'
};

function drawPlay(play, index) {
  const arrow = 'run-arrow-' + index;
  return `<svg viewBox="0 0 260 206" role="img" aria-label="${play.title} Šipky ukazují směr běhu.">
    <defs><marker id="${arrow}" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="3" markerHeight="3" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#163e30"/></marker></defs>
    <path d="M130 158L24 52Q130 -48 236 52Z" fill="#cfeac4"/>
    <path d="M130 158L185 103L130 48L75 103Z" fill="#edd5ae" stroke="#fff" stroke-width="3"/>
    <g fill="white" stroke="#496955" stroke-width="2">${[[75,103],[185,103],[130,48],[130,158]].map(([x,y])=>`<rect x="-4" y="-4" width="8" height="8" transform="translate(${x} ${y}) rotate(45)"/>`).join('')}</g>
    <path d="${play.path}" stroke="#163e30" stroke-width="5" fill="none" marker-end="url(#${arrow})"/>
    ${play.batterPath ? `<path d="${play.batterPath}" stroke="#163e30" stroke-width="4" stroke-dasharray="5 4" fill="none" marker-end="url(#${arrow})"/>` : ''}
    ${play.note ? `<text x="${play.note[0]}" y="${play.note[1]}" fill="#173c2c" font-size="11" font-weight="800" text-anchor="middle">${play.note[2]}</text>` : ''}
    ${play.mark ? `<circle cx="${play.mark[0]}" cy="${play.mark[1]}" r="6" fill="#a0332d" stroke="white" stroke-width="2"/><text x="${play.mark[0] < 150 ? play.mark[0]+12 : play.mark[0]}" y="${play.mark[1]+19}" fill="#841e19" font-size="11" font-weight="800" text-anchor="${play.mark[0] < 150 ? 'start' : 'middle'}">${play.mark[2]}</text>` : ''}
    <g fill="#173c2c" font-size="13" font-weight="700" text-anchor="middle"><text x="214" y="109">1. meta</text><text x="130" y="34">2. meta</text><text x="45" y="109">3. meta</text><text x="130" y="184">domácí</text></g></svg>`;
}

function pdfLink(url, label) {
  return `<a href="${url}" target="_blank" rel="noreferrer">${label}</a>`;
}

function pdfReader(url, title) {
  return `<details class="chapter pdf-reader" data-pdf="${url}"><summary>${title}</summary>
    <p>${pdfLink(url, 'Otevřít PDF v nové kartě')}</p></details>`;
}

const categoryNotes = {
  U7:'Na první metě může trenér obrany chytit přihrávku a šlápnout na metu. Míč pak může předat blízkému hráči. Střídání je opakované při zachování místa v pořadí pálkařů. Suplující pálkař, úmyslná meta zdarma ani vnitřní chycený se nepoužívají.',
  U8:'Při odpalu ze stativu pokládá míč rozhodčí a pálkař čeká na jeho pokyn. Viditelné vychýlení stativu je foul, pokud obrana odpal nechytí ze vzduchu. Sestava a návrat vystřídaného hráče se řídí pravidly Malého baseballu.',
  U9:'Základem je Coach-pitch, včetně pravidel pro krátký odpal v pětimetrové výseči, sestavu a střídání. Použij § 9.3 spolu se zjednodušeními v § 9.4.',
  U10:'Při hráčském nadhozu může běžec opustit metu po odpalu nebo po průletu nadhozu kolem pálkaře. Po nesprávné činnosti nadhazovače může kouč v útoku přijmout výsledek následné rozehry, nebo jej odmítnout a získat pro pálkaře ball. Pro trenérský nadhoz platí § 9.3.',
  U11:'Při hráčském nadhozu může běžec vyběhnout po odpalu nebo po průletu nadhozu kolem pálkaře. Po nesprávné činnosti nadhazovače může kouč v útoku přijmout výsledek následné rozehry, nebo jej odmítnout a získat pro pálkaře ball. Hráč základní sestavy se může jednou vrátit po alespoň jednom dokončeném startu náhradníka na pálce nebo šesti po sobě jdoucích autech, během nichž náhradník hrál v poli.',
  U13:'Nadhazovací vzdálenost je 51 stop (15,54 m). Soutěžní řád v § 9.1 uvádí chybný metrický přepočet. Pro hráčské nadhozy platí také věkové limity a povinný odpočinek podle kapitoly 10.'
};

const standardPitch = 'Hráčský nadhoz. Počítají se bally a strajky.';
const standardRunning = 'Běžec může vést od mety a pokusit se ji ukrást.';
const standardEnd = 'Třetí aut. Případné úpravy určuje soutěž.';
const youthRun = 'Start po odpalu nebo když nadhoz proletí kolem pálkaře.';
const fiveRunEnd = 'Třetí aut nebo pátý bod.';

const quickFacts = {
  U7: ['Odpal ze stativu. Pokusy se nepočítají.', 'Start po odpalu. Nejvýše jedna meta za rozehru.', fiveRunEnd, 'Mety 15 m od sebe.'],
  U8: ['Až 3 spodní nadhozy od trenéra, pak možnost 2 pokusů ze stativu.', 'Start po odpalu. Po ukončení rozehry lze doběhnout na metu, ke které běžec míří.', fiveRunEnd, 'Mety 18,29 m od sebe.'],
  U9: ['5 nadhozů od trenéra. Švihy se nepočítají.', 'Start po odpalu. Po hodu vnitřního polaře do kruhu lze doběhnout na metu, ke které běžec míří.', fiveRunEnd, 'Mety 18,29 m od sebe. Nadhoz z 10–14 m.'],
  U10: [
    ['Trenér: až 5 nadhozů a 3 švihy, s výjimkami pro foul-ball.', 'Hráč: počítají se bally a strajky.'],
    ['Trenér: start po odpalu.', 'Hráč: ' + youthRun.toLowerCase()],
    ['Trenér: tři auty nebo pátý bod.', 'Hráč: tři auty, případný bodový limit určuje soutěž.'],
    ['Mety 18,29 m od sebe.', 'Nadhoz trenéra z 10–14 m, hráče z 13 m.']
  ],
  U11: [standardPitch, youthRun, standardEnd, 'Mety 18,29 m od sebe. Nadhoz ze 14,02 m.'],
  U13: [standardPitch, standardRunning, standardEnd, 'Mety 22,86 m od sebe. Nadhoz z 51 stop (15,54 m).']
};

const standardFacts = [standardPitch, standardRunning, standardEnd, 'Standardní hřiště. Případné úpravy určuje soutěž.'];
const factLabels = ['Nadhoz a odpal', 'Běh po metách', 'Konec útoku', 'Hřiště'];

function renderCategoryCard(item, competitionLink) {
  const facts = quickFacts[item.id] || standardFacts;
  const duration = item.id === 'U7' ? 'Doporučeně 3–6 směn. Přesný počet nebo čas se dohodne před utkáním.' : 'Počet směn a případný časový limit stanoví soutěž.';
  return `<article class="panel">
    <div class="panel-head"><div><div class="cat-kicker">Kategorie ${item.id} · ${item.source}</div><h3>${item.variant}</h3></div><div class="age">Věk ${item.age}</div></div>
    <div class="facts">${factLabels.map((label, index) => `<div class="fact"><span>${label}</span>${[facts[index]].flat().map(value => `<strong>${value}</strong>`).join('')}</div>`).join('')}</div>
    <div class="card-footer">
      <p><strong>Délka utkání</strong> · ${duration}</p>
      ${item.id === 'U8' ? '<p>FirstCup má vlastní pravidla nadhozu a délky utkání.</p>' : ''}
      <p>${competitionLink}</p>
    </div>
    <div class="rules"><h4>Pravidla kategorie ${item.id}</h4>
      ${item.rules.map(([label, description], index) => `<article class="rule"><span class="num">${String(index + 1).padStart(2, '0')}</span><div><strong>${label}</strong><p>${description}</p></div></article>`).join('')}
    </div>
  </article>`;
}

function renderSituations(category) {
  const categoryPlay = category === 'U7' ? u7Play : ['U10', 'U11'].includes(category) ? playerPitchPlay : null;
  const renderCard = (play, index) => `<figure><h4>${play.title}</h4>${drawPlay(play, index)}<figcaption><p>${play.start}</p><p>${play.result}</p></figcaption></figure>`;
  return `<section class="guide-block"><h3>Herní situace na hřišti</h3>
    <p>Plná šipka ukazuje cestu běžce, přerušovaná cestu pálkaře po odpalu. Červený bod označuje místo zákroku obrany. První příklady popisují standardní baseball.${category !== 'vse' ? ' Pro '+category+' zohledni také pravidla běhu a ukončení rozehry uvedená výše.' : ''}</p>
    <div class="plays">
      ${situations.map(renderCard).join('')}
      <article class="third-out"><h4>Počítá se bod při třetím autu?</h4><p>${thirdOut.start}</p>
        <div class="plays">${thirdOut.plays.map((play, index) => `<figure><h5>${play.title}</h5>${drawPlay(play, situations.length + index)}<figcaption><p>${play.result}</p></figcaption></figure>`).join('')}</div>
      </article>
      ${categoryPlay ? renderCard(categoryPlay, situations.length + thirdOut.plays.length) : ''}
    </div></section>`;
}

function showGuide(item) {
  const category = item?.id || 'vse';
  const sourcePage = {U7:18,U8:17,U9:16,U10:15,U11:15,U13:14};
  const hasCompetitions = item && comps.some(competition => competition.categories.includes(item.id));
  const competitionLink = hasCompetitions
    ? `<a href="#souteze/${category.toLowerCase()}">Soutěže a turnaje pro ${category}</a>`
    : pdfLink(leagueCards, 'Karty soutěží 2026');
  const categoryCard = item ? renderCategoryCard(item, competitionLink) : '';
  const categoryText = item ? `<section class="guide-block"><h3>Předpisy pro ${item.id}</h3>
    <p>${categoryNotes[item.id] || 'Délku utkání a další podmínky určuje karta konkrétní soutěže. Limity nadhozů se řídí věkem nadhazovače.'}</p>
    <p>${pdfLink(leagueRules+'#page=18','Omezení nadhozů podle věku')}${item.id === 'U13' ? ' · ' + pdfLink('https://baseball.cz/article/detail/10797', 'Rozměry U13 v oznámení ČBA') : ''}</p>
    ${hasCompetitions ? '<p>' + pdfLink(leagueCards,'Karty soutěží 2026') + '</p>' : ''}
    ${pdfReader(leagueRules + '#page=' + (sourcePage[item.id] || 1), 'Číst soutěžní řád ČBA')}</section>` : '';
  document.querySelector('#guide-body').innerHTML = `${categoryCard}${categoryText}
    <section class="guide-block"><h3>${item ? 'Společný základ pro ' + item.id : 'Pravidla baseballu'} podle kapitol</h3>
    <p>${item ? 'Následuje základní baseball. Při utkání použij výše uvedené úpravy pro '+item.id+' a propozice soutěže.' : 'Otevři téma pro stručný výklad nebo přejdi přímo na úplné znění pravidel.'}</p>
    ${chapters.map(([label,page,body],i)=>`<details class="chapter"><summary>${i+1}. ${label}</summary><p>${body}</p>${i===4 ? '<p>Odpal chycený ze vzduchu vyřadí pálkaře. Běžný foul-ball přidá strajk jen při méně než dvou strajcích. Ulejvka do zámezí při dvou strajcích znamená aut. Bod platí, pokud běžec správně dosáhne domácí mety před třetím autem. Z rozehry se žádný bod nezapočítá, pokud třetí aut padne při nuceném postupu nebo je běžící pálkař aut před dotykem první mety. Bod následujícího běžce také propadá, pokud je předchozí běžec třetím autem za vynechání mety.</p>' : ''}<p>${pdfLink(rulebook+'#page='+page,'Kapitola '+(i+1)+' v oficiálních pravidlech')}</p></details>`).join('')}
    ${pdfReader(rulebook, 'Číst úplná oficiální pravidla baseballu 2026')}</section>
    ${renderSituations(category)}`;
  document.querySelectorAll('#guide-body .pdf-reader').forEach(reader => {
    reader.addEventListener('toggle', () => {
      if (!reader.open || reader.querySelector('iframe')) return;
      const frame = document.createElement('iframe');
      frame.title = reader.querySelector('summary').textContent;
      frame.src = reader.dataset.pdf;
      reader.append(frame);
    });
  });
}
