// Louis Bunt – SoundCloud-Player (Widget API)
(function () {
  var PROFILE = 'https://soundcloud.com/louis-braun-676518148'; // SoundCloud-Profil
  var root = document.getElementById('sc-player');
  if (!root) return;

  var iframe = document.createElement('iframe');
  iframe.allow = 'autoplay';
  iframe.style.display = 'none';
  iframe.src = 'https://w.soundcloud.com/player/?url=' + encodeURIComponent(PROFILE + '/tracks') + '&show_artwork=true';
  root.appendChild(iframe);

  var api = document.createElement('script');
  api.src = 'https://w.soundcloud.com/player/api.js';
  api.onload = init;
  document.head.appendChild(api);

  function fmt(ms) {
    var s = Math.floor(ms / 1000);
    return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2);
  }

  function init() {
    var widget = SC.Widget(iframe);
    var playBtn = root.querySelector('.sc-play');
    var prevBtn = root.querySelector('.sc-prev');
    var nextBtn = root.querySelector('.sc-next');
    var title = root.querySelector('.sc-title');
    var art = root.querySelector('.sc-art');
    var bar = root.querySelector('.sc-bar');
    var fill = root.querySelector('.sc-bar-fill');
    var time = root.querySelector('.sc-time');
    var playing = false;

    function refresh() {
      widget.getCurrentSound(function (sound) {
        if (!sound) return;
        title.textContent = sound.title;
        if (sound.artwork_url) {
          art.src = sound.artwork_url.replace('-large', '-t200x200');
          art.style.visibility = 'visible';
        }
      });
    }

    widget.bind(SC.Widget.Events.READY, function () {
      root.classList.add('ready');
      refresh();
    });
    widget.bind(SC.Widget.Events.PLAY, function () {
      playing = true;
      playBtn.textContent = '❚❚';
      refresh();
    });
    widget.bind(SC.Widget.Events.PAUSE, function () {
      playing = false;
      playBtn.textContent = '►';
    });
    widget.bind(SC.Widget.Events.PLAY_PROGRESS, function (e) {
      widget.getDuration(function (d) {
        if (!d) return;
        fill.style.width = (e.currentPosition / d) * 100 + '%';
        time.textContent = fmt(e.currentPosition) + ' / ' + fmt(d);
      });
    });

    playBtn.addEventListener('click', function () {
      playing ? widget.pause() : widget.play();
    });
    prevBtn.addEventListener('click', function () { widget.prev(); });
    nextBtn.addEventListener('click', function () { widget.next(); });
    bar.addEventListener('click', function (ev) {
      var r = bar.getBoundingClientRect();
      widget.getDuration(function (d) {
        widget.seekTo(((ev.clientX - r.left) / r.width) * d);
      });
    });
  }
})();
