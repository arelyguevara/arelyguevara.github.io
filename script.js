// initializes scene, light and renderer variables
let scene, light, renderer;

// initializes window sizes 
var windowInnerWidth = 0;
var windowInnerHeight = 0;
var windowOuterHeight = 0;

// create renderer and set the size of it
renderer	= new THREE.WebGLRenderer({
	antialias	: true
});
renderer.setSize( window.innerWidth, window.innerHeight );

// appends the render to the body
document.body.appendChild( renderer.domElement );
// creates the scene
scene	= new THREE.Scene();

// initializes empty array
var onRenderFcts= [];

// creates a perspective camera at a certain position
camera	= new THREE.PerspectiveCamera(25, window.innerWidth /    window.innerHeight, 0.1, 100);
camera.position.z = 15;
camera.position.y = 2;

// sets up a light
light	= new THREE.DirectionalLight('white', 1.5)
light.position.set(0.5, 0.5, 2)
scene.add( light )

// creates the terrain
var heightMap	= THREEx.Terrain.allocateHeightMap(256,256)
THREEx.Terrain.simplexHeightMap(heightMap)
var geometry	= THREEx.Terrain.heightMapToPlaneGeometry(heightMap)
THREEx.Terrain.heightMapToVertexColor(heightMap, geometry)

// THREE material
var material	= new THREE.MeshNormalMaterial({ wireframe: true});
var mesh	= new THREE.Mesh( geometry, material );
scene.add( mesh );
mesh.lookAt(new THREE.Vector3(0,1,0));

// scales the scalar
mesh.scale.y	= 3.5;
mesh.scale.x	= 3;
mesh.scale.z	= 0.20;
mesh.scale.multiplyScalar(10);

// function to be called on every render
onRenderFcts.push(function(delta, now){
	mesh.rotation.x += 0.2 * delta;
    // mesh.rotation.x = 30.65;
})
onRenderFcts.push(function(){
	// displays actual scene on page
	renderer.render( scene, camera );
})

var lastTimeMsec = null;
requestAnimationFrame(function animate(nowMsec){
	requestAnimationFrame( animate );
	lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
	var deltaMsec	= Math.min(200 , nowMsec - lastTimeMsec)
	lastTimeMsec	= nowMsec
	onRenderFcts.forEach(function(onRenderFct){
		onRenderFct(deltaMsec/1000, nowMsec/1000)
	})
})

// stores window sizes
windowInnerWidth = window.innerWidth;
windowInnerHeight = window.innerHeight;
windowOuterHeight = window.outerHeight;

// event listener for resize with callback
window.addEventListener('resize', onWindowResize)

// create resize function
function onWindowResize(){
	// basically if sizes don't match up then assign actual window sizes to the variables and updateProjectionMatrix in order to take effect 
	if(window.innerWidth != windowInnerWidth || window.outerHeight != windowOuterHeight){
	  windowOuterHeight = window.outerHeight;
	  windowInnerWidth = window.innerWidth;
	  windowInnerHeight = window.innerHeight;
  
	  camera.aspect = window.innerWidth / window.innerHeight;
	  camera.updateProjectionMatrix();
  
	  renderer.setSize(window.innerWidth, window.innerHeight);
	}
  }