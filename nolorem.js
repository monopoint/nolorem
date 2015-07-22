var nolorem = {};

nolorem.settings = {};
nolorem.settings.defaultNumOfWordsInTitle = 10;

nolorem.i = {};
nolorem.i.data = {};

nolorem.i.data.images = [];
nolorem.i.data.profileImages = [];

nolorem.init = function(){
    console.log("Nolorem init!");
    // loading random images
    $.holdReady(true);
    $.holdReady(true);

    $.getJSON(
        "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
        {
            tags: "powerlines,pylon",
            tagmode: "any",
            format: "json"

        })
        .complete(function(){
            console.log("Complete called on images")
        })
        .done(function(data){
            console.log("done call");
        })
        .error(function (e){
            console.log("image source failed");
            console.log(e);
            $.holdReady(false);
        })
        .success(function(data){
           console.log("success call");
             $.each( data.items, function( i, item ) {
                var src = item.media.m.replace("_m.jpg","_b.jpg");
                nolorem.i.data.images.push(src);
            });
            $.holdReady(false);
        });

    // loading random images

    $.getJSON(
        "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
        {
            tags: "faces,closeup",
            tagmode: "all",
            format: "json"
        })
        .complete(function(){
            console.log("Complete called on images")
        })
        .done(function(data){
            $.each( data.items, function( i, item ) {
                var src = item.media.m;
                nolorem.i.data.profileImages.push(src);
            });
            $.holdReady(false);
            console.log("profile pictures loaded");
        })
        .error(function (e){
            console.log("profile pix source failed");
            console.log(e);
            $.holdReady(false);
        })
        .success(function(){
           console.log("success call");
            $.holdReady(false);
        });

};



nolorem.title = function(numOfWords){
    var n = numOfWords || nolorem.settings.defaultNumOfWordsInTitle;
    var p = nolorem.paragraph();
    var a = p.split(" ");
    var ap = a.slice(0, n);
    return ap.join(" ");
};

nolorem.paragraph = function(numOfSentences){
    var max = nolorem.i.data.paragraphs.length;
    var rand = Math.floor(Math.random() * max);
    var p = nolorem.i.data.paragraphs[rand];
    if (numOfSentences){
        var i = p.indexOf(".", numOfSentences);
        p = p.substring(0, i);
    }
    return p;
};

nolorem.date = function(){
    var year = 2015;
    var month = nolorem.number(12);
    var day = nolorem.number(31);
    return year + "-" + month + "-" + day;
};

nolorem.time = function(){
    var hour = nolorem.number(24);
    var mins = nolorem.number(59);
    return hour + ":" + mins;
};

nolorem.number = function(max){
    return Math.floor(Math.random() * (max-1) +1);
};

nolorem.name = function(){
    return nolorem.i.data.namesFirst[Math.floor(Math.random() *nolorem.i.data.namesFirst.length)] + " " +
        nolorem.i.data.namesLast[Math.floor(Math.random() *nolorem.i.data.namesLast.length)]
};

nolorem.image = function(){
    var rand = Math.floor(Math.random() * nolorem.i.data.images.length);
    return nolorem.i.data.images[rand];
};

nolorem.profileImage = function(){
    var rand = Math.floor(Math.random() * nolorem.i.data.profileImages.length);
    return nolorem.i.data.profileImages[rand];
};



/**
 * Nolorem internals
 * The functions living beyond .i should not be called directly by users,
 * they are ment for internal use only
 * @type {{}}
 */
