console.log("Jai Shree Ram");
let currSong = new Audio();

async function getSongs() {
  let a = await fetch("/songs/");
  let response = await a.text();
  console.log(response);

  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");

  let songs = [];
  for (let i = 0; i < as.length; ++i) {
    const element = as[i];
    
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/songs/")[1]);
    }
  }
  return songs;
}

const playMusic = (track , pause = false)=>{
  
  // let audio = new Audio("/songs/" + track);
  currSong.src = "/songs/" + track;
  if(!pause){
    currSong.play();
    document.querySelector("#play").src = "img/pause.svg";
  }

  document.querySelector(".song-info").innerHTML = decodeURI(track);
  document.querySelector(".song-Stime").innerHTML = "00:00"
  document.querySelector(".song-time").innerHTML = "00:00"

  // currSong.currentSrc = "/songs/" + track;
  // currSong.play();
}



function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
      return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}


async function main() {
  
  

  // get  the list of all songs
  var songs = await getSongs();

  playMusic(songs[0] , true);

  
  var thumb = document.querySelector("#play");
  thumb.src = "img/play.svg";

  // Show All the sonngs on Playlist
  let songUL = document.querySelector(".song-list").getElementsByTagName('ul')[0];
  for(let i = 0 ; i < songs.length ; ++i){
    songUL.innerHTML = songUL.innerHTML +  `<li><img src="img/music.svg" class="invert" alt="">
          <div class="info">
            <div>${songs[i].replaceAll("%20" , " ")}</div>
            <div>Ritesh</div>
          </div>
          <div class="play-now">
            <img src="img/play.svg" class="invert" alt="">
          </div>
      </li>`;
  }

  // Attach an Event Listner to Each Song
  Array.from(document.querySelector(".song-list").getElementsByTagName("li")).forEach(e =>{
    e.addEventListener("click" , ()=>{
      console.log(e.querySelector(".info").firstElementChild.innerHTML);
      playMusic(e.querySelector(".info").firstElementChild.innerHTML);
    })
  })


  // Attach an Event Listner to play,next and Previous
  // document.querySelector("#play").
  play.addEventListener("click" , ()=>{
    if(currSong.paused) {
      currSong.play();
      document.querySelector("#play").src = "img/pause.svg";
    }else {
      currSong.pause();
      var thumb = document.querySelector("#play");
      thumb.src = "img/play.svg";
    
    }
  })
  

  // Listene to time update
  currSong.addEventListener("timeupdate" , ()=>{
    document.querySelector(".song-Stime").innerHTML = secondsToMinutesSeconds(currSong.currentTime);
    document.querySelector(".song-time").innerHTML = secondsToMinutesSeconds(currSong.duration);
    document.querySelector(".circle").style.left = ((currSong.currentTime / currSong.duration) * 70)+14+ "%";
  })


  // Listen to seek bar
  document.querySelector(".seekbar").addEventListener("click" , (a)=>{
    let percent = (((a.offsetX / a.target.getBoundingClientRect().width ) * 70) );
    document.querySelector(".circle").style.left = percent + "%";

    currSong.currentTime = (percent*(currSong.duration))/70 ;
  })


}

main();
