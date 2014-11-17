/*
* Copyright (c) 2014 Vlad Ionescu <github.com/vladionescu OR @ucsenoi>
* Use of this source code is governed by a do what you want license.
*/

/**
 * Performs an XMLHttpRequest to RateMyProfessors' API to get a Prof's statistics,
 *   such as hotness, easiness, and so on.
 *
 * Accepts a Prof's 'First Last' name as the first arg.
 * The second arg is a hollaback, and the third is the arg to the hollaback.
 */
function getProfStats(name, callback, el) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(data) {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var data = JSON.parse(xhr.responseText);
        callback(data, el);
      } else {
        callback(null, null);
      }
    }
  }

  // Note: any URLs must be matched by a permission in manifest.json
  //
  // FIXME: No public API. Poked RMP 11/17/2015 using Contact Us form about using an API. Not expecting a reply.
  var url = 'http://www.ratemyprofessors.com/api/vNONEXISTENT/'+name;
  xhr.open('GET', url, true);
  xhr.send();
};

/**
 * Parses stats response and appends them to the specified element.
 *
 * First arg is the response from querying RMP.
 * Second arg is the DOM element to append the stats to.
 */
function onText(data, el) {
  // Only continue if we've actually got something.
  if (data) {
    var stats_el = document.createElement('div');

    console.log('cuckoo! cuckoo!')
  
    // Shamelessly stolen from sample. This is a nice way to handle CSS.
    stats_el.style.cssText = [
      'background-color: #ffd700;',
      'background-image: -webkit-repeating-linear-gradient(' +
        '45deg, transparent, transparent 35px,' +
        'rgba(0,0,0,.1) 35px, rgba(0,0,0,.1) 70px);',
      'color: #000;',
      'padding: 10px;',
      'font: 14px Arial;'
    ].join(' ');
    document.body.parentElement.insertBefore(stats_el, el);
  }
};

getProfStats('Bob Ross', onText, document.getElementById('bobross'));
