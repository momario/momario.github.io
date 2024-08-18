  function speech_text(text) {
    let language;
    switch (getCookie("langto").toUpperCase()) {
      case 'GERMAN':
        language = 'de-de';
        break;
      case 'ENGLISH':
        language = 'en-us';
        break;
      case 'SLOVENIAN':
        language = 'sl-si';
        break;
      case 'SPANISH':
        language = 'es-es';
        break;
      case 'FRENCH':
        language = 'fr-fr';
        break;
      case 'ITALIAN':
        language = 'it-it';
        break;
      case 'DUTCH':
        language = 'nl-nl';
        break;
      case 'TURKISH':
        language = 'tr-tr';
        break;
      case 'KURDISH':
        language = 'tr-tr';
        break;
      default:
        language = 'en-us';
    }
    var apiKey = '83a7a15df9bb440380724e35be5a7e68';
    var audioSrc = 'http://api.voicerss.org/?key=' + apiKey + '&hl=' + language + '&c=MP3&f=44khz_16bit_stereo&src=' + encodeURIComponent(text);
    var audio = new Audio(audioSrc);
    audio.play();
  }
  
  //['GERMAN', 'ENGLISH', 'SLOVENIAN','ITALIAN', 'DUTCH', 'FRENCH', 'SPANISH', 'TURKISH', 'KURDISH']
  function getLanguageIndex(language) {
    let languageIndex;
    switch (language) {
      case "GERMAN":
        languageIndex = 0;
        break;
      case "ENGLISH":
        languageIndex = 1;
        break;
      case "SLOVENIAN":
        languageIndex = 2;
        break;
      case "ITALIAN":
        languageIndex = 3;
        break;
      case "DUTCH":
        languageIndex = 4;
        break;
      case "FRENCH":
        languageIndex = 5;
        break;
      case "SPANISH":
        languageIndex = 6;
        break;
      case "TURKISH":
        languageIndex = 7;
        break;
      case "KURDISH":
        languageIndex = 8;
        break;
      default:
        languageIndex = 0;
    }
    return languageIndex;
  }

  function getCookieString() {
    let langfrom = getCookie("langfrom");
    let langto = getCookie("langto");
    return langfrom + "<hr>" + langto;
  }

  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  function getCookie(name) {
    let cookieArr = document.cookie.split(";");
    for (let i = 0; i < cookieArr.length; i++) {
      let cookiePair = cookieArr[i].trim();
      if (cookiePair.startsWith(name + "=")) {
        return cookiePair.substring(name.length + 1);
      }
    }
    return null;
  }

  function resetCookie() {
    setCookie("langfrom", "GERMAN", 7);
    setCookie("langto", "ENGLISH", 7);
  }