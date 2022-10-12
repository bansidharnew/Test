/*var ww = window.innerWidth;
var wh = window.innerHeight;
var isMobile = ww < 500;

const tunnelObserverOptions = {
  root: null,
  threshold: 0,
  rootMargin: "0px 0px 0px 0px",
};
/*var runAnimation = true;
const tunnelObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      runAnimation = true;
    } else {
      runAnimation = false;
    }
  });
}, tunnelObserverOptions);
window.addEventListener("DOMContentLoaded", (event) => {
  const sections = Array.from(
    document.getElementsByClassName("tunnel-section")
  );

  for (let section of sections) {
    tunnelObserver.observe(section);
  }
});*/
/*let req;
function Tunnel() {
  this.init();
  this.createMesh();
  this.handleEvents();

  window.requestAnimationFrame(this.render.bind(this));
  req = window.requestAnimationFrame(this.render.bind(this));
}

Tunnel.prototype.init = function () {
  this.speed = 0.15;
  this.prevTime = 0;

  this.mouse = {
    position: new THREE.Vector2(ww * 0.5, wh * 0.7),
    ratio: new THREE.Vector2(0, 0),
    target: new THREE.Vector2(ww * 0.5, wh * 0.7),
  };

  this.renderer = new THREE.WebGLRenderer({
    antialias: false,
    canvas: document.querySelector("#scene1"),
    alpha: true,
  });
  this.renderer.setSize(ww, wh);

  this.camera = new THREE.PerspectiveCamera(15, ww / wh, 0.01, 2);
  this.camera.rotation.y = Math.PI;
  this.camera.position.z = 0.35;

  this.scene = new THREE.Scene();
  this.scene.fog = new THREE.Fog(0xffffff, 0.05, 1.6);

  var light = new THREE.HemisphereLight(0xeaeff2, 0x01010c, 1);
  //var light = new THREE.AmbientLight( 0x404040, 1 );
  this.scene.add(light);

  this.addParticle();
};

Tunnel.prototype.addParticle = function () {
  this.particles = [];
  for (var i = 0; i < (isMobile ? 40 : 90); i++) {
    this.particles.push(new Particle(this.scene));
  }
};

Tunnel.prototype.createMesh = function () {
  var points = [];
  var i = 0;
  var geometry = new THREE.BufferGeometry();

  this.scene.remove(this.tubeMesh);

  for (i = 0; i < 5; i += 1) {
    points.push(new THREE.Vector3(0, 0, 2.5 * (i / 4)));
  }
  points[4].y = -0.06;

  this.curve = new THREE.CatmullRomCurve3(points);
  this.curve.type = "catmullrom";

  geometry.vertices = this.curve.getPoints(70);
  this.splineMesh = new THREE.Line(geometry, new THREE.LineBasicMaterial());
  var loader = new THREE.TextureLoader();

  var texture = loader.load("./imgs/starsPhoto3.jpeg", function (texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set(0, 0);
    texture.repeat.set(10, 4);
  });
  this.tubeMaterial = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    //color: 0x000000,
    map: texture,
    opacity: 0.55,
    transparent: true,
  });

  this.tubeGeometry = new THREE.TubeGeometry(this.curve, 70, 0.02, 30, false);
  this.tubeGeometry_o = this.tubeGeometry.clone();
  this.tubeMesh = new THREE.Mesh(this.tubeGeometry, this.tubeMaterial);

  this.scene.add(this.tubeMesh);
};

Tunnel.prototype.handleEvents = function () {
  window.addEventListener("resize", this.onResize.bind(this), false);

  const tunnelSection = document.querySelector(".tunnel-section");
  tunnelSection.addEventListener(
    "mousemove",
    this.onMouseMove.bind(this),
    false
  );
  tunnelSection.addEventListener(
    "touchmove",
    this.onMouseMove.bind(this),
    false
  );

  tunnelSection.addEventListener(
    "touchstart",
    this.onMouseDown.bind(this),
    false
  );
  tunnelSection.addEventListener(
    "mousedown",
    this.onMouseDown.bind(this),
    false
  );

  tunnelSection.addEventListener("mouseup", this.onMouseUp.bind(this), false);
  tunnelSection.addEventListener(
    "mouseleave",
    this.onMouseUp.bind(this),
    false
  );
  tunnelSection.addEventListener("touchend", this.onMouseUp.bind(this), false);
  window.addEventListener("mouseout", this.onMouseUp.bind(this), false);
};

Tunnel.prototype.onMouseDown = function () {
  this.mousedown = true;
  TweenMax.to(this, 1.5, {
    speed: 0.1,
    ease: Power2.easeInOut,
  });
};
Tunnel.prototype.onMouseUp = function () {
  this.mousedown = false;
  TweenMax.to(this, 0.6, {
    speed: 0.15,
    ease: Power2.easeIn,
  });
};

Tunnel.prototype.onResize = function () {
  ww = window.innerWidth;
  wh = window.innerHeight;

  isMobile = ww < 500;

  this.camera.aspect = ww / wh;
  this.camera.updateProjectionMatrix();
  this.renderer.setSize(ww, wh);
};

Tunnel.prototype.onMouseMove = function (e) {
  if (e.type === "mousemove") {
    this.mouse.target.x = e.clientX;
    this.mouse.target.y = e.clientY;
  } else {
    this.mouse.target.x = e.touches[0].clientX;
    this.mouse.target.y = e.touches[0].clientY;
  }
};

Tunnel.prototype.updateCameraPosition = function () {
  this.mouse.position.x += (this.mouse.target.x - this.mouse.position.x) / 30;
  this.mouse.position.y += (this.mouse.target.y - this.mouse.position.y) / 30;

  this.mouse.ratio.x = this.mouse.position.x / ww;
  this.mouse.ratio.y = this.mouse.position.y / wh;

  this.camera.rotation.z = this.mouse.ratio.x * 1 - 0.05;
  this.camera.rotation.y = Math.PI - (this.mouse.ratio.x * 0.3 - 0.15);
  this.camera.position.x = this.mouse.ratio.x * 0.044 - 0.025;
  this.camera.position.y = this.mouse.ratio.y * 0.044 - 0.025;
};

Tunnel.prototype.updateCurve = function () {
  var i = 0;
  var index = 0;
  var vertice_o = null;
  var vertice = null;
  for (i = 0; i < this.tubeGeometry.vertices.length; i += 1) {
    vertice_o = this.tubeGeometry_o.vertices[i];
    vertice = this.tubeGeometry.vertices[i];
    index = Math.floor(i / 30);
    vertice.x +=
      (vertice_o.x + this.splineMesh.geometry.vertices[index].x - vertice.x) /
      15;
    vertice.y +=
      (vertice_o.y + this.splineMesh.geometry.vertices[index].y - vertice.y) /
      15;
  }
  this.tubeGeometry.verticesNeedUpdate = true;

  this.curve.points[2].x = 0.6 * (1 - this.mouse.ratio.x) - 0.3;
  this.curve.points[3].x = 0;
  this.curve.points[4].x = 0.6 * (1 - this.mouse.ratio.x) - 0.3;

  this.curve.points[2].y = 0.6 * (1 - this.mouse.ratio.y) - 0.3;
  this.curve.points[3].y = 0;
  this.curve.points[4].y = 0.6 * (1 - this.mouse.ratio.y) - 0.3;

  this.splineMesh.geometry.verticesNeedUpdate = true;
  this.splineMesh.geometry.vertices = this.curve.getPoints(70);
};

Tunnel.prototype.render = function (time) {
  //if (runAnimation) {
    this.updateCameraPosition();
    this.updateCurve();

    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].update(this);
      if (this.particles[i].burst && this.particles[i].percent > 1) {
        this.particles.splice(i, 1);
        i--;
      }
    }

    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.render.bind(this));
  /*} else {
    window.requestAnimationFrame(this.render.bind(this));
  }*/
