import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const TINT_COLOR = 0xffffff;
// The room is far brighter than the HDRI it replaced; scaled so the hero measures the same exposure.
const ROOM_EXPOSURE = 0.03;
// A small, very bright panel up and to the left stands in for the HDRI's sun: without it the room lights the shuttles flat.
const SUN_PANEL = { intensity: 6000, position: [-6, 10, 10], size: [1, 0.1, 1] } as const;

// Shared shader uniforms: every scene material multiplies its indirect light by these.
export type EnvironmentTint = {
  color: THREE.IUniform<THREE.Color>;
  strength: THREE.IUniform<number>;
};

export function createEnvironmentTint(): EnvironmentTint {
  return { color: { value: new THREE.Color(TINT_COLOR).multiplyScalar(ROOM_EXPOSURE) }, strength: { value: 1 } };
}

export function applyEnvironmentTint(material: THREE.Material, tint: EnvironmentTint): void {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.tintColor = tint.color;
    shader.uniforms.tintStrength = tint.strength;
    shader.fragmentShader =
      `
		uniform vec3 tintColor;
		uniform float tintStrength;
		` + shader.fragmentShader;
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <lights_fragment_end>",
      `
		#include <lights_fragment_end>
		reflectedLight.indirectDiffuse *= tintColor * tintStrength;
		reflectedLight.indirectSpecular *= tintColor * tintStrength;
		`,
    );
  };
}

function createSunPanel(): THREE.Mesh {
  const material = new THREE.MeshBasicMaterial();
  material.color.setScalar(SUN_PANEL.intensity);
  const panel = new THREE.Mesh(new THREE.BoxGeometry(), material);
  panel.position.set(...SUN_PANEL.position);
  panel.scale.set(...SUN_PANEL.size);
  return panel;
}

// Prefilters a procedural studio room into scene.environment (room.dispose() also frees the sun panel); returns a disposer for the PMREM resources.
export function createEnvironment(renderer: THREE.WebGLRenderer, scene: THREE.Scene): () => void {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment(renderer);
  room.add(createSunPanel());
  const envMap = pmremGenerator.fromScene(room).texture;
  room.dispose();
  scene.environment = envMap;
  return () => {
    envMap.dispose();
    pmremGenerator.dispose();
  };
}