nolorem.i.data.paragraphs = [
    "'Ja, det skal v\u00E6re lett gjort,' svarte smeden, og tok den minste hammeren sin, la n\u00F8tten p\u00E5 smiestedet og slo til; men den ville ikke i stykker. S\u00E5 tok han en litt st\u00F8rre hammer, men den var heller ikke tung nok; han tok da en enda st\u00F8rre en, men den gjorde det heller ikke. Men s\u00E5 ble smeden sint, og trev storslegga. 'Jeg skal vel f\u00E5 deg i stykker -!' sa han og slo til alt han orket; og s\u00E5 gikk n\u00F8tten i knas, s\u00E5 halve smietaket fl\u00F8y av, og det braket som om hytta skulle ramle ned.",
    "N\u00E5r verden g\u00E5r meg imot, og det unnlater den sjelden \u00E5 gj\u00F8re n\u00E5r det gis noen leilighet til det, har jeg stetse funnet meg vel ved \u00E5 ta en friluftsvandring som demper for min smule bekymring og uro. Hva som hadde v\u00E6rt i veien denne gang, husker jeg nu ikke mere; men det som st\u00E5r klart for min erindring, er at jeg en sommereftermiddag for noen \u00E5r siden vandret oppover engene p\u00E5 \u00F8stsiden av Akerselven med fiskestangen i h\u00E5nden, forbi Torshaug og Sandaker gjennom Lillohagen til oset ved Maridalsvannet. ",
    "Da jeg kom til Brekke-sagen, var himmelen overskyet; det var alt temmelig m\u00F8rkt, bare ved den nordvestlige rand av synskretsen sto en eplegr\u00F8nn strime, som kastet et dempet lys p\u00E5 sagdammens stille flate. Jeg gikk ut p\u00E5 lensen og gjorde noen kast, men med lite hell. Ikke et pust r\u00F8rte seg; vinden syntes \u00E5 ha g\u00E5tt til hvile, og bare fluene mine brakte det blanke vannet til \u00E5 skjelve.",
    "Nordenfra kom det nedefter elvedraget noen kalde gufs, som lot meg f\u00F8le at jeg var v\u00E5t og trett, og jeg bestemte meg derfor til \u00E5 g\u00E5 inn og hvile meg litt ved ilden i sagstuen. Jeg ropte p\u00E5 gutten, som ennu sto og kopte nedved bredden, og ba ham ta fiskekurven, som jeg hadde satt igjen, og f\u00F8lge efter over lensen, - de glatte stokkene husket, s\u00E5 vannet skvalpet over for hvert skritt jeg tok.\n",
    "'Fisken den tar av,' sa han, med en stemme som trengte igjennom sagduren; 'for slik en gullhake, inte st\u00F8rre enn den der, er det rart \u00E5 f\u00E5 n\u00E5. Men sagflisa den tar tel \u00E5r for \u00E5r, og en kan inte undres over at fisken inte g\u00E5r ut i elva; for lukker \'n p\u00E5 kjeften og skal ta en svelg reint vatn, s\u00E5 f\u00E5r \'n hele kroen full ta sagflis og mukker. Den ford\u00F8mte sagflisa! - Gud forlate meg mi synd like v\u00E6l - det er saga som gir oss br\u00F8d, b\u00E5de meg og mine. Men je blir s\u00E5 arg, n\u00E5r jeg tenker p\u00E5 de sv\u00E6re kolvene je har dradd her i gamle dager.'",
    "Jeg lovet den m\u00F8rkredde f\u00F8lgeskap like til Beierbroen, og det lot til \u00E5gj\u00F8re ham litt roligere. Imidlertid stanset sagen, og to av karene ga seg i ferd med \u00E5 file og skjerpe sagbladene, med en hvinende lyd som gikk til marg og ben - s\u00E5 gjennomtrengende er lyden at den om natten ikke sjelden klinger fra de fjerne sagene helt ned til byen gjennom fosseduren. Den syntes \u00E5 virke ubehagelig p\u00E5 nervene til den m\u00F8rkredde gutten.",
    "Det var opp\u00E5 landet etsteds, og ingen kunne f\u00E5 malt der, for det var s\u00E5 fullt av trollskap. Men s\u00E5 var det en fattigkjerring som var s\u00E5 n\u00F8dig om \u00E5f\u00E5 malt litt en kveld, og hu ba om hun ikke kunne f\u00E5 lov til \u00E5 male der om natten. 'Nei, gudbevares,' sa mannen som eide kverna, 'det g\u00E5r ikke an at du maler der i natt; det kommer nok til \u00E5 sp\u00F8ke b\u00E5de for deg og kverna da,' sa \'n. Men kjerringa sa hun var s\u00E5 n\u00F8dig om \u00E5 f\u00E5 malt, for hun hadde ikke mj\u00E6ls\u00E5a \u00E5 koke velling av og ikke matbeten \u00E5 gi ungene. Ja, til slutt s\u00E5 fikk a lov til \u00E5 g\u00E5 p\u00E5 kverna og male om natten.",
    "Det tykte mannen var b\u00E5de v\u00E6l og bra; og da det lei p\u00E5 kvelden, fekk skreddern n\u00F8kkeln og gikk ne-i kverna - hu var tom enda, for hu var nybygd - og s\u00E5 sette \'n seg midt p\u00E5 golvet, tok krittet sitt og slo en stor ring rundt ikring seg, og rundtom den ringen skreiv \'n faderv\u00E5r, og s\u00E5 var \'n inte redd, om s\u00E5 sj\u00F8lve fanden skulle komm\u00E5. Da det var h\u00F8gstnattes, flaug d\u00F8ra opp med ett, og inn kom det s\u00E5 tjukt med svarte katter at det yrde. Dom var inte seine f\u00F8r dom fekk ei gryte p\u00E5 peisen og til \u00E5 legge p\u00E5 under, s\u00E5 det tok til \u00E5 brase og frase i gryta, som om hun var full av kokandes bek og tj\u00E6re.",
    "Men best som det var, stakk den katta som hadde v\u00F8ri i ferd med \u00E5 velte gryta, labben sin innafor ringen, jussom hu hadde hug til \u00E5 f\u00E5 tak i skreddern. Men da skreddern s\u00E5g det, l\u00F8yste \'n p\u00E5 telgjekniven og heldt \'n ferdig. Rett som det var, slo katta labben innafor ringen att, men i samme blinken hakka skreddern labben ta, og alle kattene ut det forteste dom vant, med ul og med skrik.",
    "Jeg fulgte den vennlige innbydelse. Et b\u00E5l blusset i en stor firkantet kasse av en kakkelovn, kastet et r\u00F8dt, ustadig lys ut i v\u00E6relset gjennom den vid\u00E5pne ovnsd\u00F8ren der jeg tr\u00E5dte inn. Rommet var meget dypt, og m\u00F8blert i gammel stil, med h\u00F8yryggete rulls\u00E6rsstoler og en av disse kanap\u00E9ene som er beregnet p\u00E5 fiskebensskj\u00F8rter og storksnabelstilling. Veggene var prydet med oljemalerier, portretter av stive damer med pudrede koafyrer, av Oldenborgere og andre ber\u00F8mmelige personer i panser og plate eller r\u00F8de kjoler.",
    "De andre sa hun skulle akte seg, men hun ble ved sitt, og da klokken vel kunne v\u00E6re litt over ett, sto hun opp og la under bryggekjelen og hadde p\u00E5 r\u00F2sten. Men hvert \u00F8yeblikk sloknet det under kjelen, og det var liksom \u00E9n kastet brannen ut over skorstenen, men hvem det var, kunne hun ikke se. Hun tok og samlet brannene den ene gangen efter den andre, men det gikk ikke bedre, og r\u00F2sten ville heller ikke g\u00E5. Til sist ble hun kjed av dette, tok en brann og l\u00F8p med b\u00E5de h\u00F8yt og lavt, og svingte den og ropte:",
    "Det var engang en mann og en kone; de hadde en s\u00F8nn og en datter som var tvillinger; og de var s\u00E5 like at de kunne ikke skilles fra hverandre ved annet enn kl\u00E6rne. Gutten kalte de Peik. Han var lite til nytte mens foreldrene levde; for han hadde ikke hug til annet enn \u00E5 gj\u00F8re narr av folk, og han var s\u00E5 full av spikk og sk\u00F8yerstreker at ingen kunne v\u00E6re i fred for ham. Men da de var d\u00F8de, ble det verre enda; han ville ikke ta seg noen ting til; han gjorde bare ende p\u00E5 det som var igjen etter dem, og la seg ut med alle folk. S\u00F8steren strevde og karet alt det hun orket, men det ville ikke monne, og s\u00E5 sa hun til ham hvor galt dette var, at han ikke ville gj\u00F8re noe gagn, og spurte:",
    "Da kongen kom hjem, ba han fremmede og laget til gjestebud; men maten skulle de koke i den nye gryta, og den tok han og satte midt p\u00E5 gulvet. De fremmede trodde kongen ikke var riktig vettug, og gikk der og dyttet til hverandre og lo av ham, og han gikk omkring gryta, og kaklet og kaklet, og sa alt i ett: 'Ja ja, bi bare litt; ja ja, bi bare litt, n\u00E5 koker det snart.' Men det ble ingen kok. S\u00E5 skj\u00F8nte han at Peik hadde v\u00E6rt ute med narrestikkene sine og lurt ham igjen, og s\u00E5 ville han avsted og drepe ham.",
    "Peik hadde vondt for \u00E5 v\u00E6re av med det, men siden det var kongen, fikk han vel ta det. Og s\u00E5 fikk kongen det, og reiste hjem det forteste han kunne, og han var ikke f\u00F8r kommet hjem, f\u00F8r han m\u00E5tte pr\u00F8ve det. Han tok p\u00E5 \u00E5 krangle og kjekle med dronningen og den eldste datteren, og de kjeklet igjen og sa ham imot; men f\u00F8r de visste ordet av det, dro han ut kniven og stakk dem i hjel, og de andre r\u00F8mte stua, s\u00E5 redde ble de.",
    "Kongen gikk og drev p\u00E5 gulvet en stund, og snakket om at det var ikke farlig med liket s\u00E5 lenge det var v\u00E6r i ham, og annet slikt som hadde rent gjennom munnen p\u00E5 Peik, og s\u00E5 fikk han fram hornet, og til \u00E5 tute og bl\u00E5se; men enda han bl\u00E5ste alt det han orket, b\u00E5de den dagen og den andre, s\u00E5 fikk han ikke bl\u00E5st liv i dem; de var d\u00F8de og de ble d\u00F8de, b\u00E5de dronningen og datteren, og han m\u00E5tte koste dem i jorden og holde grav\u00F8l attp\u00E5.",
    "Da pannekaken h\u00F8rte dette, ble den redd, og rett som det var, s\u00E5 vendte den seg av seg selv og ville ut av pannen; men den falt ned igjen p\u00E5 den andre siden, og da den hadde stekt seg litt p\u00E5 den ogs\u00E5, s\u00E5 den ble fastere i fisken, spratt den ut p\u00E5 gulvet og trillet avsted som et hjul ut gjennom d\u00F8ren og bortetter veien.",
    "I det samme s\u00E5 de trollene komme settende, og de var s\u00E5 store og digre at hodene p\u00E5 dem var jevnh\u00F8ye med furutoppene. Men de hadde bare ett \u00F8ye sammen alle tre, og det skiftedes de til \u00E5 bruke; de hadde et hull i pannen, som de la det i, og styrte det med h\u00E5nden; den som gikk foran, han m\u00E5tte ha det, og de andre gikk etter og holdt seg i den f\u00F8rste.",
    "Ja, broren rente f\u00F8re, og trollene dro etter. Imens kom den eldste gutten bak dem og hugg til det bakerste trollet i fotleddet, s\u00E5 det slo opp et f\u00E6lslig skrik, og det f\u00F8rste ble s\u00E5 skremt at det skvatt, og slapp \u00F8yet, og gutten var ikke sen til \u00E5 snappe det. Det var st\u00F8rre enn om en hadde lagt i hop to pottesk\u00E5ler, og s\u00E5 klart var det, at enda det var fullm\u00F8rke natten ble det som lyse dagen da han s\u00E5 igjennom det.",
    "Da trollene h\u00F8rte dette, ble de redde og tok til \u00E5 gi gode ord. De ba noks\u00E5 vakkert at han ville gi dem igjen \u00F8yet, s\u00E5 skulle han f\u00E5 b\u00E5de gull og s\u00F8lv og alt han ville ha. Ja, det syntes gutten var noks\u00E5 bra, men han ville ha gullet og s\u00F8lvet f\u00F8rst, og s\u00E5 sa han at hvis en av dem ville g\u00E5 hjem og hente s\u00E5 mye gull og s\u00F8lv at han og broren fikk posene sine fulle, og gi dem to gode st\u00E5lbuer attp\u00E5, s\u00E5 skulle de f\u00E5 \u00F8yet, men s\u00E5 lenge ville han ha det.",
    "Ja, mannen gikk og tok med \u00F8ksa, men P\u00E5l Andrestua fikk ikke \u00F8ye p\u00E5 ham, f\u00F8r han tok til bens det beste han kunne. Mannen snudde og vendte p\u00E5 plogen og s\u00E5 p\u00E5 den p\u00E5 alle kanter, og da han ikke kunne se noe uferdig p\u00E5 den, s\u00E5 gikk han tilbake igjen, men p\u00E5 veien plukket han opp lefsesmulene gutten hadde sloppet ned. Kjerringa sto en stund og s\u00E5 p\u00E5 dette, og undres p\u00E5 hva det var mannen sanket opp.",
    "Det forekom meg at det skulle mer til \u00E5 skj\u00F8nne det var huldra; men jeg beholdt mine tvil for meg selv; for jeg foruts\u00E5 at innvendinger ikke ville rokke hans tro, men bare lukke munnen p\u00E5 ham. Jeg spurte derfor bare om han ikke oftere hadde sett noe slikt.",
    "Men s\u00E5 var det den gongen je ville tala om, som je s\u00E5g \'n. Je var nettopp vaksen, for det var \u00E5ret etter je hadde g\u00E5tt for presten; det var en l\u00F8rdagsefta, je hadde v\u00F8ri i byen med planker, og v\u00F8ri p\u00E5 en liten kant om dagen. Straks je kom him, gikk je sta og la meg. Da det lei utp\u00E5 kvelden, sto je opp, og da je hadde f\u00E5tt i meg litt mat - mye var det inte, for je var \u00F8r og lei i hue enn\u00E5 - s\u00E5 sa \'n far til meg: 'F\u00F8r du g\u00E5r bort og legger deg igjen, f\u00E5r du gi Blakken nattef\u00F4ret du, for de andre er vel ute og renner etter jentene igjen.'",
    "S\u00E5ledes ble Matthias ved \u00E5 fortelle fort vekk om puslinger, huldrer og nisser, til vi kom ut p\u00E5 Kolsrud\u00E5sen, hvor en ser ut over \u00D8vre-Romerikes store flate, som nu l\u00E5 foran oss i det klare m\u00E5neskinnet. Mot nord l\u00F8ftet Mistberget seg bl\u00E5nende, med enkelte sneflekker; like ned for meg hadde jeg Heni og Gjerdrums kirker; efter dem kunne jeg bestemme min kos, og da jeg dessuten var vel kjent her oppe fra tidligere jakter, sa jeg farvel til min veiviser, og var heldig nok til \u00E5 n\u00E5 frem uten \u00E5 bli ertet av nisse eller fristet av huldren.",
    "Da prinsessen kom, s\u00E5 sa \u00C5se G\u00E5sepike til henne, likesom til begge de andre, at hvis hun hadde hatt noen kj\u00E6reste eller det var noe annet som hun ikke ville prinsen skulle vite, s\u00E5 m\u00E5tte hun ikke tr\u00E5 p\u00E5 den steinen som prinsen hadde framfor sengen sin, 'For den sier ham allting,' sa hun. Prinsessen ble ille ved da hun h\u00F8rte det; men s\u00E5 var hun like ful som begge de andre, og ba \u00C5se om hun ville g\u00E5 istedenfor henne, og legge seg med prinsen om aftenen, og n\u00E5r han hadde sovnet, skulle de bytte om, s\u00E5 han hadde den rette hos seg n\u00E5r det ble lyst om morgenen.",
    "Utp\u00E5 natten satte prinsen en ring p\u00E5 fingeren til \u00C5se, og den var s\u00E5 trang at hun ikke kunne f\u00E5 den av seg igjen; for prinsen kunne nok skj\u00F8nne at det ikke gikk riktig til, og s\u00E5 ville han ha et merke han kunne kjenne igjen den p\u00E5 som var den rette. Da prinsen hadde sovnet, kom prinsessen og jaget \u00C5se ned i g\u00E5sestien igjen, og la seg selv i rommet hennes.",
    "Konen hadde ventet i syv lange og syv brede p\u00E5 at mannen skulle komme og rope hjem til middag; men det varte og det rakk, og ikke ble det til noe. Til sist syntes hun det drygde vel lenge og gikk hjem. Da hun fikk se at kua hang s\u00E5 stygt til, gikk hun bort og hugg av repet med lj\u00E5en; i det samme falt mannen ned igjennom peispipa, og da kjerringa kom inn, sto han p\u00E5 hodet i grautgryten.",
    "P\u00E5 V\u00E6r\u00F8y, rett ved R\u00F8st, bodde en gang en fattig fisker, som hette Isak; han eide ikke annet enn en b\u00E5t og et par geiter, som kjerringen holdt liv i ved fiskeavfall og de gresstr\u00E5ene de kunne sanke omkring p\u00E5 fjellene, men hele hytten hadde han full av sultne barn. Allikevel var han alltid forn\u00F8yd med det slik V\u00E5rherre laget det for ham. Det eneste han anket over var det at han aldri riktig kunne ha fred med naboen sin; det var en rik mann, som syntes han skulle ha allting bedre enn slik en larv som Isak, og s\u00E5 ville han ha ham vekk, s\u00E5 at han kunne f\u00E5 den havnen Isak hadde utenfor hytten sin. ",
    "S\u00E5 ble han hjemsyk, og da han skulle reise, for\u00E6rte kallen ham en ny \u00E5ttring, full av mel og klaverduk og andre nyttige ting. Han Isak sa b\u00E5de takk og \u00E6re for seg, og s\u00E5 sa kallen, at han skulle komme igjen til jektutsetningen; han ville til Bergen med f\u00F8ring i annet stevne, og da kunne Isak bli med og selv selge fisken sin. Ja, det ville Isak gjerne, og s\u00E5 spurte han hva for en kos han skulle holde, n\u00E5r han skulle komme til Utr\u00F8st igjen. 'Beint etter skarven, n\u00E5r den flyr til havs, s\u00E5 holder du rett kos,' sa kallen. 'Lykke p\u00E5 reisa.'",
    "Isak hadde alltid lykken med seg siden den tid. Han skj\u00F8nte vel hvor det kom fra, og han glemte aldri \u00E5 esle litt godt til den som holdt vintervakt, n\u00E5r han satte opp jekten om h\u00F8sten, og hver julekveld lyste det s\u00E5 der skinte ut av jekten, og de h\u00F8rte feler og musikk og latter og st\u00F8y, og det var dans i jektevengen.",
    "Men Askeladden ville og skulle avsted, og han tagg og ba s\u00E5 lenge til kongen m\u00E5tte la ham reise. N\u00E5 hadde kongen ikke annet enn en gammel fillehest \u00E5 la ham f\u00E5, for de seks andre kongss\u00F8nnene og f\u00F8lget deres hadde f\u00E5tt alle de andre hestene han hadde; men det brydde ikke Askeladden seg om; han satte seg opp p\u00E5 den gamle skabbete hesten, han. 'Farvel, far!' sa han til kongen; 'jeg skal nok komme igjen, og kanskje jeg skal ha med meg br\u00F8drene mine ogs\u00E5,' og dermed reiste han.",
    "Da n\u00E5 skrubben hadde ett opp hesten, tok Askeladden bikselet og bandt i kjeften p\u00E5 den, og salen og la p\u00E5 ryggen av den, og n\u00E5 var skrubben blitt s\u00E5 sterk av det den hadde f\u00E5tt i seg, at den satte avsted med kongss\u00F8nnen som ingen ting; s\u00E5 fort hadde han aldri ridd f\u00F8r.",
    "Neste morgen sto risen f\u00E6lt tidlig opp og str\u00F8k til skogs, og aldri f\u00F8r var han av g\u00E5rde, s\u00E5 tok Askeladden og kongsdatteren p\u00E5 \u00E5 lete under d\u00F8rhellen etter hjertet hans; men alt det de grov og lette, s\u00E5 fant de ikke noe. 'Denne gangen har han lurt oss,' sa prinsessen, 'men vi f\u00E5r vel pr\u00F8ve ham enda en gang.' S\u00E5 sanket hun alle de vakreste blomster hun kunne finne, og str\u00F8dde rundt om d\u00F8rhellen - den hadde de lagt slik den skulle ligge; og da det led mot den tiden de ventet risen hjem, kr\u00F8p Askeladden under sengen igjen.",
    "Om morgenen tidlig, det var ikke gr\u00E5lyst enn\u00E5, str\u00F8k risen til skogs igjen. 'Ja, n\u00E5 f\u00E5r jeg avsted, jeg ogs\u00E5,' sa Askeladden; 'bare jeg kunne finne veien!' Han sa farvel til kongsdatteren s\u00E5 lenge, og da han kom utenfor riseg\u00E5rden, sto skrubben der enn\u00E5 og ventet. Til ham fortalte han det som hadde hendt inne hos risen, og sa at n\u00E5 ville han avsted til br\u00F8nnen i kirken, bare han visste veien. S\u00E5 ba skrubben ham sette seg p\u00E5 ryggen hans, for han skulle nok finne veien, sa han, og s\u00E5 bar det i vei s\u00E5 det suste om dem, over heier og \u00E5ser, over berg og dal",
    "Da han s\u00E5 var blitt av med risen, red Askeladden tilbake til riseg\u00E5rden igjen p\u00E5 skrubben; der sto alle seks br\u00F8drene hans lys levende med brudene sine, og s\u00E5 gikk Askeladden inn i berget etter sin brud, og s\u00E5 reiste de alle sammen hjem til kongsg\u00E5rden. Da ble det vel glede p\u00E5 den gamle kongen, da alle syv s\u00F8nnene hans kom tilbake, med hver sin brud. 'Men den deiligste av alle prinsessene er bruden til Askeladden likevel,' sa kongen, 'og han skal sitte \u00F8verst ved bordet med bruden sin.'"
];

