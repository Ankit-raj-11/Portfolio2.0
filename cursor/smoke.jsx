import { useEffect, useRef } from "react";

export default function WebGLFluidCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    // ... (context and resize logic remains the same)
    const gl = canvas.getContext("webgl", { alpha: true });
    if (!gl) return;

    // Resize canvas correctly with devicePixelRatio
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    // Vertex shader (no change)
    const vertexShaderSrc = `
      attribute vec2 a_position;
      attribute float a_size;
      uniform vec2 u_resolution;
      void main() {
        vec2 zeroToOne = a_position / u_resolution;
        vec2 clipSpace = zeroToOne * 2.0 - 1.0;
        gl_PointSize = a_size;
        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
      }
    `;

    // --- CRITICAL CHANGE: Fragment shader draws WHITE particles ---
    const fragmentShaderSrc = `
      precision mediump float;
      void main() {
        vec2 coord = gl_PointCoord - vec2(0.5);
        if(length(coord) > 0.5) discard;
        // Draw WHITE (1.0, 1.0, 1.0) with full opacity (1.0)
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); 
      }
    `;
    // -----------------------------------------------------------------

    // ... (shader creation, program linking, buffer setup, mouse events, and animate loop remain the same)

    const createShader = (gl, type, src) => {
      // ... (implementation of createShader)
      const shader = gl.createShader(type);
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSrc);
    const fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSrc
    );

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program failed to link: " + gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionAttrib = gl.getAttribLocation(program, "a_position");
    const sizeAttrib = gl.getAttribLocation(program, "a_size");
    const resolutionUniform = gl.getUniformLocation(program, "u_resolution");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const particleCount = 1000;
    const trail = Array.from({ length: particleCount }, () => ({
      x: canvas.width / 2,
      y: canvas.height / 2,
    }));

    const mouse = { x: canvas.width / 2, y: canvas.height / 2 };

    const positionBuffer = gl.createBuffer();
    const sizeBuffer = gl.createBuffer();

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX * (window.devicePixelRatio || 1);
      mouse.y = e.clientY * (window.devicePixelRatio || 1);
    });

    const animate = () => {
      requestAnimationFrame(animate);

      // Move head fast
      trail[0].x += (mouse.x - trail[0].x) * 1.5;
      trail[0].y += (mouse.y - trail[0].y) * 1.5;

      // Tail follows
      for (let i = 1; i < particleCount; i++) {
        trail[i].x += (trail[i - 1].x - trail[i].x) * 0.95;
        trail[i].y += (trail[i - 1].y - trail[i].y) * 0.95;
      }

      // Update positions & sizes
      const positions = new Float32Array(particleCount * 2);
      const sizes = new Float32Array(particleCount);
      for (let i = 0; i < particleCount; i++) {
        positions[i * 2] = trail[i].x;
        positions[i * 2 + 1] = trail[i].y;

        // Tapered size: head largest, tail smallest
        sizes[i] = 15 * (1 - i / particleCount) + 2;
      }

      // Bind position buffer
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(positionAttrib);
      gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);

      // Bind size buffer
      gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(sizeAttrib);
      gl.vertexAttribPointer(sizeAttrib, 1, gl.FLOAT, false, 0, 0);

      // Draw particles (fully transparent bg)
      gl.useProgram(program);
      gl.uniform2f(resolutionUniform, canvas.width, canvas.height);
      gl.drawArrays(gl.POINTS, 0, particleCount);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="webgl-blend-cursor"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        cursor: "none",
        background: "transparent",
        zIndex: 1,
      }}
    />
  );
}
