import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { RGBShiftShader } from 'three/addons/shaders/RGBShiftShader.js';
import { DotScreenShader } from 'three/addons/shaders/DotScreenShader.js';

class PongGame {
    private renderer: THREE.WebGLRenderer;
    private camera: THREE.PerspectiveCamera;
    private scene: THREE.Scene;
    private puck: THREE.Mesh;
    private leftPaddle: THREE.Mesh;
    private rightPaddle: THREE.Mesh;
    private leftScore: number;
    private rightScore: number;
    private ballSpeed: number;
    private ballDirectionX: number;
    private ballDirectionZ: number;
    private composer: THREE.EffectComposer;

    constructor(jugadorInicial: number) {
        this.setupTablero();
        this.setupJugadores();

        this.ballDirectionZ = jugadorInicial;
        this.ballDirectionX = 0;
        this.ballSpeed = 0.1;
        this.leftScore = 0;
        this.rightScore = 0;

        this.init();

    }

    private setupJugadores(){
        this.movePaddle();
    }

    private setupTablero(){
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
        document.getElementById("juego").appendChild(this.renderer.domElement);

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.name = 'camera';
        this.camera.position.set(0, 4, 25);

        this.createCubo();
        this.createRaquetas();
        this.createLight();

        this.composer = new EffectComposer( this.renderer );

        this.composer.addPass( new RenderPass( this.scene, this.camera ) );

        const effect2 = new ShaderPass( RGBShiftShader );
        effect2.uniforms[ 'amount' ].value = 0.0015;
        this.composer.addPass( effect2 );

        const effect3 = new OutputPass();
        this.composer.addPass( effect3 );
    }

    private onWindowResize(scale: number) {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( window.innerWidth / scale, window.innerHeight / scale);
        this.composer.setSize( window.innerWidth / scale, window.innerHeight / scale);
    }

    private createCubo() {
        const puckGeometry = new THREE.BoxGeometry(1, 1, 1);
        const puckMaterial = new THREE.MeshPhongMaterial({ color: 'white' });
        this.puck = new THREE.Mesh(puckGeometry, puckMaterial);
        this.puck.position.set(0, 0, 0);
        this.scene.add(this.puck);
    }

    private createRaquetas() {
        const leftPaddleMaterial = new THREE.MeshPhongMaterial({ color: 'blue' });
        const rightPaddleMaterial = new THREE.MeshPhongMaterial({ color: 'red' });

        const racketGeometry = new THREE.BoxGeometry(8, 1, 1);
        this.leftPaddle = new THREE.Mesh(racketGeometry, leftPaddleMaterial);
        this.rightPaddle = new THREE.Mesh(racketGeometry, rightPaddleMaterial);

        this.leftPaddle.position.set(0, 0, 20);
        this.rightPaddle.position.set(0, 0, -20);

        this.scene.add(this.rightPaddle, this.leftPaddle);
    }

    private createLight() {
        const light = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
        this.scene.add(light);
    }

    private toggleFullscreen(): void {
        const element = document.getElementById("juego") || document.body;

        if (element.requestFullscreen) {
            element.requestFullscreen().then(() => {
                const controls = new PointerLockControls(this.camera, document.body);
                controls.lock();
            });
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }

        // Listen for the fullscreenchange event
        document.addEventListener('fullscreenchange', () => {
            if (document.fullscreenElement) {
                // The window is in fullscreen mode
                this.onWindowResize(1);
            } else {
                // The window is not in fullscreen mode
                this.onWindowResize(2);
            }
        });
    }

    private movePaddle(): void {
        const controls = new PointerLockControls(this.camera, document.body);
        this.scene.add(controls.getObject());

        document.getElementById("juego") .addEventListener('click', () => {
            controls.lock();
            this.toggleFullscreen()
        });

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        controls.addEventListener('change', () => {
            // Calculate mouse coordinates in normalized device coordinates (NDC)
            mouse.x = 0;
            mouse.y = 0;

            // Update the raycaster with the mouse coordinates
            raycaster.setFromCamera(mouse, this.camera);

            // Check for intersection with the z=0 plane
            const intersection = new THREE.Vector3();
            raycaster.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), intersection);

            // Update the paddle position based on the intersection point
            this.leftPaddle.position.x = intersection.x;

            // Ensure the paddle stays within certain bounds if needed
            // For example:
            this.leftPaddle.position.x = Math.max(Math.min(this.leftPaddle.position.x, 15), -15);
            });
    }

    private gameLoop(): void {
        console.log(this.puck.position);
        this.puck.position.z += this.ballDirectionZ;
        this.puck.position.x += this.ballDirectionX;
        this.handleCollisions();
    }

    private handleCollisions(): void {
        console.log(Math.abs(this.puck.position.x - this.leftPaddle.position.x));
        if (this.puck.position.z >= 19.5 && this.puck.position.z <= 30){
            if( Math.abs(this.puck.position.x - this.leftPaddle.position.x) < 4) {
                this.ballDirectionZ *= -1;
                this.ballSpeed += 0.01; // Increase ball speed on successful hit
                // this.ballDirectionX = this.leftPaddle.userData.speedX; // Use paddle speed for x-direction
            } else {
                console.log(this.rightScore);
                this.rightScore++;
                this.scoreVisualEffect();
                this.resetPuck();
            }
        }

        if (this.puck.position.z <= -19.5 && this.puck.position.z >= -30){
            if( Math.abs(this.puck.position.x - this.rightPaddle.position.x) < 4){
                this.ballDirectionZ *= -1;
                this.ballSpeed += 0.01; // Increase ball speed on successful hit
                // this.ballDirectionX = this.leftPaddle.userData.speedX; // Use paddle speed for x-direction
            } else {
                console.log(this.rightScore);
                this.leftScore++;
                this.resetPuck();
            }
        }
    }
private scoreVisualEffect(): void {
    const scoringDuration = 1000; // Adjust the duration in milliseconds

    // Perform the scoring visual effect
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    const glitchPass = new GlitchPass();
    this.composer.addPass(glitchPass);

    const outputPass = new OutputPass();
    this.composer.addPass(outputPass);

    // Set a timer to remove the scoring effect after the specified duration
    setTimeout(() => {
        // Remove the scoring effect passes
        this.composer.passes.pop();
        this.composer.passes.pop();
        this.composer.passes.pop();
    }, scoringDuration);
}

    private resetPuck(): void {
        this.puck.position.set(0, 0, 0);
        this.ballSpeed = 0.01;
        this.ballDirectionZ *= -1;
        this.ballDirectionX = 0; // Reset ballDirectionX

        if (this.leftScore >= 3 || this.rightScore >= 3) {
            // You can handle the end of the game here
            // For example: alert("Game Over");
        }
    }

    public init(): void {
        const animate = () => {
            requestAnimationFrame(animate);
            this.gameLoop();
            this.composer.render();
        };

        animate();
    }
}

const pongGame = new PongGame(1);
pongGame.init();