/*};

function Particle(scene) {
  var radius = Math.random() * 0.005 + 0.0003;
  var geom = this.text;
  var mat = new THREE.MeshBasicMaterial({ color: 0xdaa520 });
  var random = Math.random();
  if (random > 0.9) {
    geom = this.text2;
  } else if (random > 0.8) {
    geom = this.text3;
  } else if (random > 0.7) {
    geom = this.text4;
  } else if (random > 0.6) {
    geom = this.text5;
  } else if (random > 0.5) {
    geom = this.text6;
  } else if (random > 0.4) {
    geom = this.text7;
  } else if (random > 0.3) {
    geom = this.text8;
  } else if (random > 0.2) {
    geom = this.text9;
  }

  this.mesh = new THREE.Mesh(geom, mat);
  this.mesh.scale.set(radius, radius, radius);
  this.mesh.position.set(0, 0, 3.5);
  this.percent = Math.random();
  this.offset = new THREE.Vector3(
    (Math.random() - 0.5) * 0.025,
    (Math.random() - 0.5) * 0.025,
    0
  );
  this.speed = Math.random() * 0.003 + 0.0002;
  this.rotate = new THREE.Vector3(0, 3, 0);

  this.pos = new THREE.Vector3(0, 0, 0);
  scene.add(this.mesh);
}

const loader = new THREE.FontLoader();
loader.load("./js/fonts/roboto.json", function (font) {
  Particle.prototype.text = new THREE.TextGeometry("a", {
    font: font,
    size: 0.2,
    height: 0.02,
    curveSegments: 4,
  });
  Particle.prototype.text2 = new THREE.TextGeometry("i++", {
    font: font,
    size: 0.2,
    height: 0.02,
    curveSegments: 4,
  });
  Particle.prototype.text3 = new THREE.TextGeometry("{ }", {
    font: font,
    size: 0.2,
    height: 0.02,
    curveSegments: 4,
  });
  Particle.prototype.text4 = new THREE.TextGeometry("01", {
    font: font,
    size: 0.2,
    height: 0.02,
    curveSegments: 4,
  });
  Particle.prototype.text5 = new THREE.TextGeometry("rC", {
    font: font,
    size: 0.2,
    height: 0.02,
    curveSegments: 4,
  });
  Particle.prototype.text6 = new THREE.TextGeometry("9x", {
    font: font,
    size: 0.2,
    height: 0.02,
    curveSegments: 4,
  });
  Particle.prototype.text7 = new THREE.TextGeometry("/*", {
    font: font,
    size: 0.2,
    height: 0.02,
    curveSegments: 4,
  });
  Particle.prototype.text8 = new THREE.TextGeometry(")", {
    font: font,
    size: 0.2,
    height: 0.02,
    curveSegments: 4,
  });
  Particle.prototype.text9 = new THREE.TextGeometry("=", {
    font: font,
    size: 0.2,
    height: 0.02,
    curveSegments: 4,
  });
});
Particle.prototype.update = function (tunnel) {
  this.percent += this.speed * (this.burst ? 1 : tunnel.speed);

  this.pos = tunnel.curve.getPoint(this.percent % 1).add(this.offset);
  this.mesh.position.x = this.pos.x;

  this.mesh.position.y = this.pos.y;
  this.mesh.position.z = this.pos.z;
  this.mesh.rotation.x = this.rotate.x;

  this.mesh.rotation.y = this.rotate.y;
  this.mesh.rotation.z = this.rotate.z;
};

window.onload = function () {
  window.tunnel = new Tunnel();
}; */

