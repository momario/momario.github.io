function getRandomNumber() {
  return Math.floor(Math.random() * 100);
}

function checknumber(number, randomnumber) {
  if (number == randomnumber) {
    return true;
  }
  return false;
}

function showrandomnumberastext(langtocookie, randomnumber) {
  var convertedNumber;
  switch (langtocookie) {
    case "GERMAN":
      convertedNumber = convertNumberToGerman(randomnumber);
      break;
    case "ENGLISH":
      convertedNumber = convertNumberToEnglish(randomnumber);
      break;
    case "SLOVENIAN":
      convertedNumber = convertNumberToSlovenian(randomnumber);
      break;
    case "ITALIAN":
      convertedNumber = convertNumberToItalian(randomnumber);
      break;
    case "DUTCH":
      convertedNumber = convertNumberToDutch(randomnumber);
      break;
    case "FRENCH":
      convertedNumber = convertNumberToFrench(randomnumber);
      break;
    case "SPANISH":
      convertedNumber = convertNumberToSpanish(randomnumber);
      break;
    case "TURKISH":
      convertedNumber = convertNumberToTurkish(randomnumber);
      break;
    case "KURDISH":
      convertedNumber = convertNumberToKurdish(randomnumber);
      break;
    case "POLISH":
      convertedNumber = convertNumberToPolish(randomnumber);
      break;
    default:
      convertedNumber = convertNumberToGerman(randomnumber);
  }
  return convertedNumber;
}

// Function to create and play a DTMF tone
function playSound(number) {
  const frequencies = {
    '1': [697, 1209],
    '2': [697, 1336],
    '3': [697, 1477],
    '4': [770, 1209],
    '5': [770, 1336],
    '6': [770, 1477],
    '7': [852, 1209],
    '8': [852, 1336],
    '9': [852, 1477],
    '0': [941, 1336]
  };

  const [frequency1, frequency2] = frequencies[number] || [0, 0];

  if (frequency1 && frequency2) {
    const audioContext = new(window.AudioContext || window.webkitAudioContext)();
    const oscillator1 = audioContext.createOscillator();
    const oscillator2 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator1.type = 'sine';
    oscillator2.type = 'sine';

    oscillator1.frequency.setValueAtTime(frequency1, audioContext.currentTime);
    oscillator2.frequency.setValueAtTime(frequency2, audioContext.currentTime);

    let volume = 0.1;
    // Set the gain (volume)
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);

    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator1.start();
    oscillator2.start();

    oscillator1.stop(audioContext.currentTime + 0.2); // duration of the tone
    oscillator2.stop(audioContext.currentTime + 0.2); // duration of the tone
  }
}

