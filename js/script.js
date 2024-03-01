console.log("Jai Shree Ram");

async function getSongs() {
  let a = await fetch("http://127.0.0.1:3000/songs/");
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
async function main() {
  // get  the list of all songs
  var songs = await getSongs();
  console.log(songs);

  let songUL = document.querySelector(".song-list").getElementsByTagName('ul')[0];
  for(let i = 0 ; i < songs.length ; ++i){
    songUL.innerHTML = songUL.innerHTML +  `<li>${songs[i].replaceAll("%20" , " ")}</li>`;
  }
  // play this first song
  var audio = new Audio(songs[0]);
  // audio.play();
  // let play = document.getElementById("play-btn");
  // play.addEventListener("click" , ()=>{
  // })

  audio.addEventListener("loadeddata", () => {
    //   let duration = audio.duration;
    // The duration variable now holds the duration (in seconds) of the audio clip
    console.log(audio.duration, audio.currentTime, audio.currentSrc);
  });
}

main();