var ww = window.innerWidth
var wh = window.innerHeight

function Tunnel(texture) {
  this.init()
  this.createMesh(texture)

  this.handleEvents()

  this.initAnimation()

  window.requestAnimationFrame(this.render.bind(this))
}

Tunnel.prototype.init = function () {
  this.speed = 0.15

  this.mouse = {
    position: new THREE.Vector2(ww * 0.5, wh * 0.5),
    ratio: new THREE.Vector2(0, 0),
    target: new THREE.Vector2(ww * 0.5, wh * 0.5),
  }

  this.renderer = new THREE.WebGLRenderer({
    antialias: false,
    canvas: document.querySelector('#scene1'),
    alpha: true,
  })

  this.renderer.setSize(ww, wh)

  this.camera = new THREE.PerspectiveCamera(15, ww / wh, 0.01, 1000)
  this.camera.rotation.y = Math.PI
  this.camera.position.z = 0.35

  this.scene = new THREE.Scene()
  this.addParticle()
}
Tunnel.prototype.addParticle = function () {
  this.particles = []
  for (var i = 0; i < (isMobile ? 40 : 80); i++) {
    this.particles.push(new Particle(this.scene))
  }
}
Tunnel.prototype.createMesh = function (texture) {
  var points = []
  var i = 0
  var geometry = new THREE.Geometry()

  this.scene.remove(this.tubeMesh)

  for (i = 0; i < 5; i += 1) {
    points.push(new THREE.Vector3(0, 0, 3 * (i / 4)))
  }
  points[4].y = -0.06

  this.curve = new THREE.CatmullRomCurve3(points)
  this.curve.type = 'catmullrom'

  geometry = new THREE.Geometry()
  geometry.vertices = this.curve.getPoints(70)
  this.splineMesh = new THREE.Line(geometry, new THREE.LineBasicMaterial())

  this.tubeMaterial = new THREE.MeshBasicMaterial({
    side: THREE.BackSide,
    map: texture,
    opacity: 0.7,
  })
  this.tubeMaterial.map.wrapS = THREE.MirroredRepeatWrapping
  this.tubeMaterial.map.wrapT = THREE.MirroredRepeatWrapping
  this.tubeMaterial.map.repeat.set(
    this.tubeMaterial.repx,
    this.tubeMaterial.repy,
  )

  this.tubeGeometry = new THREE.TubeGeometry(this.curve, 70, 0.02, 30, false)
  this.tubeGeometry_o = this.tubeGeometry.clone()
  this.tubeMesh = new THREE.Mesh(this.tubeGeometry, this.tubeMaterial)

  this.scene.add(this.tubeMesh)
}

