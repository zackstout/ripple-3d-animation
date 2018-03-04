var THREE = require('three');
var OrbitControls = require('three-orbit-controls')(THREE);

// -Global variables-
var pos = new THREE.Vector3();
pos.z = -10;
pos.x = -20;
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

for (var i=0; i < 21; i++) {
  pos.z = -10;
  for (var j=0; j < 21; j++) {

    var offset = Math.pow(Math.pow(i - 10, 2) + Math.pow(j - 10, 2), 0.5) / 1.5;

    var height = 2 * Math.sin(t + offset) + 2;
    // geometry = new THREE.BoxGeometry(1, 2 + 2* Math.sin(t + offset), 1);
    geometry = new THREE.BoxGeometry(1, 2, 1);

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
    // while(scene.children.length > 0){
    //   scene.remove(scene.children[0]);
    // }
    rects.forEach(function(rect) {
      var height = 2 * Math.sin(t + rect.offset) + 2;

      rect.scale.y = height;
    });
    // var controls = new OrbitControls( camera );
    // controls.target.set( 0, 2, 0 );
    // controls.update();
    //
    // var light = new THREE.PointLight(0xffffff);
    // light.position.set(5,10,5);
    // scene.add(light);
    // rects.forEach(function(rec) {
    //   rec.geometry.parameters.height = 1;
    // });
    t += 0.2;
    // pos.x = -20;
    // for (var i=0; i < 21; i++) {
    //   pos.z = -10;
    //   for (var j=0; j < 21; j++) {
    //
    //     var offset = Math.pow(Math.pow(i - 10, 2) + Math.pow(j - 10, 2), 0.5) / 1.5;
    //     var height = 2 * Math.sin(t + offset) + 2;
    //     // geometry = new THREE.BoxGeometry(1, 2 + 2* Math.sin(t + offset), 1);
    //     geometry = new THREE.BoxGeometry(1, height, 1);
    //
    //     if (i == 10 && j == 10) {
    //       cube = new THREE.Mesh( geometry, material );
    //       // console.log('yay', pos);
    //       // center is (-9, 0, 1)
    //     } else {
    //       cube = new THREE.Mesh( geometry, material2 );
    //
    //     }
    //     cube.position.copy( pos );
    //     cube.receiveShadow = true;
    //     cube.castShadow = true;
    //
    //     scene.add( cube );
    //     pos.z += 1.1;
    //   }
    //   // pos.z = -10;
    //   pos.x += 1.1;
    //   // offset += 0.37;
    // }
    //
    // t += 0.2;

    requestAnimationFrame( animate );

  }, 50 );  renderer.render(scene, camera);

};

animate();
