// color schema for diff songs
// array = [ vis color, songselect color, songselect hover color ]
// home = [ #000000, 'teal', 'skyblue' ]

const  canvas = document.getElementById( "canvas" ),
      control = document.getElementById( "playbutton" ),
          ctx = canvas.getContext('2d'),
       inputs = ["i01","i02","i03","i04","i05","i06"],
       slider = document.getElementById( 'sp' ),
       slabel = document.getElementById( 'splabel' ),
        t1btn = document.getElementById( 't1btn' ),
        t2btn = document.getElementById( 't2btn' ),
        t1div = document.getElementById( 't1div' ),
        t2div = document.getElementById( 't2div' );
let    track1 = new Audio(),
       track2 = new Audio(),
        t1ctx = new window.AudioContext(),
        t2ctx = new window.AudioContext(),
        stems = false,
          bpm = 0,
     viscolor = '#000000',
      t1state = 1,
      t2state = 1;
var t1src, t1anal, t1buff, t1data, t1width, t2src, t2anal, t2buff, t2data, t2width;
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
// add listener for each song in dropdown menu
inputs.forEach( element => { 
    let songinput = document.getElementById( element );
    songinput.addEventListener( 'click', () => { setsong( songinput.innerHTML ); }, false ); 
} );
// close dropdown menu when clicking anywhere else on screen
window.onclick = function(event)
{
    if ( event.target.matches('.dropbtn')) { document.getElementById("dropdown").classList.toggle("show"); }
    else
    {
        dropdowns = document.getElementsByClassName( 'dropdown-content' );
        for ( var i = 0; i < dropdowns.length; i++ ) { if ( dropdowns[i].classList.contains('show') ) { dropdowns[i].classList.remove('show'); } }
    }
};
// pause track when over
track1.addEventListener('ended', () =>
{
    document.body.style.animationPlayState = 'paused';
    control.innerHTML = 'i\'m feeling lucky';
    console.log('ended');
}, false );
// on click of pause/play button
control.addEventListener('click', () => 
{
    // if lucky, pick random song
    if ( control.innerHTML === 'i\'m feeling lucky' ) { setsong( document.getElementById( inputs[ Math.floor( Math.random() * 6 ) ] ).innerHTML ); }
    // if suspended, unsuspend
    if ( t1ctx.state === 'suspended' && !stems ) { t1ctx.resume(); }
    else if ( t1ctx.state ==='suspended' && t2ctx.state ==='suspended' && stems ) { t1ctx.resume(); t2ctx.resume(); }
    // if paused, play
    else if ( control.innerHTML === 'play!' )
    {
        document.body.style.animationPlayState = 'running';
        control.innerHTML = 'pause!';
        if ( stems )
        {
            track1.play();
            track2.play();
        }
        else { track1.play(); }
        console.log('play');
    }
    // if playing, pause
    else if ( control.innerHTML === 'pause!' )
    {
        document.body.style.animationPlayState = 'paused';
        control.innerHTML = 'play!';
        if ( stems ) { track1.pause(); track2.pause(); }
        else { track1.pause(); }
        console.log('pause');
    }
}, false );
// track 1 stem control
t1btn.addEventListener( 'click', () =>
{
    t1state = 1 - t1state;
    if( t1state )
    {
        t1div.innerHTML = 'on';
        t1div.style.backgroundColor = 'rgba(23,173,73,0.8)';
        t1div.style.color = '#073316';
        track1.volume = 1;
    }
    else
    {
        t1div.innerHTML = 'off';
        t1div.style.backgroundColor = 'rgba(181,14,2,0.8)';
        t1div.style.color = '#400300'
        track1.volume = 0;
    }
} );
// track 2 stem control
t2btn.addEventListener( 'click', () =>
{
    t2state = 1 - t2state;
    if( t2state )
    {
        t2div.innerHTML = 'on';
        t2div.style.backgroundColor = 'rgba(23,173,73,0.8)';
        t2div.style.color = '#073316';
        track2.volume = 1;
    }
    else
    {
        t2div.innerHTML = 'off';
        t2div.style.backgroundColor = 'rgba(181,14,2,0.8)';
        t2div.style.color = '#400300';
        track2.volume = 0;
    }
} );
// bpm slider
slider.addEventListener('input', (e) =>
{
    console.log(slider.value)
    if( stems ) { track1.playbackRate = slider.value / bpm ; track2.playbackRate = slider.value / bpm; }
    else { track1.playbackRate = slider.value / bpm; }
    slabel.innerHTML = slider.value + ' bpm';
}, false );
// set song
function setsong(title)
{
    document.getElementById('ctrl').style.display = 'block';
    document.body.style.animationPlayState = 'paused';
    if ( control.innerHTML === 'pause!' )
    {
        if ( stems ) { track1.pause(); track2.pause(); }
        else { track1.pause(); }
    }
    control.innerHTML = 'play!';
    track1  = new Audio(),
    track2  = new Audio(),
    t1ctx   = new window.AudioContext(),
    t2ctx   = new window.AudioContext(),
    console.log(title);
    document.getElementById("dropbtn").innerHTML = title;
    switch( title )
    {
        case 'rock music':
            stems = true;
            bpm = 105;
            track1.src = "./assets/audio/rock-inst.ogg";
            track2.src = "./assets/audio/rock-vox.ogg";
            document.body.style.background = 'url("./assets/images/rock.jpeg")';
            document.getElementById("amlink").href = "https://music.apple.com/us/album/rock-music/1609976325?i=1609976326";
            document.getElementById("sclink").href = "https://soundcloud.com/gabbystart/rock-music";
            document.getElementById("splink").href = "https://open.spotify.com/track/0QU3VTMzBkx6Jyv9cgUaVh?si=c2a66f4ec46b4f1c";
            document.getElementById("ytlink").href = "https://youtu.be/LvZJhLZs7yk";
            break;
        case 'mid':
            stems = true;
            bpm = 125;
            track1.src = "./assets/audio/mid-inst.ogg";
            track2.src = "./assets/audio/mid-vox.ogg";
            document.body.style.background = 'url("./assets/images/mid.jpeg")';
            document.getElementById("amlink").href = "https://music.apple.com/us/album/mid/1609976325?i=1609976327";
            document.getElementById("sclink").href = "https://soundcloud.com/gabbystart/mid";
            document.getElementById("splink").href = "https://open.spotify.com/track/52OpdjygHPdAyZXz9TheCv?si=20b3c06f913048a2";
            document.getElementById("ytlink").href = "https://youtu.be/x10FKrgdGec";
            break;
        case 'sydney':
            stems = true;
            bpm = 160;
            track1.src = "./assets/audio/sydney-inst.ogg";
            track2.src = "./assets/audio/sydney-vox.ogg";
            document.body.style.background = 'url("./assets/images/sydney.jpeg")';
            document.getElementById("amlink").href = "https://music.apple.com/us/album/sydney/1609976325?i=1609976328";
            document.getElementById("sclink").href = "https://soundcloud.com/gabbystart/sydney";
            document.getElementById("splink").href = "https://open.spotify.com/track/6tgBcDasLoHgasLgZTPFpD?si=3f023e2156014ca2";
            document.getElementById("ytlink").href = "https://youtu.be/FUITX8kBdbw";
            break;
        case 'the fractal song':
            stems = true;
            bpm = 152;
            track1.src = "./assets/audio/fractal-inst.ogg";
            track2.src = "./assets/audio/fractal-vox.ogg";
            document.body.style.background = 'url("./assets/images/fractal.jpeg")';
            document.getElementById("amlink").href = "https://music.apple.com/us/album/the-fractal-song/1609976325?i=1609976329";
            document.getElementById("sclink").href = "https://soundcloud.com/gabbystart/thefractalsong";
            document.getElementById("splink").href = "https://open.spotify.com/track/3C0xe0liW19waPnecVs3UB?si=e9ae15695f124804";
            document.getElementById("ytlink").href = "https://youtu.be/gXjtqBbYSTY";
            break;
        case 'rainbow bridge':
            stems = true;
            bpm = 98;
            track1.src = "./assets/audio/rainbow-inst.ogg";
            track2.src = "./assets/audio/rainbow-vox.ogg";
            document.body.style.background = 'url("./assets/images/rainbow.jpeg")';
            document.getElementById("amlink").href = "https://music.apple.com/us/album/rainbow-bridge/1609976325?i=1609976330";
            document.getElementById("sclink").href = "https://soundcloud.com/gabbystart/rainbow-bridge";
            document.getElementById("splink").href = "https://open.spotify.com/track/79tbhEOtoixfx2hYha4Da8?si=e1da7fe6b91b42e1";
            document.getElementById("ytlink").href = "https://youtu.be/XovGmOL9Jco";
            break;
        case 'source':
            stems = false;
            bpm = 125;
            track1.src = "./assets/audio/source.mp3";
            document.body.style.background = 'url("./assets/images/source.jpeg")';
            document.getElementById("amlink").href = "https://music.apple.com/us/artist/gabby-start/1588701682";
            document.getElementById("sclink").href = "https://soundcloud.com/gabbystart/source";
            document.getElementById("splink").href = "https://open.spotify.com/artist/33L1klom7IXmoAP8fjrGm9";
            document.getElementById("ytlink").href = "https://www.youtube.com/channel/UCrVlEhANXP_w4SuGiXHHlZA/";
            break;
    }
    slider.value = bpm;
    slabel.innerHTML = bpm + ' bpm';
    t1src  = t1ctx.createMediaElementSource( track1 ),
    t1anal = t1ctx.createAnalyser();
    t1src.connect( t1anal );
    t1anal.connect( t1ctx.destination );
    t1anal.fftSize = 512;
    t1buff  = t1anal.frequencyBinCount,
    t1data  = new Uint8Array( t1buff ),
    t1width = canvas.width / t1buff;
    track1.volume = 1;
    if ( stems )
    {
        t2src  = t2ctx.createMediaElementSource( track2 )
        t2anal = t2ctx.createAnalyser();
        t2src.connect( t2anal );
        t2anal.connect( t2ctx.destination );
        t2anal.fftSize = 512;
        t2buff  = t2anal.frequencyBinCount,
        t2data  = new Uint8Array( t2buff ),
        t2width = canvas.width / t2buff;
        t1btn.style.display = 'inline-block';
        t2btn.style.display = 'inline-block';
        t1div.style.backgroundColor = '#17ad49';
        t2div.style.backgroundColor = '#17ad49';
    }
    else
    {
        t1btn.style.display = 'none';
        t2btn.style.display = 'none';
    }
    animate();
};
// animate vis
function animate()
{
    if ( control.innerHTML === 'pause!' )
    {
        if ( stems )
        {
            var y = 0;
            ctx.clearRect( 0, 0, canvas.width, canvas.height );
            t1anal.getByteFrequencyData( t1data );
            t2anal.getByteFrequencyData( t2data );
            for ( let i = 0 ; i < t1buff ; i++ )
            {
                let t1height = t1data[i]*1.5;
                let t2height = t2data[i]*1.5;
                ctx.fillStyle = "#000000";
                ctx.fillRect( 0, y, t1height, t1width );
                ctx.fillRect( canvas.width - t2height, canvas.height - y, t2height, t2width );
                y += t1width;
            }
        }
        else
        {
            var x = 0;
            ctx.clearRect( 0, 0, canvas.width, canvas.height );
            t1anal.getByteFrequencyData( t1data );
            for ( let i = 0 ; i < t1buff ; i++ )
            {
                let t1height = t1data[i]*2.5;
                ctx.fillStyle = "#000000";
                ctx.fillRect( x, canvas.height - t1height, t1width, t1height );
                x += t1width;
            }
        }
    }
    requestAnimationFrame(animate);
}
window.onload = function() {}