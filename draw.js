
var THREE = require('three');
var OrbitControls = require('three-orbit-controls')(THREE);

// -Global variables-
var pos = new THREE.Vector3();
pos.z = -10;
pos.x = -20;
var color = new THREE.Color("rgb(100, 50, 30)");
var color2 = new THREE.Color("rgb(0, 0, 255)");
var geometry, cube;
var material = new THREE.MeshLambertMaterial( { color: color } );

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
var offset = 0;
var t = 0;
// camera.rotation.x = Math.PI / 2;




var controls = new OrbitControls( camera );
controls.target.set( 0, 2, 0 );
controls.update();

var light = new THREE.PointLight(0xffffff);
light.position.set(5,10,5);
scene.add(light);

function animate() {
  t += 0.05;
  for (var i=0; i < 21; i++) {
    pos.z = -10;
    for (var j=0; j < 21; j++) {
      // geometry = new THREE.BoxGeometry(1, 2 + 2* Math.sin(t + offset), 1);
      geometry = new THREE.BoxGeometry(1, 2 , 1);

      if (i == 10 && j == 10) {
        cube = new THREE.Mesh( geometry, material );
        // console.log('yay', pos);
        // center is (-9, 0, 1)
      } else {
        cube = new THREE.Mesh( geometry, material2 );

      }
      cube.position.copy( pos );
      cube.receiveShadow = true;
      cube.castShadow = true;

      scene.add( cube );
      pos.z += 1.1;
    }
    pos.z = -10;
    pos.x += 1.1;
    offset += 0.37;
  }
  pos.x = 0;
  // for (var i=0; i < 20; i++) {
  //   pos.z = -10;
  //   for (var j=0; j < 20; j++) {
  //     geometry = new THREE.BoxGeometry(1, Math.sin(t + offset), 1);
  //     cube = new THREE.Mesh( geometry, material2 );
  //     cube.position.copy( pos );
  //     cube.receiveShadow = true;
  //     cube.castShadow = true;
  //     scene.add( cube );
  //     pos.z += 1.1;
  //   }
  //   pos.x += 1.1;
  //   offset += 0.2;
  // }
  //
  // pos.x = -20;
  // pos.z= -10;

  requestAnimationFrame( animate );
  renderer.render( scene, camera );
}

animate();
