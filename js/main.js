var audio = '';

function startAnimation( classAnimate ) {
    var elements = document.getElementsByClassName( classAnimate );
    for (var i=0; i<elements.length; i++) {     
      elements[i].style.animationPlayState =        "running";
      elements[i].style.webkitAnimationPlayState =  "running";
      elements[i].style.MozAnimationPlayState =     "running";
    }
    if ( classAnimate == 'animado2' ) {
        document.getElementById('exit').addEventListener('click', bgExitHandler, false);
    }
}

function stopAnimation( classAnimate ) {    
    var elements = document.getElementsByClassName( classAnimate );
      for (var i=0; i<elements.length; i++) {
        var elm = elements[i];
        var newone = elm.cloneNode(true);
        elm.parentNode.replaceChild(newone, elm);
      }
}

function lanzarSonido() {
    audio.play();
}

function stopAudio() {
    audio.pause();
    audio.currentTime = 0;
}

function finAudio() {
    $( '#speaker, #texto23' ).removeClass( 'visible' );
    $( '#secuencia3, #reload' ).addClass( 'visible' );
    stopAnimation( 'animado2' );
    startAnimation( 'animado2' ); //lanzamos la animacion
    //$( '#exit' ).show();
}

$(document).ready(function(){
    startAnimation( 'animado' ); //lanzamos la animacion
    
    //dibujar canvas ---------------------------
    var canvas = document.querySelector('#paint');
	var ctx = canvas.getContext('2d');

	var sketch = document.querySelector('#sketch');
	var sketch_style = getComputedStyle(sketch);
	canvas.width = parseInt(sketch_style.getPropertyValue('width'));
	canvas.height = parseInt(sketch_style.getPropertyValue('height'));

	var mouse = {x: 0, y: 0};
	var last_mouse = {x: 0, y: 0};

	/* Mouse Capturing Work */ //corregir el x y el y respecto al 0,0
	canvas.addEventListener( 'mousemove', function(e) {
		last_mouse.x = mouse.x;
		last_mouse.y = mouse.y;

		mouse.x = e.pageX - this.offsetLeft - 337; //aqui lo corregimos
		mouse.y = e.pageY - this.offsetTop - 45; //aqui se corrige
	}, false);

	/* Drawing on Paint App */
	ctx.lineWidth =     2;
	ctx.lineJoin =      'round';
	ctx.lineCap =       'round';
	ctx.strokeStyle =   '#b6c4d1';
	
	canvas.addEventListener( 'mousedown', function(e) {
		canvas.addEventListener( 'mousemove', onPaint, false );
	}, false);
	
	canvas.addEventListener('mouseup', function() {
		canvas.removeEventListener('mousemove', onPaint, false);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height); //limpiar el canvas para el reload
        //console.log( 'fin del dibujado' );
        
        $( '#sketch, #texto22, #mano' ).hide();
        $( '#calling, #texto23, #speaker' ).addClass( 'visible' );
        lanzarSonido();
        
	}, false);
	
	var onPaint = function() {
		ctx.beginPath();
		ctx.moveTo(last_mouse.x, last_mouse.y);
		ctx.lineTo(mouse.x, mouse.y);
		ctx.closePath();
		ctx.stroke();
	};
    
    //audio--------------------------
    audio = document.getElementById( 'phoneSound' );
    
    document.getElementById( 'speaker' ).addEventListener( 'click', function (e) {
        e = e || window.event;
        audio.muted = !audio.muted;
        e.preventDefault();
    }, false);
    
    $( '#speaker' ).on( 'click',function(){
        var $this =             $( this );
        $this.toggleClass( 'click' );
    });
    audio.addEventListener( 'ended', function(){
        //audio.currentTime = 0;
        //console.log( 'fin audio' );
        finAudio();
     });
    
    ///reload---------------------
    $( '#reload' ).on( 'click',function(){

        $( '#sketch, #texto22, #mano, #texto31, #texto32, #texto33, #texto34, #texto35' ).css( 'display', '' );
        stopAnimation( 'animado2' );
        stopAnimation( 'animado' );
        stopAudio();
        //stopAnimations

        $( '#secuencia3, #calling, #texto23, #speaker, #reload' ).removeClass( 'visible' );
    });
    
    //$( '#skip' ).on( 'click', function(){
    //    $( '#secuencia2' ).addClass( 'animadoYa' );
    //    $( '#secuencia2' ).removeClass( 'animado' );
    //});
    
}); //ready