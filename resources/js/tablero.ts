import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { RGBShiftShader } from 'three/addons/shaders/RGBShiftShader.js';
import { DotScreenShader } from 'three/addons/shaders/DotScreenShader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'

const csrfToken = document.head.querySelector('meta[name="csrf-token"]').getAttribute('content');

class PongGame {
    private renderer: THREE.WebGLRenderer;
    private camera: THREE.PerspectiveCamera;
    private scene: THREE.Scene;
    private puck: THREE.Mesh;
    private bluePaddle: THREE.Mesh;
    private redPaddle: THREE.Mesh;
    private puntajeRojo: THREE.Mesh;
    private puntajeAzul: THREE.Mesh;
    private blueScore: number;
    private redScore: number;
    private ballSpeed: number;
    private ballDirectionX: number;
    private ballDirectionZ: number;
    private composer: THREE.EffectComposer;
    private loader: THREE.FontLoader;
    private font: THREE.Font;
    private countdown: number;
    private countdownText: THREE.Mesh;

    private async initFont(): Promise<void> {
        return new Promise((resolve) => {
            this.loader = new FontLoader();
            this.loader.load('ibm.json', (font) => {
                this.font = font;
                resolve();
            });
        });
    }

    constructor() {

        this.initFont();

        this.setupTablero();
        this.movePaddle();

        this.resetPuck();

        this.blueScore = 0;
        this.redScore = 0;
        this.countdown = 5; // Initial countdown value
    }

    private initCountdownText(): void {
        const countdownGeometry = new TextGeometry(`${this.countdown}`, {
            font: this.font,
            size: 20,
            height: 5,
            curveSegments: 0,
            bevelEnabled: false,
            bevelThickness: 0,
            bevelSize: 0,
            bevelOffset: 0,
            bevelSegments: 0,
        });

        const countdownMaterial = new THREE.MeshPhongMaterial({ color: 'white' });
        this.countdownText = new THREE.Mesh(countdownGeometry, [
            countdownMaterial,
            countdownMaterial,
        ]);

        this.countdownText.position.set(-5, 10, 10);
        this.scene.add(this.countdownText);
    }

    private updateCountdownText(text: string): void {
        // Update the countdown text mesh
        this.countdownText.geometry = new TextGeometry(text, {
            font: this.font,
            size: 20,
            height: 5,
            curveSegments: 0,
            bevelEnabled: false,
            bevelThickness: 0,
            bevelSize: 0,
            bevelOffset: 0,
            bevelSegments: 0,
        });
    }

    private startCountdown(): void {
        const countdownInterval = setInterval(() => {
            this.countdown--;

            if (this.countdown === 0) {
                clearInterval(countdownInterval);
                this.updateCountdownText("");
                this.scene.remove(this.countdownText);
                this.startGame();
            } else {
                this.updateCountdownText(this.countdown.toString());
            }
        }, 1000);
    }


    private mostrarPuntaje(): void {

            if(this.scene.getObjectByName("puntajeRojo")){
                this.scene.remove(this.scene.getObjectByName("puntajeRojo"));
                this.scene.remove(this.scene.getObjectByName("puntajeAzul"));
            }

            this.puntajeRojo = new TextGeometry(`${this.redScore}`, {
                font: this.font,
                size: 10,
                height: 1,
                curveSegments: 0,
                bevelEnabled: false,
                bevelThickness: 0,
                bevelSize: 0,
                bevelOffset: 0,
                bevelSegments: 0,
            });

            this.puntajeAzul = new TextGeometry(`${this.blueScore}`, {
                font: this.font,
                size: 10,
                height: 1,
                curveSegments: 0,
                bevelEnabled: false,
                bevelThickness: 0,
                bevelSize: 0,
                bevelOffset: 0,
                bevelSegments: 0,
            });

            const MeshPuntajeRojo = new THREE.Mesh(this.puntajeRojo, [
                new THREE.MeshPhongMaterial({ color: 'white' }),
                new THREE.MeshPhongMaterial({ color: 'white' }),
            ]);

            const MeshPuntajeAzul = new THREE.Mesh(this.puntajeAzul, [
                new THREE.MeshPhongMaterial({ color: 'white' }),
                new THREE.MeshPhongMaterial({ color: 'white' }),
            ]);

            MeshPuntajeAzul.position.set(-40, 0, 0);
            MeshPuntajeRojo.position.set(40, 0, 0);

            this.scene.add(MeshPuntajeAzul);
            this.scene.add(MeshPuntajeRojo);

            MeshPuntajeAzul.name = "puntajeAzul";
            MeshPuntajeRojo.name = "puntajeRojo";

    }

