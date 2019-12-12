export default function createChangeTeacherTexture() {
  var teacher_material = new THREE.MeshBasicMaterial();

  var bins_face = new THREE.TextureLoader().load("images/bins/bins_face.png");

  var emilio_face = new THREE.TextureLoader().load("images/emilio/emilio_face.png");

  var marco_face = new THREE.TextureLoader().load("images/marco/marco_face.png");

  function handleTeacherTexture(teacher_id) {
    const accepted_textures = {
      Bins(teacher_material) {
        console.log('teacher_texture', teacher_texture)
        teacher_material.map = bins_face;
      },
      Emilio(teacher_material) {
        teacher_material.map = emilio_face;
      },
      Marco(teacher_material) {
        teacher_material.map = marco_face;
      }
    } 

    const teacher_texture = accepted_textures[teacher_id];

    if (teacher_texture) teacher_texture(teacher_material)
  };

  var player = handleTeacherTexture('Bins')

  console.log('player', player)
}