console.log("Jai Shree Ram");

async function getSong(url) {
  console.log("displaying albums");
  let a = await fetch(url);
  let response = await a.text();
  // return await a.json();
  console.log(a);
  
}

getSong(`http://127.0.0.1:5500/Songs`);