    private setupTablero(){
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("juego").appendChild(this.renderer.domElement);

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.name = 'camera';
        this.camera.position.set(0, 4, 25);

        this.createCubo();
        this.createRaquetas();
        this.createLight();
        this.mostrarPuntaje();

        this.composer = new EffectComposer( this.renderer );

        this.composer.addPass( new RenderPass( this.scene, this.camera ) );

        const effect2 = new ShaderPass( RGBShiftShader );
        effect2.uniforms[ 'amount' ].value = 0.0015;
        this.composer.addPass( effect2 );

        const effect3 = new OutputPass();
        this.composer.addPass( effect3 );

        window.addEventListener('resize', () => this.onWindowResize(), false);
    }

    private onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( window.innerWidth , window.innerHeight );
        this.composer.setSize( window.innerWidth , window.innerHeight );
    }

    private createCubo() {
        const puckGeometry = new THREE.BoxGeometry(1, 1, 1);
        const puckMaterial = new THREE.MeshPhongMaterial({ color: 'white' });
        this.puck = new THREE.Mesh(puckGeometry, puckMaterial);
        this.puck.position.set(0, 0, 0);
        this.scene.add(this.puck);
    }

    private createRaquetas() {
        const bluePaddleMaterial = new THREE.MeshPhongMaterial({ color: 'blue' });
        const redPaddleMaterial = new THREE.MeshPhongMaterial({ color: 'red' });

        const racketGeometry = new THREE.BoxGeometry(8, 1, 1);
        this.bluePaddle = new THREE.Mesh(racketGeometry, bluePaddleMaterial);
        this.redPaddle = new THREE.Mesh(racketGeometry, redPaddleMaterial);

        this.bluePaddle.position.set(0, 0, 20);
        this.redPaddle.position.set(0, 0, -20);

        this.scene.add(this.redPaddle, this.bluePaddle);
    }

    private createLight() {
        const light = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
        this.scene.add(light);
    }

    private movePaddle(): void {
        const controls = new PointerLockControls(this.camera, document.body);
        this.scene.add(controls.getObject());

        document.getElementById("juego") .addEventListener('click', () => {
            controls.lock();
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
            this.bluePaddle.position.x = intersection.x;

            // Ensure the paddle stays within certain bounds if needed
            // For example:
            this.bluePaddle.position.x = Math.max(Math.min(this.bluePaddle.position.x, 15), -15);
            });
    }

    private gameLoop(): void {
        this.puck.position.z += this.ballDirectionZ;
        this.puck.position.x += this.ballDirectionX;
        this.redPaddleCPU();
        this.handleCollisions();
    }

    private redPaddleCPU(){
        this.redPaddle.position.x = this.puck.position.x;
    }


    private handleCollisions(): void {
        if (this.puck.position.x >= 18.5 && this.puck.position.x <= 19
           || this.puck.position.x <= -18.5 && this.puck.position.x >= -19){
            this.ballDirectionX *= -1;
            this.ballSpeed -= 0.001; // Agregar friccion en la pared
        }

        if (this.puck.position.z >= 19.5 && this.puck.position.z <= 30){
            if( Math.abs(this.puck.position.x - this.bluePaddle.position.x) < 4) {
                this.ballDirectionZ *= -1;
                this.ballSpeed += 0.001; // Increase ball speed on successful hit
            } else {
                this.redScore++;
                this.scoreVisualEffect();
                this.resetPuck();
                this.startCountdown(); // Start countdown after goal
            }
        }

        if (this.puck.position.z <= -19.5 && this.puck.position.z >= -30){
            if( Math.abs(this.puck.position.x - this.redPaddle.position.x) < 4){
                this.ballDirectionZ *= -1;
                this.ballSpeed += 0.001; // Increase ball speed on successful hit
                // this.ballDirectionX = this.bluePaddle.userData.speedX; // Use paddle speed for x-direction
            } else {
                this.blueScore++;
                this.resetPuck();
                this.startCountdown(); // Start countdown after goal
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

        this.mostrarPuntaje();
        this.countdown = 5;
    }

    private resetPuck(): void {
        this.puck.position.set(0, 0, 0);
        this.ballSpeed = 0.01;
        this.ballDirectionX = 0.09; // Reset ballDirectionX
        this.ballDirectionZ = 0.3; // Reset ballDirectionX

        if (this.blueScore >= 3 || this.redScore >= 3) {
            // this.handleGameOver();

        }
    }

    private async handleGameOver(): Promise<void> {
        try {
            const csrfToken = document.head.querySelector('meta[name="csrf-token"]').getAttribute('content');

            const response = await fetch('http://localhost/juegos/store', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify({
                    jugador2_id: 2,
                    resultado_jugador1: this.blueScore,
                    resultado_jugador2: this.redScore,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
        } catch (error) {
            console.error('Error:', error);
            // Handle error as needed
        }
            window.location.href = 'http://localhost/dashboard';
    }

    public startGame(): void {
        this.initCountdownText();
        this.startCountdown();

        // Initialize the game loop
        const animate = () => {
            requestAnimationFrame(animate);
            if(this.countdown === 0) this.gameLoop();
            this.composer.render();
        };

        animate();
    }

}

const pongGame = new PongGame();
pongGame.startGame();
