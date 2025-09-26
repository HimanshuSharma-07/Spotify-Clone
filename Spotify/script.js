console.log("Lets write JavaScript");
let currTrack = new Audio();
let songs;

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



const playMusic = (track, pause = false)=>{
    // let audio = new Audio("songs/" + track)
    currTrack.src = "songs/" + track
    if(!pause){
        currTrack.play() 
        play.src = "img/pause.svg"
    }
    
    
    document.querySelector(".songinformation").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}

async function main(){
    // Get the list of all songs
    songs = await getSongs()
    playMusic(songs[0], true)
    // Show all the songs in the playlist
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

                            </div> </li>`
    }

                // Attach an event listener to each song
                Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
                    e.addEventListener("click", ()=>{
                        currentSong = e.querySelector(".songinfo").getElementsByTagName("div")[0].innerHTML
                        console.log(e.querySelector(".songinfo").getElementsByTagName("div")[0].innerHTML);
                        playMusic(e.querySelector(".songinfo").getElementsByTagName("div")[0].innerHTML.trim())
                    })
                })

                // Attach an event listener to play, previous and next button 
                play.addEventListener("click", ()=>{
                    if(currTrack.paused){
                        currTrack.play()
                        play.src = "img/pause.svg"
                        
                    }else{
                        currTrack.pause()
                        play.src = "img/play.svg"
                }
                })

                // Listen for timeupdate event
                currTrack.addEventListener("timeupdate", ()=>{
                    console.log(Math.floor(currTrack.currentTime, currTrack.duration));
                    document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currTrack.currentTime)} / ${secondsToMinutesSeconds(currTrack.duration)}`
                    document.querySelector(".circle").style.left = (currTrack.currentTime / currTrack.duration) * 100 + "%"  
                    
                })

                // Add an event listner to seekbar
                document.querySelector(".seekbar").addEventListener("click", (e)=>{
                    
                    document.querySelector(".circle").style.left = (e.offsetX / e.target.getBoundingClientRect().width) * 100 + "%"
                    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
                    currTrack.currentTime = ((currTrack.duration) * percent) / 100
                })

                // Ada an envent listner for hamburger
                document.querySelector(".hamburger").addEventListener("click", ()=>{
                    document.querySelector(".left").style.left = "0"
                })

                // Ada an envent listner for close
                document.querySelector(".close").addEventListener("click", ()=>{
                    document.querySelector(".left").style.left = "-120%"
                })


                // Add an event listner to next
                next.addEventListener("click", ()=>{
                    let index = songs.indexOf(currTrack.src.split("s/").splice(-1) [0])
                    
                    if([index+1] < songs.length){
                        
                        playMusic(songs[index+1])
                    }
                    else{
                        playMusic(songs[0])
                    }
                    
                    

                    
                })
                
                // Add an event listner to previous
                previous.addEventListener("click", ()=>{
                
                    let index = songs.indexOf(currTrack.src.split("s/").splice(-1) [0])
                    
                    if (index > 0) {
                      playMusic(songs[index - 1]);
                    } 
                    else {
                      playMusic(songs[songs.length - 1]);
                    }
                    
                })

                document.querySelector(".range").addEventListener("change", (e)=>{
                    
                    currTrack.volume = parseInt(e.target.value)/100
                    if(currTrack.volume == 0){
                        document.querySelector(".volumeimg").src =  src="img/mute.svg"
                    }
                    else{
                        document.querySelector(".volumeimg").src =  src="img/volume.svg"
                    }
                })

                document.querySelector(".volumeimg").addEventListener("click", () =>{
                    const volumeImg = document.querySelector(".volumeimg")
                    const rangeChange = document.querySelector(".range")
                    if( volumeImg.src.includes("volume.svg")){
                        volumeImg.src =  src="img/mute.svg"
                        currTrack.volume = 0
                        rangeChange.value = 0
                    }
                    else{
                        volumeImg.src = src="img/volume.svg"
                        currTrack.volume = 1
                        rangeChange.value = 100
                    }
                   
                })

                document.querySelector(".play").addEventListener("click", ()=>{
                    currTrack.play();
                })




  
}

main()



