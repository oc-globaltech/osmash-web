import * as THREE from "three";

import type { ScenePose } from "./params";

const { degToRad } = THREE.MathUtils;

// Places the camera on a sphere around the target (azimuth about +Y from +Z, elevation above the ground plane),
// looks at the target, then rolls about the view axis.
export function applyOrbit(camera: THREE.PerspectiveCamera, pose: ScenePose): void {
  const azimuth = degToRad(pose.azimuth);
  const elevation = degToRad(pose.elevation);
  const ground = pose.distance * Math.cos(elevation);
  camera.position.set(
    pose.targetX + ground * Math.sin(azimuth),
    pose.targetY + pose.distance * Math.sin(elevation),
    pose.targetZ + ground * Math.cos(azimuth),
  );
  camera.lookAt(pose.targetX, pose.targetY, pose.targetZ);
  camera.rotateZ(degToRad(pose.roll));
  if (camera.fov === pose.fov) return;
  camera.fov = pose.fov;
  camera.updateProjectionMatrix();
}
