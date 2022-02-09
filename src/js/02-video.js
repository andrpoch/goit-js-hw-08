import throttle from 'lodash.throttle';
import Player from '@vimeo/player';


const iframe = document.querySelector('iframe');
const iframePlayer = new Vimeo.Player(iframe);

function dataEvent (data){
   localStorage.setItem("videoplayer-current-time", JSON.stringify(data));
};

iframePlayer.on('timeupdate',throttle(dataEvent,1000)); 
iframePlayer.setCurrentTime(currentTime());
function currentTime() {
   return JSON.parse(localStorage.getItem('videoplayer-current-time')).seconds
};

