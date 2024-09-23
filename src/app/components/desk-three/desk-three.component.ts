import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-desk-three',
  templateUrl: './desk-three.component.html',
  styleUrls: ['./desk-three.component.scss']
})
export class DeskThreeComponent implements OnInit {
  @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef;
  isMobile: boolean = false;
  objectToRotate: THREE.Object3D | undefined;

  constructor() { }

  ngOnInit(): void {
    this.isMobile = this.detectMobile(); // Detect if it's a mobile device
    this.initThree();
  }

  initThree(): void {
    const scene = new THREE.Scene();

    // Set a transparent background
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); // Enable antialiasing
    const width = this.isMobile ? window.innerWidth : window.innerWidth / 1.5;
    const height = this.isMobile ? window.innerHeight : window.innerHeight / 1.5;
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio * 2); // Increase pixel ratio for high-density displays
    this.rendererContainer.nativeElement.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    const controls = new OrbitControls(camera, renderer.domElement);

    // Add ambient light to the scene with increased intensity
    const ambientLight = new THREE.AmbientLight(0xffffff, 6); // Higher intensity
    scene.add(ambientLight);

    const mtlLoader = new MTLLoader();
    mtlLoader.load(
      'assets/3d/desk-3d.mtl',
      (materials) => {
        materials.preload();
        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);

        objLoader.load(
          'assets/3d/desk-3d.obj',
          (obj) => {
            this.objectToRotate = obj;
            scene.add(this.objectToRotate);
          },
          (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
          },
          (error) => {
            console.error('An error happened', error);
          }
        );
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      (error) => {
        console.error('An error happened', error);
      }
    );

    camera.position.x = 0; // Centered x position
    camera.position.y = 1; // Adjusted y position to center the scene vertically
    camera.position.z = 5; // Adjusted z position for better viewing on desktop

    if (this.isMobile) {
      camera.position.z = 8; // Adjusted z position for better viewing on mobile
    }

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      if (this.objectToRotate) {
        // Rotate the object around the y-axis
        this.objectToRotate.rotation.y -= 0.001;
      }
      renderer.clear();
      renderer.render(scene, camera);
    };

    animate();
  }

  detectMobile(): boolean {
    return window.innerWidth <= 768; // Adjust this threshold as needed
  }
}