function convertNumberToGerman(num) {
  const ones = ["null", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun"];
  const ones2 = ["null", "ein", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun"];
  const teens = ["zehn", "elf", "zwölf", "dreizehn", "vierzehn", "fünfzehn", "sechzehn", "siebzehn", "achtzehn", "neunzehn"];
  const tens = ["", "zehn", "zwanzig", "dreißig", "vierzig", "fünfzig", "sechzig", "siebzig", "achtzig", "neunzig"];

  if (num < 10) {
    return ones[num];
  } else if (num < 20) {
    return teens[num - 10];
  } else {
    let ten = Math.floor(num / 10);
    let one = num % 10;
    if (one === 0) {
      return tens[ten];
    } else {
      return ones2[one] + "und" + tens[ten];
    }
  }
}

function convertNumberToEnglish(num) {
  const ones = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  const teens = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const tens = ["", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

  if (num < 10) {
    return ones[num];
  } else if (num < 20) {
    return teens[num - 10];
  } else {
    let ten = Math.floor(num / 10);
    let one = num % 10;
    if (one === 0) {
      return tens[ten];
    } else {
      return tens[ten] + "-" + ones[one];
    }
  }
}

function convertNumberToSlovenian(num) {
  const ones = ["nič", "ena", "dva", "tri", "štiri", "pet", "šest", "sedem", "osem", "devet"];
  const teens = ["deset", "enajst", "dvanajst", "trinajst", "štirinajst", "petnajst", "šestnajst", "sedemnajst", "osemnajst", "devetnajst"];
  const tens = ["", "deset", "dvajset", "trideset", "štirideset", "petdeset", "šestdeset", "sedemdeset", "osemdeset", "devetdeset"];

  if (num < 10) {
    return ones[num];
  } else if (num < 20) {
    return teens[num - 10];
  } else {
    let ten = Math.floor(num / 10);
    let one = num % 10;
    if (one === 0) {
      return tens[ten];
    } else {
      return ones[one] + "in" + tens[ten];
    }
  }
}

function convertNumberToItalian(num) {
  const ones = ["zero", "uno", "due", "tre", "quattro", "cinque", "sei", "sette", "otto", "nove"];
  const teens = ["dieci", "undici", "dodici", "tredici", "quattordici", "quindici", "sedici", "diciassette", "diciotto", "diciannove"];
  const tens = ["", "dieci", "venti", "trenta", "quaranta", "cinquanta", "sessanta", "settanta", "ottanta", "novanta"];

  if (num < 10) {
    return ones[num];
  } else if (num < 20) {
    return teens[num - 10];
  } else {
    let ten = Math.floor(num / 10);
    let one = num % 10;
    if (one === 0) {
      return tens[ten];
    } else {
      return tens[ten] + (one === 1 || one === 8 ? "" : "i") + ones[one];
    }
  }
}

function convertNumberToDutch(num) {
  const ones = ["nul", "een", "twee", "drie", "vier", "vijf", "zes", "zeven", "acht", "negen"];
  const teens = ["tien", "elf", "twaalf", "dertien", "veertien", "vijftien", "zestien", "zeventien", "achttien", "negentien"];
  const tens = ["", "tien", "twintig", "dertig", "veertig", "vijftig", "zestig", "zeventig", "tachtig", "negentig"];

  if (num < 10) {
    return ones[num];
  } else if (num < 20) {
    return teens[num - 10];
  } else {
    let ten = Math.floor(num / 10);
    let one = num % 10;
    if (one === 0) {
      return tens[ten];
    } else {
      return ones[one] + "en" + tens[ten];
    }
  }
}

function convertNumberToFrench(num) {
  const ones = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"];
  const teens = ["dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"];
  const tens = ["", "dix", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante-dix", "quatre-vingt", "quatre-vingt-dix"];

  if (num < 10) {
    return ones[num];
  } else if (num < 20) {
    return teens[num - 10];
  } else {
    let ten = Math.floor(num / 10);
    let one = num % 10;
    if (ten === 7 || ten === 9) {
      return tens[ten - 1] + "-" + teens[one];
    } else if (one === 0) {
      return tens[ten];
    } else if (ten === 8 && one === 1) {
      return "quatre-vingt-un";
    } else {
      return tens[ten] + (one === 1 ? "-et-" : "-") + ones[one];
    }
  }
}

function convertNumberToSpanish(num) {
  const ones = ["cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];
  const teens = ["diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve"];
  const tens = ["", "diez", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];

  if (num < 10) {
    return ones[num];
  } else if (num < 20) {
    return teens[num - 10];
  } else {
    let ten = Math.floor(num / 10);
    let one = num % 10;
    if (one === 0) {
      return tens[ten];
    } else {
      return tens[ten] + " y " + ones[one];
    }
  }
}

function convertNumberToTurkish(num) {
  const ones = ["sıfır", "bir", "iki", "üç", "dört", "beş", "altı", "yedi", "sekiz", "dokuz"];
  const teens = ["on", "on bir", "on iki", "on üç", "on dört", "on beş", "on altı", "on yedi", "on sekiz", "on dokuz"];
  const tens = ["", "on", "yirmi", "otuz", "kırk", "elli", "altmış", "yetmiş", "seksen", "doksan"];

  if (num < 10) {
    return ones[num];
  } else if (num < 20) {
    return teens[num - 10];
  } else {
    let ten = Math.floor(num / 10);
    let one = num % 10;
    if (one === 0) {
      return tens[ten];
    } else {
      return tens[ten] + " " + ones[one];
    }
  }
}

function convertNumberToKurdish(num) {
  const ones = ["sifir", "yek", "du", "sê", "çwar", "pênc", "şeş", "heft", "heşt", "neh"];
  const teens = ["deh", "yanzdeh", "dwanzdeh", "sêzdeh", "çwardeh", "panzdeh", "şazdeh", "hevdeh", "hêjdeh", "nozdeh"];
  const tens = ["", "deh", "bîst", "sî", "çil", "pêncî", "şêst", "heftê", "heştê", "nod"];

  if (num < 10) {
    return ones[num];
  } else if (num < 20) {
    return teens[num - 10];
  } else {
    let ten = Math.floor(num / 10);
    let one = num % 10;
    if (one === 0) {
      return tens[ten];
    } else {
      return tens[ten] + " û " + ones[one];
    }
  }
}

function convertNumberToPolish(num) {
  const ones = ["zero", "jeden", "dwa", "trzy", "cztery", "pięć", "sześć", "siedem", "osiem", "dziewięć"];
  const teens = ["dziesięć", "jedenaście", "dwanaście", "trzynaście", "czternaście", "piętnaście", "szesnaście", "siedemnaście", "osiemnaście", "dziewiętnaście"];
  const tens = ["", "dziesięć", "dwadzieścia", "trzydzieści", "czterdzieści", "pięćdziesiąt", "sześćdziesiąt", "siedemdziesiąt", "osiemdziesiąt", "dziewięćdziesiąt"];

  if (num < 10) {
    return ones[num];
  } else if (num < 20) {
    return teens[num - 10];
  } else {
    let ten = Math.floor(num / 10);
    let one = num % 10;
    if (one === 0) {
      return tens[ten];
    } else {
      return tens[ten] + " " + ones[one];
    }
  }
}