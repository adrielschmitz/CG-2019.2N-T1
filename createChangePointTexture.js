export default function createChangeTeacherTexture() {
  var point_material = new THREE.MeshBasicMaterial();

  var pill = new THREE.TextureLoader().load("images/bins/pill_icon.png");

  var dota2 = new THREE.TextureLoader().load("images/emilio/dota2.png");

  var bueno = new THREE.TextureLoader().load("images/marco/bueno.png");

  function handleTeacherTexture(teacher_id) {
    const accepted_textures = {
      Bins(point_material) {
        console.log('point_texture', teacher_texture)
        point_material.map = pill;
      },
      Emilio(point_material) {
        point_material.map = dota2;
      },
      Marco(point_material) {
        point_material.map = bueno;
      }
    }

    const teacher_texture = accepted_textures[teacher_id];

    if (teacher_texture) teacher_texture(point_material)
  };

  var point = handleTeacherTexture('Bins')

  console.log('point', point)
} 