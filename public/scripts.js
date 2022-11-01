const  canvas = document.getElementById( "canvas" ),
      control = document.getElementById( "playbutton" ),
          ctx = canvas.getContext('2d'),
          tbl = document.getElementById( 'inputtbl' ),
       inputs = ["i01","i02","i03","i04","i05","i06"],
       slider = document.getElementById( 'sp' );
let    track1 = new Audio(),
       track2 = new Audio(),
        t1ctx = new window.AudioContext(),
        t2ctx = new window.AudioContext(),
        stems = false,
        speed = 1,
          bpm = 0;
var t1src, t1anal, t1buff, t1data, t1width, t2src, t2anal, t2buff, t2data, t2width;
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

window.onclick = function(event)
{
    if( event.target.matches('.dropbtn')) { document.getElementById("dropdown").classList.toggle("show"); }
    else
    {
        dropdowns = document.getElementsByClassName( 'dropdown-content' );
        for ( var i = 0; i < dropdowns.length; i++ ) { if ( dropdowns[i].classList.contains('show') ) { dropdowns[i].classList.remove('show'); } }
    }
}
track1.addEventListener('ended', () =>
{
    document.body.style.animationPlayState = 'paused';
    control.dataset.state = 'off';
    control.innerHTML = 'play again?';
    readvals();
    console.log('ended');
}, false );
control.addEventListener('click', () => 
{
    if( control.innerHTML === 'i\'m feeling lucky' )
    {
        let x = Math.floor( Math.random() * 6 );
        console.log(x);
        let y = inputs[x];
        console.log(y);
        let z = document.getElementById(y);
        console.log(z);
        console.log(z.innerHTML);
        setsong( z.innerHTML );
        control.innerHTML = 'play!'
    }
    else if( t1ctx.state === 'suspended' ) { t1ctx.resume(); if( stems && t2ctx.state ==='suspended' ) { t2ctx.resume(); } }
    else if( control.dataset.state === 'off' )
    {
        document.body.style.animationPlayState = 'running';
        control.dataset.state = 'on';
        control.innerHTML = 'pause!';
        readvals();
        track1.play();
        if( stems ) { track2.play(); }
        console.log('play');
    }
    else if( control.dataset.state === 'on' )
    {
        document.body.style.animationPlayState = 'paused';
        control.dataset.state = 'off';
        control.innerHTML = 'play!';
        readvals();
        track1.pause();
        if( stems ) { track2.pause(); }
        console.log('pause');
    }
}, false );
function setsong(title)
{
    if( control.dataset.state === 'on' )
    {
        document.body.style.animationPlayState = 'paused';
        control.dataset.state = 'off';
        control.innerHTML = 'play!';
        track1.pause();
        if( stems ) { track2.pause(); }
    }
    track1 = new Audio(),
    track2 = new Audio(),
    t1ctx = new window.AudioContext(),
    t2ctx = new window.AudioContext();
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
    t1src  = t1ctx.createMediaElementSource( track1 ),
    t1anal = t1ctx.createAnalyser();
    t1src.connect( t1anal );
    t1anal.connect( t1ctx.destination );
    t1anal.fftSize = 512;
    t1buff  = t1anal.frequencyBinCount,
    t1data  = new Uint8Array( t1buff ),
    t1width = canvas.width / t1buff;
    if( stems )
    {
        t2src  = t2ctx.createMediaElementSource( track2 )
        t2anal = t2ctx.createAnalyser();
        t2src.connect( t2anal );
        t2anal.connect( t2ctx.destination );
        t2anal.fftSize = 512;
        t2buff  = t2anal.frequencyBinCount,
        t2data  = new Uint8Array( t2buff ),
        t2width = canvas.width / t2buff;
    }
    readvals();
    animate(); 
}
function animate()
{
    if( control.dataset.state === 'on' )
    {
        if( stems )
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
function readvals()
{
    if( control.dataset.state === 'off' )
    {
    }
    if( control.dataset.state === 'on' )
    {
            speed = document.getElementById( "sp" ).value /  bpm;
        tbl.innerHTML = '';
    }
    track1.playbackRate = speed;
    if( stems ) { track2.playbackRate = speed; }
}
window.onload = function() {}