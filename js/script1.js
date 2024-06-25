console.log("Jai Shree Ram");
let currSong = new Audio();
async function getSongs() {
  let a = await fetch("http://127.0.0.1:3000/songs/");
  let response = await a.text();
  console.log(response);

  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  console.log(as);
  
  for(auto song : )
  
}

getSongs();
