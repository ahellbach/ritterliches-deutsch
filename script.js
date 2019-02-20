function start() {
  let inputStr = document.getElementById("inputTA").value;
  translateRitter(inputStr);
}


function translateRitter(inputStr) {
  //Häufige Adjektive ersetzen
  var mapObj = {
    "tt": "th",
    "Jahr": "Annum",
    "Prozent": "Hundertste",
    "Million": "Batzen",
    "Euro": "Gulden",
    "Zeit": "Stund'",
    "Frau": "Dirne",
    "Mensch": "Bauer",
    "Mann": "Ritter",
    "Land": "Reich",
    "Deutschland": "Vaterland",
    "Kind": "Jüngling",
    "USA": "Angelsachsen",
    "Stadt": "Dorf",
    "Leben": "Lebtag",
    "Vater": "Erzeuger",
    "Haus": "Schuppen",
    "Tür": "Pforte",
    "neu": "gar neu",
    "ander": "ganz und gar ander",
    "groß": "unermesslich",
    "viel": "zahllos",
    "gut": "gar entzückend",
    "weit": "fern",
    "klein": "gar klein",
    "alt": "tattrig",
    "hoch": "gar hoch",
    "jung": "gar jung",
    "nahe": "gar nahe",
    "lang": "gar lang",
    "wenig": "kümmerlich",
    "ganz": "vollkommen",
    "schwarz": "kohlpechrabenschwarz",
  };

  var re = new RegExp(Object.keys(mapObj).join("|"), "g");
  inputStr = inputStr.replace(re, function(matched) {
    return mapObj[matched];
  });


  const oldChars = ['i', 'j', 'ü', 'I', 'J', 'Ü', 'f', 'w', 'F', 'W'/*, 'u', 'U'*/];
  const newChars = ['y', 'y', 'y', 'Y', 'Y', 'Y', 'v', 'v', 'V', 'V'/*, 'v', 'V'*/];
  let resultArr = [];
  let replaced;

  //oldChars durch newChars ersetzen
  for (let i = 0; i < inputStr.length; i++) {
    replaced = false;

    for (let j = 0; j < oldChars.length; j++) {
      if (inputStr[i] === oldChars[j]) {
        replaced = true;
        resultArr.push(newChars[j]);
      }
    }
    if (replaced === false) {
      resultArr.push(inputStr[i])
    }
  }
  let inputCharsReplacedStr = resultArr.join("");

  resultArr = [];

  //Alle Substantive (nicht am Satzanfang) + "e"
  let inputWoerter = inputCharsReplacedStr.split(" ");
  for (let i = 0; i < inputWoerter.length; i++) {
    let regexSubstantiv = new RegExp(/([A-ZÄÖÜ]+[a-zäöüß]{3,})/); //Fängt mit Großbuchstabe an + >=3 weitere Buchstaben
    let regexSatzzeichen = new RegExp(/[.;,?!()]+/); //Satzende
    if (inputWoerter[i].match(regexSubstantiv) && !inputWoerter[i][(inputWoerter[i].length)-1].match(regexSatzzeichen)) {
      inputWoerter[i] = inputWoerter[i] + "e";
    }
  }

  for (let i = 0; i < inputWoerter.length; i++) {
    if (!isNaN(inputWoerter[i])) {
      if (inputWoerter[i] > 0 && inputWoerter[i] % 1 === 0) {
        //Keine Dezimalstelle, > 0
        inputWoerter[i] = romanize(inputWoerter[i]);
      }
    }
  }

  //römische Zahlen
  function romanize (num) {
    if (isNaN(num))
      return NaN;
    var digits = String(+num).split(""),
    key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
      "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
      "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
    roman = "",
    i = 3;
    while (i--)
      roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
  }

  //Frei ersetzen vor Ausgabe; neue Rechtschreibregeln beachten
  let outputStr = inputWoerter.join(" ")
  outputStr = outputStr.replace(/ yst/g, " sey");
  outputStr = outputStr.replace(/ bla/g, " blub");

  //Ausgabe
  document.getElementById("outputTA").value = outputStr;
}
