console.log("Lets write JavaScript");

async function getSongs(){

    let a = await fetch("http://127.0.0.1:5500/songs/")
    let response = await a.text();
    console.log(response);

    let div = document.createElement("div");
    div.innerHTML = response
    
    let links = div.querySelectorAll("a");
    

        let songs = [];
    for (let index = 0; index < links.length; index++) {
        const element = links[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("s/",)[1]);
        
    }
}
    return songs
    
    
} 

async function main(){

    // Get the list of all songs
    let songs = await getSongs()
    console.log(songs);

    let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for(const song of songs) {
        songUl.innerHTML = songUl.innerHTML + `<li>
                            <div class="songinfo">
                             <img  class="invert" src="img/music.svg" alt="">
                                <div>${song.replaceAll("%20", " " )}</div>
                                
                            </div>
                            <div class="playnow">
                            
                               

                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445"/>
</svg>

                            </div>
        </li>`
    }

    // Play the first song
    let audio = new Audio(songs[0]); // path to your file
    // audio.play();
    

    audio.addEventListener("loadeddata", () => {
        console.log(audio.duration, audio.currentSrc ,audio.currentTime,);
        
  
});
}

main()



