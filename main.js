var scene = new THREE.Scene();
var scene_size = new THREE.Vector2(0, 0);

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#000");
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.getSize(scene_size);

document.body.appendChild(renderer.domElement);
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
  renderer.getSize(scene_size);
});

var light = new THREE.PointLight(0xFFFFFF, 1, 1000);
light.position.set(0, 0, 0);
scene.add(light);

var geometry = new THREE.BoxGeometry(1, 5, 1);
var material_2 = new THREE.MeshBasicMaterial({ depthWrite: false, depthTest: false })

var rigth_cube = new THREE.Mesh(geometry, material_2)
rigth_cube.position.set(4.5, 0, 0.5);
// scene.add(rigth_cube)
var left_cube = new THREE.Mesh(geometry, material_2)
left_cube.position.set(-4.5, 0, 0.5);
// scene.add(left_cube)

var geometry_2 = new THREE.BoxGeometry(9, 1, 1);
var top_cube = new THREE.Mesh(geometry_2, material_2)
top_cube.position.set(0, 2.5, 0.5);
var bottom_cube = new THREE.Mesh(geometry_2, material_2)
bottom_cube.position.set(0, -2.5, 0.5);



const isInContainer = () => {
  var robotBB = new THREE.Box3().setFromObject(circle);
  var homeBB = new THREE.Box3().setFromObject(cube);
  var robotIsHome = homeBB.containsBox(robotBB);

  return robotIsHome;
}

const isCollider = (teste_cube) => {
  const circle_BB = new THREE.Box3().setFromObject(circle);
  const cube_BB = new THREE.Box3().setFromObject(teste_cube);
  const is_collide = cube_BB.containsBox(circle_BB);
  
  return is_collide;
}

function movePlayer(comand) {
  const accepted_moves = {
    ArrowUp() {
      if (!isCollider(top_cube)) circle.translateY(0.05);
    },
    ArrowDown() {
      if (!isCollider(bottom_cube)) circle.translateY(-0.05);
    },
    ArrowLeft() {
      if (!isCollider(left_cube)) circle.translateX(-0.05);
    },
    ArrowRight() {
      if (!isCollider(rigth_cube)) circle.translateX(0.05);
    },
    Enter() {
      var robotBB = new THREE.Box3().setFromObject(circle);
      var homeBB = new THREE.Box3().setFromObject(cube);
      var robotIsHome = homeBB.containsBox(robotBB);
      console.log(robotIsHome)
    }
  };

  // agora quando eu precisar colocar mais uma tecla, é só colocar mais um objeto e 
  // implementar a regra de negócio, não preciso verificar mais em lugar nenhum se tem 
  // ou não a tecla e tudo mais. Isso deixa o código com a menor fricção possível

  const key_press = comand.key;
  const moveFunction = accepted_moves[key_press];

  if (moveFunction)  moveFunction();
}

function handleKeydown(event) {
  movePlayer(event)
  console.log('Tecla pressionada: ', event.key)
}

document.addEventListener('keydown', handleKeydown, false);

var geometry = new THREE.BoxGeometry(8.5, 4.5, 0.00001);
var material1 = new THREE.MeshBasicMaterial({ depthWrite: false, depthTest: false })
var cube = new THREE.Mesh(geometry, material1)
cube.position.set(0, 0, 0)
// scene.add(cube)

var geometry = new THREE.CircleGeometry(0.1, 32);
var material = new THREE.MeshBasicMaterial( {color: 0xffff00 });
var circle = new THREE.Mesh(geometry, material);
scene.add(circle);


var edges = new THREE.EdgesGeometry( cube.geometry );
var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
scene.add(line);


// var geo = new THREE.EdgesGeometry( object.geometry );
// var mat = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 4 } );
// var wireframe = new THREE.LineSegments( geo, mat );
// wireframe.renderOrder = 1; // make sure wireframes are rendered 2nd
// object.add( wireframe );



var render = function () {
  // caso a aba do navegador não esteja ativa, o navegador chama essa função menos para poupar processamento, energia e etc...
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();