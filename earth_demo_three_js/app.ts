///<reference path="./node_modules/@types/three/index.d.ts"/>
///<reference path="./node_modules/@types/three/three-orbitcontrols.d.ts"/>

class ThreeJSTest {
    renderer:THREE.WebGLRenderer;
    scene:THREE.Scene;
    camera:THREE.Camera;
    cameraControls:THREE.OrbitControls;

    constructor() {
        // Create the renderer, in this case using WebGL, we want an alpha channel
        this.renderer = new THREE.WebGLRenderer({ alpha: true });

        // Set dimensions to 500x500 and background color to white
        this.renderer.setSize(500, 500);
        this.renderer.setClearColor(0xFFFFFF, 1);

        // Bind the renderer to the HTML, parenting it to our 'content' DIV
        document.getElementById('content').appendChild(this.renderer.domElement);

        // Create a Scene
        this.scene = new THREE.Scene();

        // And a camera.  Set Field of View, Near and Far clipping planes
        this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);

        // Position is -20 along the Z axis and look at the origin
        this.camera.position = new THREE.Vector3(0, 0, -20);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        // Create a the geometry for a sphere with a radius of 5
        // segments in width of 32
        // segments in height of 32
        var sphereGeometry = new THREE.SphereGeometry(5, 32, 32);

        // This time we create a Phong shader material and provide a texture.
        var sphereMaterial = new THREE.MeshPhongMaterial(
            {
                map: THREE.ImageUtils.loadTexture("earthmap1k.jpg"),
            }
        );

        // Now make a THREE.Mesh using the geometry and a shader
        var earthMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);

        // And put it at the origin
        earthMesh.position = new THREE.Vector3(0, 0, 0);

        // Add it to the scene and render the scene using the Scene and Camera objects
        this.scene.add(earthMesh);

        // We need some light so our texture will show, ad an ambient light to the scene
        this.scene.add(new THREE.AmbientLight(new THREE.Color(0.9,0.9,0.9).getHex()));
        this.renderer.render(this.scene, this.camera);
    }

    render() {
        // Each frame we want to render the scene again
        // Use typescript Arrow notation to retain the thisocity passing render to requestAnimationFrame
        // It's possible I invented the word thisocity.
        requestAnimationFrame(() => this.render());
        this.renderer.render(this.scene, this.camera);
    }

    start() {
        this.render();
    }
}

window.onload = () => {
    var three = new ThreeJSTest();
    three.start();
};