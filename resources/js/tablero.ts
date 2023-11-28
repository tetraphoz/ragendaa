import * as THREE from 'three';

class PongGame {
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private puck: THREE.Mesh;
  private leftPaddle: THREE.Mesh;
  private rightPaddle: THREE.Mesh;
  private leftScore: number;
  private rightScore: number;
  private currentDirection: boolean;
    private ballSpeed: number;
    private ballDirection: number;

  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize( window.innerWidth / 2, window.innerHeight / 2);
    // document.body.appendChild(this.renderer.domElement);
      document.getElementById("juego").appendChild(this.renderer.domElement)

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.name = 'camera';
    this.camera.position.set(0, 15, 0);
      this.camera.rotation.set(0, 1, 0);

    this.createCubo();
    this.createRaquetas();
    this.createLight();

    // this.initEventListeners();
  }

  private createCubo() {
    const puckGeometry = new THREE.BoxGeometry(1, 1, 1);
    const puckMaterial = new THREE.MeshPhongMaterial({ color: 'white' });
    this.puck = new THREE.Mesh(puckGeometry, puckMaterial);
    this.puck.position.set(0, 0, -19);
    this.scene.add(this.puck);
  }

  private createRaquetas() {
    const leftPaddleMaterial = new THREE.MeshPhongMaterial({ color: 'blue' });
    const racketGeometry = new THREE.BoxGeometry(8, 1, 1);
    const rightPaddleMaterial = new THREE.MeshPhongMaterial({ color: 'red' });

    this.leftPaddle = new THREE.Mesh(racketGeometry, leftPaddleMaterial);
    this.rightPaddle = new THREE.Mesh(racketGeometry, rightPaddleMaterial);

    this.leftPaddle.position.set(0, 0, 10);
    this.rightPaddle.position.set(0, 0, -20);

    this.scene.add(this.rightPaddle, this.leftPaddle);
  }

  private createLight() {
    const light1 = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
    this.scene.add(light1);
  }


  // private initEventListeners() {
  //   document.addEventListener('mousemove', (event) => {
  //     this.leftPaddle.position.x = event.clientX / 20 - 50;
  //   });
  // }
    private movePaddle(): void {}
    private moveBall(): void {
        this.puck.position.set
    }

private startGame(): void {

}

  private handleCollisions(): void {

  }


public init(): void {
  this.renderer.render(this.scene, this.camera);
  requestAnimationFrame(() => this.init());
}


}

// // Create an instance of the PongGame class and initialize the game
const pongGame = new PongGame();
pongGame.init();
