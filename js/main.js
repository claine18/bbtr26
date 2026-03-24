document.addEventListener('DOMContentLoaded', function () {
  // index page buttons (optional)
  const yesButton = document.getElementById('yes-button');
  const noButton = document.getElementById('no-button');
  if (yesButton) {
    yesButton.addEventListener('click', function () { window.location.href = 'rsvp.html'; });
  }
  if (noButton) {
    noButton.addEventListener('click', function () { /* keep if you need behavior on index NO */ });
  }

  // RSVP page behavior
  var yesBtn = document.getElementById('yesBtn');
  var noBtn = document.getElementById('noBtn');
  var nameInput = document.getElementById('name');
  var rsvpMsg = document.getElementById('rsvpMsg');
  var noMsg = document.getElementById('noMsg');

  if (yesBtn) {
    yesBtn.addEventListener('click', function () {
      var name = nameInput ? nameInput.value.trim() : '';
      if (!name) {
        if (rsvpMsg) { rsvpMsg.style.display = 'block'; rsvpMsg.textContent = 'Please enter your name before continuing.'; }
        return;
      }
      localStorage.setItem('rsvp_name', name);
      localStorage.setItem('rsvp_coming', 'yes');
      window.location.href = 'details.html';
    });
  }

  if (noBtn) {
    noBtn.addEventListener('click', function () {
      var name = nameInput ? nameInput.value.trim() : '';
      if (!name) {
        if (rsvpMsg) { rsvpMsg.style.display = 'block'; rsvpMsg.textContent = 'Please enter your name before continuing.'; }
        if (nameInput) nameInput.focus();
        return;
      }
      localStorage.setItem('rsvp_name', name);
      localStorage.setItem('rsvp_coming', 'no');

      if (rsvpMsg) rsvpMsg.style.display = 'none';
      if (noMsg) {
        noMsg.style.display = 'block';
        noMsg.textContent = ':((( — answer saved!';
      }

      noBtn.setAttribute('aria-pressed','true');
      if (yesBtn) yesBtn.disabled = true;
      noBtn.disabled = true;
      if (yesBtn) yesBtn.style.opacity = '.6';
      noBtn.style.opacity = '.6';

      // brief pause so user sees the message, then go to thanks page
      setTimeout(function () {
        window.location.href = 'thanks.html';
      }, 800);
    });
  }

  // Details page behavior + Formspree submit
  var detailsForm = document.getElementById('detailsForm');
  var welcomeName = document.getElementById('welcomeName');
  var hiddenName = document.getElementById('hiddenName');
  var hiddenComing = document.getElementById('hiddenComing');
  var detailsMsg = document.getElementById('detailsMsg');

//   if (welcomeName) {
//     var storedName = localStorage.getItem('rsvp_name') || '';
//     welcomeName.textContent = storedName ? ('Salut ' + storedName + ' — dis-nous:') : 'Quelques questions:';
//     if (hiddenName) hiddenName.value = storedName;
//     if (hiddenComing) hiddenComing.value = localStorage.getItem('rsvp_coming') || 'yes';
//   }

  if (detailsForm) {
    detailsForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // populate hidden fields from localStorage
      var name = localStorage.getItem('rsvp_name') || '';
      var coming = localStorage.getItem('rsvp_coming') || 'yes';
      if (hiddenName) hiddenName.value = name;
      if (hiddenComing) hiddenComing.value = coming;

      // store staff/perform locally as well
      var staff = document.getElementById('staff') ? document.getElementById('staff').value : '';
      var perform = document.getElementById('perform') ? document.getElementById('perform').value : '';
      localStorage.setItem('rsvp_staff', staff);
      localStorage.setItem('rsvp_perform', perform);

      // collect form data
      var fd = new FormData(detailsForm);

      // your Formspree form id (already set in file you shared)
      var url = 'https://formspree.io/f/xjgpbwej';

      fetch(url, {
        method: 'POST',
        body: fd,
        headers: { 'Accept': 'application/json' }
      }).then(function (res) {
        if (res.ok) {
          // successful submit -> thanks page will show "Yayyy"
          window.location.href = 'thanks.html';
        } else {
          return res.json().then(function (data) {
            throw new Error((data && data.error) || 'Send failed');
          });
        }
      }).catch(function (err) {
        if (detailsMsg) {
          detailsMsg.style.display = 'block';
          detailsMsg.textContent = 'Error sending form — try again later.';
        }
        console.error(err);
      });
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  // --- translations ---
  var T = {
    en: {
      siteTitle: 'BABETTERIE 2026',
      dates: '14-15-16 AUG',
      tagline: 'In 2026, the BBTR is back to please you. Get ready for three days of DJ sets and live music and the famous workshops.',
      locationPrefix: '🧚 We meet in',
      locationPlace: 'Belhade',
      locationHref: 'https://maps.app.goo.gl/4o1uAt9axGkgtMzc7',
      locationSuffix: ', accessible by car or nearest train station ',
      stationText: 'Ychoux',
      stationHref: 'https://www.sncf-connect.com/train/france/nouvelle-aquitaine/ychoux',
      priceLine: '🌾 €80 - food, drinks and music',
      campingLine: '🦉 Camping on site (bring your tent)',
      nameLabel: 'Your name:',
      comingLabel: 'Are you coming?',
      yes: 'YES',
      no: 'NO',
      pleaseEnterName: 'Please enter your name before continuing.',
      savedNo: ':((( — answer saved!',
      savedYes: '🥰🥰🥰🥰🥰 Cant wait !!!!!',
      staffLabel: '👯‍♀️ Do you want to be staff (help for one week before and 2 days after, discounted tickets and amazing vibes)?',
      performLabel: '🌀 Do you want to perform or make a workshop?',
      submit: 'Submit',
      detailsTitle: 'A few questions',
      thanksTitle: 'Arigato',
      backHome: 'Back to home',
      areYouReady: 'Are you ready?',
    },
    fr: {
      siteTitle: 'BABETTERIE 2026',
      dates: '14-15-16 AOUT',
      tagline: "En 2026, la BBTR revient en force. Prépare toi pour trois jours d'ateliers, DJ sets et concert live.",
      locationPrefix: '🧚 RDV à ',
     locationHref: 'https://maps.app.goo.gl/4o1uAt9axGkgtMzc7',
     locationSuffix: ', accessible en voiture ou gare la + proche ',
     stationText: 'Ychoux',
     stationHref: 'https://www.sncf-connect.com/train/france/nouvelle-aquitaine/ychoux',
      priceLine: '🌾 80 € - food, drinks and music',
      campingLine: '🦉 Camping sur place (apporte ta tente)',
      nameLabel: 'Ton nom:',
      comingLabel: 'Tu viens?',
      yes: 'OUI',
      no: 'NON',
      pleaseEnterName: "Merci d'entrer ton nom avant de continuer.",
      savedNo: ':((( — réponse enregistrée!',
      savedYes: '🥰🥰🥰🥰🥰 Cant wait !!!!!',
      staffLabel: "👯‍♀️ Veux tu etre membre du STAFF (aider pendant une semaine avant et deux jours après, billets à tarif réduit et beaucoup d'amour!!!) ?",
      performLabel: "🌀 Souhaites-tu jouer d'un instrument/set ou animer un atelier ?",
      submit: 'Envoyer',
      detailsTitle: 'Quelques questions',
      thanksTitle: 'Arigato!',
      backHome: "Retour à l'accueil",
      areYouReady: 'Are you ready?',
    }
  };

  function setLanguage(lang) {
    if (!T[lang]) lang = 'fr';
    document.documentElement.lang = lang;
    localStorage.setItem('site_lang', lang);
    var t = T[lang];

    // header / common
    var el = document.getElementById('siteTitle'); if (el) el.textContent = (t.siteTitle !== undefined) ? t.siteTitle : el.textContent;
    el = document.getElementById('dates'); if (el) el.textContent = (t.dates !== undefined) ? t.dates : el.textContent;
    el = document.getElementById('tagline'); if (el) el.textContent = (t.tagline !== undefined) ? t.tagline : el.textContent;
    el = document.getElementById('readyLabel'); if (el) el.textContent = (t.areYouReady !== undefined) ? t.areYouReady : el.textContent;

    // build location line from translation pieces with safe fallbacks
    el = document.getElementById('locationLine');
    if (el) {
    var prefix = (t.locationPrefix !== undefined) ? t.locationPrefix : '';
    var place = (t.locationPlace !== undefined) ? t.locationPlace : 'Belhade';
    var placeHref = (t.locationHref !== undefined) ? t.locationHref : 'https://maps.app.goo.gl/4o1uAt9axGkgtMzc7';
    var suffix = (t.locationSuffix !== undefined) ? t.locationSuffix : ', accessible en voiture ou gare la plus proche ';
    var stationText = (t.stationText !== undefined) ? t.stationText : 'Ychoux';
    var stationHref = (t.stationHref !== undefined) ? t.stationHref : 'https://www.sncf-connect.com/train/france/nouvelle-aquitaine/ychoux';

    // build HTML safely (leave existing links/text if translations missing)
    var parts = [];
    if (prefix) parts.push(prefix);
    parts.push('<a class="green" href="' + placeHref + '" target="_blank">' + place + '</a>');
    if (suffix) parts.push(suffix);
    parts.push('<a class="green" href="' + stationHref + '" target="_blank">' + stationText + '</a>');

    el.innerHTML = parts.join(' ');
    }

    el = document.getElementById('priceLine'); if (el) el.textContent = (t.priceLine !== undefined) ? t.priceLine : el.textContent;
    el = document.getElementById('campingLine'); if (el) el.textContent = (t.campingLine !== undefined) ? t.campingLine : el.textContent;
    el = document.getElementById('nameLabel'); if (el) el.textContent = (t.nameLabel !== undefined) ? t.nameLabel : el.textContent;
    el = document.getElementById('comingLabel'); if (el) el.textContent = (t.comingLabel !== undefined) ? t.comingLabel : el.textContent;
    el = document.getElementById('yesBtn'); if (el) el.textContent = (t.yes !== undefined) ? t.yes : el.textContent;
    el = document.getElementById('noBtn'); if (el) el.textContent = (t.no !== undefined) ? t.no : el.textContent;
    el = document.getElementById('detailsTitle'); if (el) el.textContent = (t.detailsTitle !== undefined) ? t.detailsTitle : el.textContent;
    el = document.getElementById('staffLabel'); if (el) el.textContent = (t.staffLabel !== undefined) ? t.staffLabel : el.textContent;
    el = document.getElementById('performLabel'); if (el) el.textContent = (t.performLabel !== undefined) ? t.performLabel : el.textContent;
    el = document.getElementById('submitBtn'); if (el) el.textContent = (t.submit !== undefined) ? t.submit : el.textContent;
    el = document.getElementById('thanksTitle'); if (el) el.textContent = (t.thanksTitle !== undefined) ? t.thanksTitle : el.textContent;
    el = document.getElementById('backHome'); if (el) el.textContent = (t.backHome !== undefined) ? t.backHome : el.textContent;

    // update language toggle label (show other language)
    var toggle = document.getElementById('langToggle');
    if (toggle) toggle.textContent = (lang === 'fr') ? 'EN' : 'FR';
  }

  // initialize language from storage or default fr
  var initialLang = localStorage.getItem('site_lang') || 'fr';
  setLanguage(initialLang);

  // wire toggle button
  var lt = document.getElementById('langToggle');
  if (lt) {
    lt.addEventListener('click', function () {
      var current = document.documentElement.lang || 'fr';
      var next = (current === 'fr') ? 'en' : 'fr';
      setLanguage(next);
    });
  }

  // --- existing UI logic (RSVP / details / thanks) ---
  // keep your previous RSVP/details/thank logic below — it works unchanged.
  // RSVP page behavior
  var yesBtn = document.getElementById('yesBtn');
  var noBtn = document.getElementById('noBtn');
  var nameInput = document.getElementById('name');
  var rsvpMsg = document.getElementById('rsvpMsg');
  var noMsg = document.getElementById('noMsg');

  if (yesBtn) {
    yesBtn.addEventListener('click', function () {
      var name = nameInput ? nameInput.value.trim() : '';
      var lang = document.documentElement.lang || 'fr';
      if (!name) {
        if (rsvpMsg) { rsvpMsg.style.display = 'block'; rsvpMsg.textContent = T[lang].pleaseEnterName; }
        return;
      }
      localStorage.setItem('rsvp_name', name);
      localStorage.setItem('rsvp_coming', 'yes');
      window.location.href = 'details.html';
    });
  }

  if (noBtn) {
    noBtn.addEventListener('click', function () {
      var name = nameInput ? nameInput.value.trim() : '';
      var lang = document.documentElement.lang || 'fr';
      if (!name) {
        if (rsvpMsg) { rsvpMsg.style.display = 'block'; rsvpMsg.textContent = T[lang].pleaseEnterName; }
        if (nameInput) nameInput.focus();
        return;
      }
      localStorage.setItem('rsvp_name', name);
      localStorage.setItem('rsvp_coming', 'no');

      if (rsvpMsg) rsvpMsg.style.display = 'none';
      if (noMsg) {
        noMsg.style.display = 'block';
        noMsg.textContent = T[lang].savedNo;
      }

      noBtn.setAttribute('aria-pressed','true');
      if (yesBtn) yesBtn.disabled = true;
      noBtn.disabled = true;
      if (yesBtn) yesBtn.style.opacity = '.6';
      noBtn.style.opacity = '.6';

      setTimeout(function () {
        window.location.href = 'thanks.html';
      }, 800);
    });
  }

  // Details page + Formspree submit
  var detailsForm = document.getElementById('detailsForm');
  var welcomeName = document.getElementById('welcomeName');
  var hiddenName = document.getElementById('hiddenName');
  var hiddenComing = document.getElementById('hiddenComing');
  var detailsMsg = document.getElementById('detailsMsg');


  if (detailsForm) {
    detailsForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // populate hidden fields from localStorage
      var name = localStorage.getItem('rsvp_name') || '';
      var coming = localStorage.getItem('rsvp_coming') || 'yes';
      if (hiddenName) hiddenName.value = name;
      if (hiddenComing) hiddenComing.value = coming;

      // store staff/perform locally as well
      var staff = document.getElementById('staff') ? document.getElementById('staff').value : '';
      var perform = document.getElementById('perform') ? document.getElementById('perform').value : '';
      localStorage.setItem('rsvp_staff', staff);
      localStorage.setItem('rsvp_perform', perform);

      // collect form data and POST to Formspree (replace YOUR_ID)
      var fd = new FormData(detailsForm);
      var url = 'https://formspree.io/f/YOUR_ID'; // replace with your id

      fetch(url, {
        method: 'POST',
        body: fd,
        headers: { 'Accept': 'application/json' }
      }).then(function (res) {
        if (res.ok) {
          // show saved message on thanks page
          window.location.href = 'thanks.html';
        } else {
          return res.json().then(function (data) {
            throw new Error((data && data.error) || 'Send failed');
          });
        }
      }).catch(function (err) {
        if (detailsMsg) {
          detailsMsg.style.display = 'block';
          detailsMsg.textContent = 'Error sending form — try again later.';
        }
        console.error(err);
      });
    });
  }

  // Thanks page logic (show localized messages)
  var thanksMsg = document.getElementById('thanksMsg');
  var summaryEl = document.getElementById('summary');
  if (thanksMsg) {
    var name = localStorage.getItem('rsvp_name') || '';
    var coming = (localStorage.getItem('rsvp_coming') || '').toLowerCase();
    var staff = localStorage.getItem('rsvp_staff') || '';
    var perform = localStorage.getItem('rsvp_perform') || '';
    var lang = document.documentElement.lang || 'fr';

    if (coming === 'no') {
      thanksMsg.textContent = T[lang].savedNo;
      summaryEl.innerHTML = name ? ('Answer saved for: <strong>' + name + '</strong><br>Coming: NO') : 'Coming: NO';
    } else if (coming === 'yes') {
      thanksMsg.textContent = T[lang].savedYes;
      summaryEl.innerHTML = name
        ? ('Answer saved for: <strong>' + name + '</strong><br>Coming: YES<br>Staff: ' + (staff || 'N/A').toUpperCase() + '<br>Perform/workshop: ' + (perform || 'N/A').toUpperCase())
        : '';
    } else {
      thanksMsg.textContent = T[lang].savedYes;
      summaryEl.textContent = name ? ('Saved for: ' + name) : '';
    }
  }
});
