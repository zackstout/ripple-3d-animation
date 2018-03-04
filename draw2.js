var THREE = require('three');
var OrbitControls = require('three-orbit-controls')(THREE);

var size = 40;
// -Global variables-
var pos = new THREE.Vector3();
pos.z = -size/2;
pos.x = -size;
var color = new THREE.Color("rgb(100, 50, 30)");
// var color2 = new THREE.Color("rgb(0, 0, 255)");
var color2 = new THREE.Color("rgb(255, 0, 0)");
var geometry, cube;
var material = new THREE.MeshLambertMaterial( { color: color } );
var rects = [];

var material2 = new THREE.MeshLambertMaterial( { color: color2 } );

var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xB0E0E6 );
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// camera.position.z = 45;
camera.position.y = 10;
camera.position.x = 5;
// var offset = 0;
var t = 0;

var controls = new OrbitControls( camera );
controls.target.set( 0, 2, 0 );
controls.update();

var light = new THREE.PointLight(0xffffff);
light.position.set(5,10,5);
scene.add(light);

for (var i=0; i < size + 1; i++) {
  pos.z = -size/2;
  for (var j=0; j < size + 1; j++) {

    var offset = Math.pow(Math.pow(i - size/2, 2) + Math.pow(j - size/2, 2), 0.5) / 1.5;

    var height = 2 * Math.sin(t - offset) + 2;
    // geometry = new THREE.BoxGeometry(1, 2 + 2* Math.sin(t + offset), 1);
    geometry = new THREE.BoxGeometry(1, 2, 1);

    if (i == size/2 && j == size/2) {
      cube = new THREE.Mesh( geometry, material );
      // console.log('yay', pos);
      // center is (-9, 0, 1)
    } else {
      cube = new THREE.Mesh( geometry, material2 );

    }
    cube.position.copy( pos );
    cube.receiveShadow = true;
    cube.castShadow = true;

    cube.scale.y = height;

    cube.offset = offset;

    rects.push(cube);
    scene.add(cube);
    pos.z += 1.1;
  }
  // pos.z = -10;
  pos.x += 1.1;
  // offset += 0.37;
}
console.log(rects);

// rects.forEach(function(rec) {
  // console.log(rec.geometry.parameters.height);
// });


// function animate() {
//   requestAnimationFrame( animate );
//   renderer.render( scene, camera );
// }


// Ok , in order to make more efficient we clearly have to remove the double for loop from animate. So what do we put in its place? We don't have to recreate the rectangle each frame, just change its height.
var animate = function () {
  setTimeout( function() {

    rects.forEach(function(rect) {
      //swap sign to change to ripple:
      var height = 2 * Math.sin(t - rect.offset) + 2;
      rect.scale.y = height;
    });

    t += 0.2;

    requestAnimationFrame( animate );

  }, 50 );  renderer.render(scene, camera);

};

animate();
