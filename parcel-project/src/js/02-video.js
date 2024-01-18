import Vimeo from '@vimeo/player';
import _throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');

const player = new Vimeo(iframe);

const localStorageKey = 'videoplayer-current-time';

player.on('loaded', () => {
  const currentTime = localStorage.getItem(localStorageKey) || '';
  player
    .setCurrentTime(currentTime)
    .then(function (seconds) {
      // seconds = the actual time that the player seeked to
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          // the time was less than 0 or greater than the video’s duration
          break;

        default:
          // some other error occurred
          break;
      }
    });
  console.log('played the video!');
});

player.on(
  'timeupdate',
  _throttle(({ seconds }) => {
    localStorage.setItem(localStorageKey, seconds);
  }, 1000)
);
