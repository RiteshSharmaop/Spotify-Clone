console.log("Jai Shree Ram");
let currSong = new Audio();
async function getSongs() {
  let a = await fetch("http://127.0.0.1:3000/songs/");
  let response = await a.text();
  // console.log(response);

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
const playMusic = (track)=>{
  let audio = new Audio("/songs/" + track);
  audio.play();
  // currSong.currentSrc = "/songs/" + track;
  // currSong.play();
}
async function main() {
  


  // get  the list of all songs
  var songs = await getSongs();

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

  
}

main();
