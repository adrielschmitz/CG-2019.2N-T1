var scene = new THREE.Scene();
var scene_size = new THREE.Vector2(0, 0);

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#e5e5e5");
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

var geometry = new THREE.CircleGeometry(0.1, 32);
var material = new THREE.MeshBasicMaterial( {color: 0xffff00 });
var circle = new THREE.Mesh(geometry, material);
scene.add(circle);

var player = new THREE.Vector2(0, 0);

function movePlayer(comand) {
  const accepted_moves = {
    ArrowUp(player) {
      if (player.y - 1 >= (scene_size.y / 2) * -1) circle.translateY(0.1);
    },
    ArrowDown(player) {
      if (player.y + 1 < (scene_size.y / 2)) circle.translateY(-0.1);
    },
    ArrowLeft(player) {
      if (player.x + 1 > (scene_size.x / 2) * -1) circle.translateX(-0.1);
    },
    ArrowRight(player) {
      if (player.x + 1 < (scene_size.x / 2)) circle.translateX(0.1);
    }
  };

  // agora quando eu precisar colocar mais uma tecla, é só colocar mais um objeto e 
  // implementar a regra de negócio, não preciso verificar mais em lugar nenhum se tem 
  // ou não a tecla e tudo mais. Isso deixa o código com a menor fricção possível

  const key_press = comand.key;
  const moveFunction = accepted_moves[key_press];

  if (moveFunction)  moveFunction(player);
}

function handleKeydown(event) {
  movePlayer(event)
  console.log('Tecla pressionada: ', event.key)
}

document.addEventListener('keydown', handleKeydown, false);

var render = function () {
  // caso a aba do navegador não esteja ativa, o navegador chama essa função menos para poupar processamento, energia e etc...
  requestAnimationFrame(render);
  renderer.render(scene, camera);

  // circle.position.set(player.x, player.y, 0);
  // circle.updateMatrix();
}

render();