nolorem.i.data.namesFirst = [
    "Espen",
    "Lars",
    "Gj\u00F8ran",
    "Jorun",
    "Kari",
    "Marvin",
    "Tarje",
    "Martin",
    "Kristian",
    "Kristin",
    "Eira",
    "Ingrid",
    "Julie",
    "Lisa",
    "Tora",
    "Eirik",
    "Noralf",
    "Helge",
    "Lars Olav",
    "Anders",
    "Audun",
    "Ingun",
    "Anita",
    "Marie",
    "Mattis",
    "G\u00F8ril",
    "Mari",
    "Camilla",
    "Marit"
];

nolorem.i.data.namesLast = [
    "Hjert\u00F8",
    "Bremseth",
    "L\u00F8nne",
    "Lillehaug",
    "Seln\u00E6s",
    "Wulff",
    "St\u00F8rseth",
    "Pettersen",
    "Andersen",
    "Skar",
    "Myrhaug",
    "Moen",
    "Olsen",
    "Wadseth",
    "Wesenlund",
    "Solberg",
    "Maurstad",
    "Efskin",
    "Prange",
    "Forbord",
    "R\u00F8e",
    "Rinden",
    "Fossen",
    "Standal",
    "Dalum",
    "Storr\u00F8",
    "L\u00F8ken",
    "Krokan",
    "Evensen",
    "Leknes"

];



