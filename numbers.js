$(document).ready(function () {

  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=Lax";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    let fromlang = getCookie("fromlang");
    let tolang = getCookie("tolang");
    if (fromlang != "" || tolang != "") {
        console.log("Cookie was already set: " + fromlang + " - " + tolang);
    } else {
        setCookie("fromlang", "german", 365);
        setCookie("tolang", "english", 365);
        alert("Cookie now set: german - english");
    }
}                  

$(document).on('click', '.language_select_button', function () {
    const language_split = $(this).text().split("-");
    const language_split_fromlang = language_split[0].toLowerCase();
    const language_split_tolang = language_split[1].toLowerCase();
    // alert(language_split_fromlang + language_split_tolang);
    setCookie("fromlang", language_split_fromlang, 365);
    setCookie("tolang", language_split_tolang, 365);
    alert("Cookie was changed to the values: " + language_split_fromlang + "-" + language_split_tolang);
});

// Always check if a Cookie is set and set the global vars
checkCookie();
var fromlang_cookie = getCookie("fromlang");
var tolang_cookie = getCookie("tolang");
$('#language_select').html(fromlang_cookie.toUpperCase() + " - " + tolang_cookie.toUpperCase());

// TESTING THE MODAL BOX
// $("#all_correct_div").css("display", "block");

  function convertNumberToText(number) {
    const germanDigits = [
      'null', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun',
      'zehn', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn'
    ];

    const germanTens = [
      '', 'zehn', 'zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig', 'achtzig', 'neunzig'
    ];

    const englishDigits = [
      'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
      'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
    ];

    const englishTens = [
      '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
    ];

    const slovenianDigits = [
      'nič', 'ena', 'dva', 'tri', 'štiri', 'pet', 'šest', 'sedem', 'osem', 'devet',
      'deset', 'enajst', 'dvanajst', 'trinajst', 'štirinajst', 'petnajst', 'šestnajst', 'sedemnajst', 'osemnajst', 'devetnajst'
    ];

    const slovenianTens = [
      '', 'deset', 'dvajset', 'trideset', 'štirideset', 'petdeset', 'šestdeset', 'sedemdeset', 'osemdeset', 'devetdeset'
    ];
    
    const frenchDigits = [
      'zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf',
      'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'
    ];

    const frenchTens = [
      '', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingt', 'quatre-vingt-dix'
    ];

    const italianDigits = [
      'zero', 'uno', 'due', 'tre', 'quattro', 'cinque', 'sei', 'sette', 'otto', 'nove',
      'dieci', 'undici', 'dodici', 'tredici', 'quattordici', 'quindici', 'sedici', 'diciassette', 'diciotto', 'diciannove'
    ];

    const italianTens = [
      '', '', 'venti', 'trenta', 'quaranta', 'cinquanta', 'sessanta', 'settanta', 'ottanta', 'novanta'
    ];

    const turkishDigits = [
      'sıfır', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz',
      'on', 'on bir', 'on iki', 'on üç', 'on dört', 'on beş', 'on altı', 'on yedi', 'on sekiz', 'on dokuz'
    ];

    const turkishTens = [
      '', '', 'yirmi', 'otuz', 'kırk', 'elli', 'altmış', 'yetmiş', 'seksen', 'doksan'
    ];

    const dutchDigits = [
      'nul', 'een', 'twee', 'drie', 'vier', 'vijf', 'zes', 'zeven', 'acht', 'negen',
      'tien', 'elf', 'twaalf', 'dertien', 'veertien', 'vijftien', 'zestien', 'zeventien', 'achttien', 'negentien'
    ];

    const dutchTens = [
      '', '', 'twintig', 'dertig', 'veertig', 'vijftig', 'zestig', 'zeventig', 'tachtig', 'negentig'
    ];

    const spanishDigits = [
      'cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve',
      'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'
    ];

    const spanishTens = [
      '', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'
    ];

    function getGermanText(number) {
      if (number < 20) {
        return germanDigits[number];
      } else if (number % 10 === 0) {
        return germanTens[Math.floor(number / 10)];
      } else {
        return germanDigits[number % 10] + 'und' + germanTens[Math.floor(number / 10)];
      }
    }

    function getEnglishText(number) {
      if (number < 20) {
        return englishDigits[number];
      } else if (number % 10 === 0) {
        return englishTens[Math.floor(number / 10)];
      } else {
        return englishTens[Math.floor(number / 10)] + englishDigits[number % 10];
      }
    }

    function getSlovenianText(number) {
      if (number < 20) {
        return slovenianDigits[number];
      } else if (number % 10 === 0) {
        return slovenianTens[Math.floor(number / 10)];
      } else {
        return slovenianDigits[number % 10] + 'in' + slovenianTens[Math.floor(number / 10)];
      }
    }

    function getFrenchText(number) {
      if (number < 20) {
        return frenchDigits[number];
      } else if (number < 70) {
        const ones = number % 10 === 1 ? '' : frenchDigits[number % 10];
        const tens = frenchTens[Math.floor(number / 10)];
        return tens + (number % 10 === 1 ? ' et ' : ' ') + ones;
      } else if (number < 80) {
        return 'soixante-' + getFrenchText(number % 20);
      } else {
        return 'quatre-vingt-' + getFrenchText(number % 20);
      }
    }

    function getItalianText(number) {
      if (number < 20) {
        return italianDigits[number];
      } else if (number % 10 === 1 || number % 10 === 8) {
        return italianTens[Math.floor(number / 10)] + ' ' + italianDigits[number % 10];
      } else {
        return italianTens[Math.floor(number / 10)] + italianDigits[number % 10];
      }
    }

    function getTurkishText(number) {
      if (number < 20) {
        return turkishDigits[number];
      } else if (number % 10 === 1 || number % 10 === 8) {
        return turkishTens[Math.floor(number / 10)] + ' ' + turkishDigits[number % 10];
      } else {
        return turkishTens[Math.floor(number / 10)] + turkishDigits[number % 10];
      }
    }

    function getDutchText(number) {
      if (number < 20) {
        return dutchDigits[number];
      } else if (number < 100) {
        const ones = number % 10 === 0 ? '' : dutchDigits[number % 10];
        const tens = dutchTens[Math.floor(number / 10)];
        return tens + (number % 10 === 0 ? '' : 'en') + ones;
      } else {
        return dutchDigits[Math.floor(number / 100)] + 'honderd ' + getDutchText(number % 100);
      }
    }

    function getSpanishText(number) {
      if (number < 20) {
        return spanishDigits[number];
      } else if (number < 30) {
        return 'veinti' + spanishDigits[number % 10];
      } else if (number % 10 === 0) {
        return spanishTens[Math.floor(number / 10)];
      } else {
        return spanishTens[Math.floor(number / 10)] + ' y ' + spanishDigits[number % 10];
      }
    }

    switch(getCookie("tolang").toUpperCase()) {
      case 'GERMAN':
          return getGermanText(number);
      case 'ENGLISH':
          return getEnglishText(number);
      case 'SLOVENIAN':
          return getSlovenianText(number);
      case 'SPANISH':
          return getSpanishText(number);
      case 'FRENCH':
          return getFrenchText(number);
      case 'ITALIAN':
          return getDutchText(number);
      case 'DUTCH':
          return getItalianText(number);
      case 'TURKISH':
          return getTurkishText(number);
      default:
        return getEnglishText(number);
    }
  }

  $('#numpad_input').val("");
  $('#correct_div').css('display','none');
  $('#wrong_div').css('display','none');
  $('#numpad_next').css('display','none');

  //create random number
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  var randomNum = getRandomNumber(0, 99);
  //convert this number to text and add it to the output table
  var numberAsText = convertNumberToText(randomNum);
  $('#numpad_output').val(numberAsText);
  
  //append number to input text field
  $('.numpad_number').click(function(e) {
    e.preventDefault();
    $('#numpad_input').val($('#numpad_input').val() + $(this).val());
    var audioSrc  = '../sounds/beep.mp3';
    var audio = new Audio(audioSrc);
    audio.play();
  });

  //check function
  $('#numpad_submit').click(function(e) {
    e.preventDefault();
    var inputAsText = $('#numpad_output').val();
    var inputAsNumber = $('#numpad_input').val();
    var inputAsNumverToText = convertNumberToText(inputAsNumber);
    // alert(inputAsText + ' - ' + inputAsNumber + ' - ' + inputAsNumverToText);

    if(inputAsText == inputAsNumverToText) {
      $('#correct_div').css('display','block');
      $('#numpad_next').css('display','block');
    } else {
      $('#wrong_div').css('display','block');
      $('#numpad_next').css('display','block');
    }
  });

  $('#numpad_reset').click(function(e) {
    e.preventDefault();
    $('#numpad_input').val("");
  });

  $('#numpad_next').click(function(e) {
    location.reload();
  });

});