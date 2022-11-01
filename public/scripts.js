const  canvas = document.getElementById( "canvas" ),
      control = document.getElementById( "playbutton" ),
          ctx = canvas.getContext('2d'),
          tbl = document.getElementById( 'inputtbl' ),
       inputs = ["i01","i02","i03","i04","i05","i06"];
let    track1 = new Audio(),
       track2 = new Audio(),
        t1ctx = new window.AudioContext(),
        t2ctx = new window.AudioContext(),
        stems = false,
        speed = 1,
       colors = [ "#080806", "#977A74", "#EBE84D", "#EA3522", "#397326" ];
var grd, t1src, t1anal, t1buff, t1data, t1width, t2src, t2anal, t2buff, t2data, t2width;
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
inputs.forEach( element => { 
    let songinput = document.getElementById( element );
    songinput.addEventListener( 'click', () => { setsong( songinput.innerHTML ); }, false ); 
} );
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
    grd = readvals();
    console.log('ended');
}, false );
control.addEventListener('click', () => 
{
    if( t1ctx.state === 'suspended' )
    { 
        t1ctx.resume();
        if( stems && t2ctx.state ==='suspended' ) { t2ctx.resume(); }
    }
    if( control.dataset.state === 'off' )
    {
        document.body.style.animationPlayState = 'running';
        control.dataset.state = 'on';
        control.innerHTML = 'pause!';
        grd = readvals();
        track1.play();
        if( stems ) { track2.play(); }
        console.log('play');
    }
    else if( control.dataset.state === 'on' )
    {
        document.body.style.animationPlayState = 'paused';
        control.dataset.state = 'off';
        control.innerHTML = 'play!'
        grd = readvals();
        track1.pause();
        if( stems ) { track2.pause(); }
        console.log('pause');
    }
}, false );
function setsong(title)
{
    track1.pause();
    if( stems ) { track2.pause(); }
    track1 = new Audio(),
    track2 = new Audio(),
    t1ctx = new window.AudioContext(),
    t2ctx = new window.AudioContext();
    console.log(title);
    document.getElementById("songtitle").innerHTML = title;
    switch( title )
    {
        case 'rock music':
            stems = true;
            track1.src = "./assets/audio/rock-inst.ogg";
            track2.src = "./assets/audio/rock-vox.ogg";
            document.body.style.background = 'url("./assets/images/rock.jpeg")';
            break;
        case 'mid':
            stems = true;
            track1.src = "./assets/audio/mid-inst.ogg";
            track2.src = "./assets/audio/mid-vox.ogg";
            document.body.style.background = 'url("./assets/images/mid.jpeg")';
            break;
        case 'sydney':
            stems = true;
            track1.src = "./assets/audio/sydney-inst.ogg";
            track2.src = "./assets/audio/sydney-vox.ogg";
            document.body.style.background = 'url("./assets/images/sydney.jpeg")';
            break;
        case 'the fractal song':
            stems = true;
            track1.src = "./assets/audio/fractal-inst.ogg";
            track2.src = "./assets/audio/fractal-vox.ogg";
            document.body.style.background = 'url("./assets/images/fractal.jpeg")';
            break;
        case 'rainbow bridge':
            stems = true;
            track1.src = "./assets/audio/rainbow-inst.ogg";
            track2.src = "./assets/audio/rainbow-vox.ogg";
            document.body.style.background = 'url("./assets/images/rainbow.jpeg")';
            break;
        case 'source':
            stems = false;
            track1.src = "./assets/audio/source.mp3";
            document.body.style.background = 'url("./assets/images/source.jpeg")';
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
    grd = readvals();
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
                ctx.fillRect( canvas.width - t2height, y, t2height, t2width );
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
            speed = document.getElementById( "sp" ).value /  4;
        colors[0] = document.getElementById( "c0" ).value;
        colors[1] = document.getElementById( "c1" ).value;
        colors[2] = document.getElementById( "c2" ).value;
        colors[3] = document.getElementById( "c3" ).value;
        colors[4] = document.getElementById( "c4" ).value;
        tbl.innerHTML = '';
    }
    track1.playbackRate = speed;
    if( stems ) { track2.playbackRate = speed; }
    let grd = ctx.createLinearGradient( 0, 0, 1000, 0 );
        grd.addColorStop( 0.00, colors[1] );
        grd.addColorStop( 0.25, colors[0] );
        grd.addColorStop( 0.50, colors[0] );
        grd.addColorStop( 0.75, colors[0] );
        grd.addColorStop( 1.00, colors[1] );
    return grd;
}
window.onload = function() {}