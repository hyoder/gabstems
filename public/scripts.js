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
       volume = 1,
        speed = 1,
       colors = [ "#080806", "#977A74", "#EBE84D", "#EA3522", "#397326" ];
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
inputs.forEach( element => { 
    console.log( element );
    let songinput = document.getElementById( element );
    console.log( songinput );
    console.log( songinput.innerHTML );
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
    t1ctx = new window.AudioContext(),
    t2ctx = new window.AudioContext();
    switch( title )
    {
        case 'rock music':
            stems = true;
            track1.src = "./assets/audio/rock-inst.ogg";
            track2.src = "./assets/audio/rock-vox.ogg";
            document.body.style.background = 'url("./assets/images/rock.jpeg")';
        case 'mid':
            stems = true;
            track1.src = "./assets/audio/mid-inst.ogg";
            track2.src = "./assets/audio/mid-vox.ogg";
            document.body.style.background = 'url("./assets/images/mid.jpeg")';
        case 'sydney':
            stems = true;
            track1.src = "./assets/audio/sydney-inst.ogg";
            track2.src = "./assets/audio/sydney-vox.ogg";
            document.body.style.background = 'url("./assets/images/sydney.jpeg")';
        case 'the fractal song':
            stems = true;
            track1.src = "./assets/audio/fractal-inst.ogg";
            track2.src = "./assets/audio/fractal-vox.ogg";
            document.body.style.background = 'url("./assets/images/fractal.jpeg")';
        case 'rainbow bridge':
            stems = true;
            track1.src = "./assets/audio/rainbow-inst.ogg";
            track2.src = "./assets/audio/rainbow-vox.ogg";
            document.body.style.background = 'url("./assets/images/rainbow.jpeg")';
        case 'source':
            stems = false;
            track1.src = "./assets/audio/source.mp3";
            document.body.style.background = 'url("./assets/images/source.jpeg")';
    }
    let t1src  = t1ctx.createMediaElementSource( track1 ),
        t1anal = t1ctx.createAnalyser();
        t1src.connect( t1anal );
        t1anal.connect( t1ctx.destination );
    if( stems )
    {
        let t2src  = t2ctx.createMediaElementSource( track2 )
            t2anal = t2ctx.createAnalyser();
            t2src.connect( t2anal );
            t2anal.connect( t2ctx.destination );
            t1anal.fftSize = 256;
            t2anal.fftSize = 256;
        let t1buff  = t1anal.frequencyBinCount,
            t1data  = new Uint8Array( t1buff ),
            t1width = canvas.width / t1buff,
            t2buff  = t2anal.frequencyBinCount,
            t2data  = new Uint8Array( t2buff ),
            t2width = canvas.width / t2buff;
    }
    else
    {
            t1anal.fftSize = 512;
        let t1buff  = t1anal.frequencyBinCount,
            t1data  = new Uint8Array( t1buff ),
            t1width = canvas.width / t1buff;
    }
    let grd = readvals();
    animate(); 
}
function animate()
{
    if( control.dataset.state === 'on' )
    {
        if( stems )
        {
            var t1x = canvas.width / 2, t2x = canvas.width / 2;
            ctx.clearRect( 0, 0, canvas.width, canvas.height );
            t1anal.getByteFrequencyData( t1data );
            t2anal.getByteFrequencyData( t2data );
            for ( let i = 0 ; i < t1buff ; i++ )
            {
                let t1height = t1data[i]*2.5;
                let t2height = t2data[i]*2.5;
                ctx.fillStyle = grd;
                ctx.fillRect( t1x, canvas.height - t1height, t1width, t1height );
                ctx.fillRect( t2x - t2width, canvas.height - t2height, t2width, t2height );
                t1x += t1width;
                t2x -= t2width;
            }
        }
        else
        {
            var t1x = 0;
            ctx.clearRect( 0, 0, canvas.width, canvas.height );
            t1anal.getByteFrequencyData( t1data );
            for ( let i = 0 ; i < t1buff ; i++ )
            {
                let t1height = t1data[i]*2.5;
                ctx.fillStyle = grd;
                ctx.fillRect( t1x, canvas.height - t1height, t1width, t1height );
                t1x += t1width;
            }
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
        tbl.innerHTML = '';
    }
    track1.volume = volume;
    track1.playbackRate = speed;
    if( stems )
    {
        track2.volume = volume;
        track2.playbackRate = speed;
    }
    let grd = ctx.createLinearGradient( 0, 0, 1000, 0 );
        grd.addColorStop( 0.00, colors[0] );
        grd.addColorStop( 0.25, colors[1] );
        grd.addColorStop( 0.50, colors[2] );
        grd.addColorStop( 0.75, colors[3] );
        grd.addColorStop( 1.00, colors[4] );
    return grd;
}
window.onload = function() {}