Tunnel.prototype.handleEvents = function () {
  window.addEventListener('resize', this.onResize.bind(this), false)
  document.body.addEventListener(
    'mousemove',
    this.onMouseMove.bind(this),
    false,
  )
}

Tunnel.prototype.onResize = function () {
  ww = window.innerWidth
  wh = window.innerHeight

  this.camera.aspect = ww / wh
  this.camera.updateProjectionMatrix()
  this.renderer.setSize(ww, wh)
}

Tunnel.prototype.onMouseMove = function (e) {
  this.mouse.target.x = e.clientX
  this.mouse.target.y = e.clientY
}

Tunnel.prototype.update = function () {
  this.createMesh()
}

Tunnel.prototype.initAnimation = function () {
  // Timeline animation
  this.textureParams = {
    offsetX: 0,
    offsetY: 0,
    repeatX: 10,
    repeatY: 4,
  }
  this.cameraShake = {
    x: 0,
    y: 0,
  }
  var self = this
  var hyperSpace = new TimelineMax({ repeat: -1, delay: 1.2 })
  hyperSpace.to(this.textureParams, 4, {
    repeatX: 0.3,
    ease: Power1.easeInOut,
  })
  hyperSpace.to(
    this.textureParams,
    12,
    {
      offsetX: 8,
      ease: Power2.easeInOut,
    },
    0,
  )
  hyperSpace.to(
    this.textureParams,
    6,
    {
      repeatX: 10,
      ease: Power2.easeInOut,
    },
    '-=5',
  )
  var shake = new TimelineMax({ repeat: -1, repeatDelay: 5, delay: 1.2 })
  shake.to(
    this.cameraShake,
    2,
    {
      x: -0.01,
      ease: RoughEase.ease.config({
        template: Power0.easeNone,
        strength: 0.5,
        points: 100,
        taper: 'none',
        randomize: true,
        clamp: false,
      }),
    },
    4,
  )
  shake.to(this.cameraShake, 2, {
    x: 0,
    ease: RoughEase.ease.config({
      template: Power0.easeNone,
      strength: 0.5,
      points: 100,
      taper: 'none',
      randomize: true,
      clamp: false,
    }),
  })
}
Tunnel.prototype.updateMaterialOffset = function () {
  this.tubeMaterial.map.offset.x = this.textureParams.offsetX
  this.tubeMaterial.map.offset.y += 0.001
  this.tubeMaterial.map.repeat.set(
    this.textureParams.repeatX,
    this.textureParams.repeatY,
  )
}
Tunnel.prototype.updateCameraPosition = function () {
  this.mouse.position.x += (this.mouse.target.x - this.mouse.position.x) / 50
  this.mouse.position.y += (this.mouse.target.y - this.mouse.position.y) / 50

  this.mouse.ratio.x = this.mouse.position.x / ww
  this.mouse.ratio.y = this.mouse.position.y / wh

  this.camera.position.x =
    this.mouse.ratio.x * 0.044 - 0.025 + this.cameraShake.x
  this.camera.position.y = this.mouse.ratio.y * 0.044 - 0.025
}
Tunnel.prototype.updateCurve = function () {
  var i = 0
  var index = 0
  var vertice_o = null
  var vertice = null
  for (i = 0; i < this.tubeGeometry.vertices.length; i += 1) {
    vertice_o = this.tubeGeometry_o.vertices[i]
    vertice = this.tubeGeometry.vertices[i]
    index = Math.floor(i / 30)
    vertice.x +=
      (vertice_o.x + this.splineMesh.geometry.vertices[index].x - vertice.x) /
      15
    vertice.y +=
      (vertice_o.y + this.splineMesh.geometry.vertices[index].y - vertice.y) /
      15
  }
  this.tubeGeometry.verticesNeedUpdate = true

  this.curve.points[2].x = 0.6 * (1 - this.mouse.ratio.x) - 0.3
  this.curve.points[3].x = 0
  this.curve.points[4].x = 0.6 * (1 - this.mouse.ratio.x) - 0.3

  this.curve.points[2].y = 0.6 * (1 - this.mouse.ratio.y) - 0.3
  this.curve.points[3].y = 0
  this.curve.points[4].y = 0.6 * (1 - this.mouse.ratio.y) - 0.3

  this.splineMesh.geometry.verticesNeedUpdate = true
  this.splineMesh.geometry.vertices = this.curve.getPoints(70)
}
function Particle(scene) {
  var radius = Math.random() * 0.005 + 0.0003
  var geom = this.text
  var mat = new THREE.MeshBasicMaterial({ color: 0xdaa520 })
  var random = Math.random()
  if (random > 0.9) {
    geom = this.text2
  } else if (random > 0.8) {
    geom = this.text3
  } else if (random > 0.7) {
    geom = this.text4
  } else if (random > 0.6) {
    geom = this.text5
  } else if (random > 0.5) {
    geom = this.text6
  } else if (random > 0.4) {
    geom = this.text7
  } else if (random > 0.3) {
    geom = this.text8
  } else if (random > 0.2) {
    geom = this.text9
  }

  this.mesh = new THREE.Mesh(geom, mat)
  this.mesh.scale.set(radius, radius, radius)
  this.mesh.position.set(0, 0, 3.5)
  this.percent = Math.random()
  this.offset = new THREE.Vector3(
    (Math.random() - 0.5) * 0.025,
    (Math.random() - 0.5) * 0.025,
    0,
  )
  this.speed = Math.random() * 0.003 + 0.0002
  this.rotate = new THREE.Vector3(0, 3, 0)

  this.pos = new THREE.Vector3(0, 0, 0)
  scene.add(this.mesh)
}

