let     audio = new Audio();
    audio.src = "../assets/audio/source.mp3";
const  canvas = document.getElementById( "canvas" ),
      control = document.getElementById( "playbutton" ),
      context = new window.AudioContext(),
          ctx = canvas.getContext('2d'),
          tbl = document.getElementById( 'inputtbl' );
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
let source = context.createMediaElementSource( audio ),
  analyzer = context.createAnalyser();
source.connect( analyzer );
analyzer.connect( context.destination );
analyzer.fftSize = 512;
let buflen = analyzer.frequencyBinCount,
      data = new Uint8Array( buflen ),
  barwidth = canvas.width / buflen,
    volume = 1,
     speed = 1,
    colors = [ "#080806", "#977A74", "#EBE84D", "#EA3522", "#397326" ],
       grd = readvals();

audio.addEventListener('ended', () =>
{
    document.body.style = 'animation-play-state: paused;';
    control.dataset.state = 'off';
    control.innerHTML = 'play again?';
    grd = readvals();
    console.log('ended');
}, false );
control.addEventListener('click', () => 
{
    if( context.state === 'suspended' ) { context.resume(); }
    if( control.dataset.state === 'off' )
    {
        document.body.style = 'animation-play-state: running;';
        audio.play();
        control.dataset.state = 'on';
        control.innerHTML = 'pause!';
        grd = readvals();
        console.log('play');
    }
    else if( control.dataset.state === 'on' )
    {
        document.body.style = 'animation-play-state: paused;';
        audio.pause();
        control.dataset.state = 'off';
        control.innerHTML = 'play!'
        grd = readvals();
        console.log('pause');
    }
}, false );
function animate()
{
    if( control.dataset.state === 'on' )
    {
        var x = 0;
        ctx.clearRect( 0, 0, canvas.width, canvas.height );
        analyzer.getByteFrequencyData( data );
        for ( let i = 0 ; i < buflen ; i++ )
        {
            let barheight = data[i]*2.5;
            ctx.fillStyle = grd;
            ctx.fillRect( x, canvas.height - barheight, barwidth, barheight );
            x += barwidth;
        }
    }
    requestAnimationFrame(animate);
}
function readvals()
{
    if( control.dataset.state === 'off' )
    {
        tbl.innerHTML  = '<td><label for="vl" style="font-family:\'Source Code Pro\',monospace;background-color:rgba(255,255,255,.6);text-align:center;">volume: </label>'
        tbl.innerHTML +=     '<input type="range" id="vl" value="' + volume*10 + '" min="0" max="10" step="1" style="width:210px; height:25px;"></td>'
        tbl.innerHTML += '<td><label for="sp" style="font-family:\'Source Code Pro\',monospace;background-color:rgba(255,255,255,.6);text-align:center;">playback speed: </label>'
        tbl.innerHTML +=     '<input type="range" id="sp" value="' +  speed*4  + '" min="2" max="12" step="1" style="width:210px; height:25px;"></td>'
        tbl.innerHTML += '<td><input type="color" id="c0" value="' + colors[0] + '" style="width:210px; height:25px; text-align:center;"></td>';
        tbl.innerHTML += '<td><input type="color" id="c2" value="' + colors[2] + '" style="width:210px; height:25px; text-align:center;"></td>';
        tbl.innerHTML += '<td><input type="color" id="c1" value="' + colors[1] + '" style="width:210px; height:25px; text-align:center;"></td>';
        tbl.innerHTML += '<td><input type="color" id="c3" value="' + colors[3] + '" style="width:210px; height:25px; text-align:center;"></td>';
        tbl.innerHTML += '<td><input type="color" id="c4" value="' + colors[4] + '" style="width:210px; height:25px; text-align:center;"></td>';
    }
    if( control.dataset.state === 'on' )
    {
           volume = document.getElementById( "vl" ).value / 10;
            speed = document.getElementById( "sp" ).value /  4;
        colors[0] = document.getElementById( "c0" ).value;
        colors[1] = document.getElementById( "c1" ).value;
        colors[2] = document.getElementById( "c2" ).value;
        colors[3] = document.getElementById( "c3" ).value;
        colors[4] = document.getElementById( "c4" ).value;
        tbl.innerHTML  = '';
    }
    audio.volume = volume;
    audio.playbackRate = speed;
    let grd = ctx.createLinearGradient( 0, 0, 1000, 0 );
        grd.addColorStop( 0.00, colors[0] );
        grd.addColorStop( 0.25, colors[1] );
        grd.addColorStop( 0.50, colors[2] );
        grd.addColorStop( 0.75, colors[3] );
        grd.addColorStop( 1.00, colors[4] );
    return grd;
}
window.onload = function() { animate(); }