import throttle from 'lodash.throttle';
import Player from '@vimeo/player';


const iframe = document.querySelector('#vimeo-player');
const iframePlayer = new Vimeo.Player(iframe);

function dataEvent (data){
   const currentTime = data.seconds;
   localStorage.setItem("videoplayer-current-time", currentTime);
};

iframePlayer.on('timeupdate',throttle(dataEvent,1000)); 
iframePlayer.setCurrentTime(currentTime());
function currentTime() {
   return JSON.parse(localStorage.getItem('videoplayer-current-time') || 0)
};