const loader = new THREE.FontLoader()
loader.load('./js/fonts/roboto.json', function (font) {
  Particle.prototype.text = new THREE.TextGeometry('a', {
    font: font,
    size: 0.2,
    height: 0.02,
    curveSegments: 4,
  })
  Particle.prototype.text2 = new THREE.TextGeometry('i++', {
    font: font,
    size: 0.2,
    height: 0.02,
    curveSegments: 4,
  })
  Particle.prototype.text3 = new THREE.TextGeometry('{ }', {
    font: font,
    size: 0.2,
    height: 0.02,
    curveSegments: 4,
  })
  Particle.prototype.text4 = new THREE.TextGeometry('01', {
    font: font,
    size: 0.2,
    height: 0.02,
    curveSegments: 4,
  })
  Particle.prototype.text5 = new THREE.TextGeometry('rC', {
    font: font,
    size: 0.2,
    height: 0.02,
    curveSegments: 4,
  })
  Particle.prototype.text6 = new THREE.TextGeometry('9x', {
    font: font,
    size: 0.2,
    height: 0.02,
    curveSegments: 4,
  })
  Particle.prototype.text7 = new THREE.TextGeometry('/*', {
    font: font,
    size: 0.2,
    height: 0.02,
    curveSegments: 4,
  })
  Particle.prototype.text8 = new THREE.TextGeometry(')', {
    font: font,
    size: 0.2,
    height: 0.02,
    curveSegments: 4,
  })
  Particle.prototype.text9 = new THREE.TextGeometry('=', {
    font: font,
    size: 0.2,
    height: 0.02,
    curveSegments: 4,
  })
})
Particle.prototype.update = function (tunnel) {
  this.percent += this.speed * (this.burst ? 1 : tunnel.speed)

  this.pos = tunnel.curve.getPoint(this.percent % 1).add(this.offset)
  this.mesh.position.x = this.pos.x

  this.mesh.position.y = this.pos.y
  this.mesh.position.z = this.pos.z
  this.mesh.rotation.x = this.rotate.x

  this.mesh.rotation.y = this.rotate.y
  this.mesh.rotation.z = this.rotate.z
}
Tunnel.prototype.render = function () {
  this.updateMaterialOffset()

  this.updateCameraPosition()

  this.updateCurve()

  for (var i = 0; i < this.particles.length; i++) {
    this.particles[i].update(this)
    if (this.particles[i].burst && this.particles[i].percent > 1) {
      this.particles.splice(i, 1)
      i--
    }
  }

  this.renderer.render(this.scene, this.camera)

  window.requestAnimationFrame(this.render.bind(this))
  setTimeout(() => {
    window.cancelAnimationFrame(this.render.bind(this))
  }, 20000)
}

// window.onload = function () {
//   var loader = new THREE.TextureLoader()
//   loader.crossOrigin = 'Anonymous'

//   loader.load('imgs/starsPhoto3.jpeg', function (texture) {
//     document.body.classList.remove('loading')
//     window.tunnel = new Tunnel(texture)
//   })
// }
