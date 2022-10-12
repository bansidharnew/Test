// Create an empty array to stores the points
var points = [];

// Define points along Z axis
for (var i = 0; i < 5; i += 1) {
    points.push(new THREE.Vector3(0, 0, 2.5 * (i / 4)));
}

// Create a curve based on the points
var curve = new THREE.CatmullRomCurve3(points)

// Create the geometry of the tube based on the curve
// The other values are respectively : 
// 70 : the number of segments along the tube
// 0.02 : its radius (yeah it's a tiny tube)
// 50 : the number of segments that make up the cross-section
// false : a value to set if the tube is closed or not
var tubeGeometry = new THREE.TubeGeometry(this.curve, 70, 0.02, 50, false);

// Define a material for the tube with a jpg as texture instead of plain color
var tubeMaterial = new THREE.MeshStandardMaterial({
    side: THREE.BackSide, // Since the camera will be inside the tube we need to reverse the faces
    map: rockPattern // rockPattern is a texture previously loaded
});
// Repeat the pattern to prevent the texture being stretched
tubeMaterial.map.wrapS = THREE.RepeatWrapping;
tubeMaterial.map.wrapT = THREE.RepeatWrapping;
tubeMaterial.map.repeat.set(30, 6);

// Create a mesh based on tubeGeometry and tubeMaterial
var tube = new THREE.Mesh(tubeGeometry, tubeMaterial);

// Add the tube into the scene
scene.add(this.tubeMesh);