#!/usr/bin/env python3
"""Rebuild the three D1 reference reproductions and print their gzipped size.

    python3 research/D1-repros/build.py

Refs 1 and 2 are SCSS on CodePen. Sass's random() is unseeded at compile time,
so compiling twice gives two different starfields and two different byte counts.
To make the payload figure reproducible we compile with mulberry32 seeded at
0x5EED -- the same PRNG the game sim uses (apps/game/src/rng.js) -- instead of
Sass's. Nothing else about the source is changed; see D1-references.md
"Deviations" for the full list.
"""
import gzip
import os
import pathlib

HERE = pathlib.Path(__file__).parent


def mulberry32(seed):
    a = seed & 0xFFFFFFFF

    def rnd():
        nonlocal a
        a = (a + 0x6D2B79F5) & 0xFFFFFFFF
        t = a
        t = (t ^ (t >> 15)) * (t | 1) & 0xFFFFFFFF
        t ^= (t + ((t ^ (t >> 7)) * (t | 61) & 0xFFFFFFFF)) & 0xFFFFFFFF
        return ((t ^ (t >> 14)) & 0xFFFFFFFF) / 4294967296

    return rnd


def shadows(seed, width=3000, height=960, stars=350):
    """Reproduce the SCSS @for loop:

        @for $i from 0 through $stars {
          $box-shadow: $box-shadow,
            (random($width)-$width/2 + px)
            (random($height)-$height/2 + px)
            hsl(90, 0, 75+random(25));
        }

    Sass random(n) yields an integer in 1..n, so x lands in -1499..1500,
    y in -479..480, and lightness in 76..100 -- greys, since saturation is 0.
    "through" is inclusive, so this is 351 shadows, not 350.
    """
    r = mulberry32(seed)
    out = []
    for _ in range(stars + 1):
        x = (int(r() * width) + 1) - width // 2
        y = (int(r() * height) + 1) - height // 2
        light = 75 + (int(r() * 25) + 1)
        out.append("%dpx %dpx hsl(90,0%%,%d%%)" % (x, y, light))
    return ",".join(out)


# --- ref 1: gist lordsean/afdd4f5fa31748100ca3d25513abb015 -------------------
# "Single element pure CSS 3D starfield", a copy of Keith Clark's pen JjWyBb.
# Square stars (no border-radius), perspective on <body> in the original.
REF1 = """<!DOCTYPE html>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Single element pure CSS 3D starfield</title>
<style>
html,body{height:100%%;overflow:hidden}
body{margin:0;background:#000;perspective:340px}
.stars{position:absolute;top:50%%;left:50%%;width:2px;height:2px;
box-shadow:%s;
animation:fly 3s linear infinite;transform-style:preserve-3d}
.stars:before,.stars:after{content:"";position:absolute;width:inherit;height:inherit;box-shadow:inherit}
.stars:before{transform:translateZ(-300px);animation:fade1 3s linear infinite}
.stars:after{transform:translateZ(-600px);animation:fade2 3s linear infinite}
@keyframes fly{from{transform:translateZ(0)}to{transform:translateZ(300px)}}
@keyframes fade1{from{opacity:.5}to{opacity:1}}
@keyframes fade2{from{opacity:0}to{opacity:.5}}
</style>
<div class="stars"></div>
"""

# --- ref 2: codepen MadeByArne/BaWxOaR --------------------------------------
# "Pure CSS animated starfield". Explicitly a fork of Keith Clark's pen ibEnk.
# Differences from ref 1: a .stars-wrapper owns perspective and overflow instead
# of <body>; stars are round (border-radius:50%); the hsl() call carries the %
# units that modern Sass requires.
REF2 = """<!DOCTYPE html>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Pure CSS animated starfield</title>
<style>
body{margin:0}
.stars-wrapper{width:100%%;height:100vh;overflow:hidden;background:#000;perspective:340px}
.stars{position:absolute;top:50%%;left:50%%;width:2px;height:2px;border-radius:50%%;
box-shadow:%s;
animation:fly 3s linear infinite;transform-style:preserve-3d}
.stars:before,.stars:after{content:"";position:absolute;width:inherit;height:inherit;box-shadow:inherit}
.stars:before{transform:translateZ(-300px);animation:fade1 3s linear infinite}
.stars:after{transform:translateZ(-600px);animation:fade2 3s linear infinite}
@keyframes fly{from{transform:translateZ(0)}to{transform:translateZ(300px)}}
@keyframes fade1{from{opacity:.5}to{opacity:1}}
@keyframes fade2{from{opacity:0}to{opacity:.5}}
</style>
<div class="stars-wrapper"><div class="stars"></div></div>
"""

# --- ref 3: kirupa animated_3d_starfield_effect -----------------------------
# Final listing from the tutorial, verbatim.
REF3 = """<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Starfield Effect</title>

  <style>
    #outerspace {
      border: 1px solid #111;
      border-radius: 10px;
      filter: drop-shadow(0px 0px 10px #333);
    }
    body {
      margin: 100px;
    }
  </style>
</head>

<body>
  <canvas id="outerspace" height="500" width="500"></canvas>

  <script>
    let outerspace = document.querySelector("#outerspace");
    let mainContext = outerspace.getContext('2d');

    let canvasWidth = outerspace.width;
    let canvasHeight = outerspace.height;

    let centerX = canvasWidth * 0.5;
    let centerY = canvasHeight * 0.5;

    let numberOfStars = 500;

    let stars = [];

    let frames_per_second = 60;

    let interval = Math.floor(1000 / frames_per_second);
    let startTime = performance.now();
    let previousTime = startTime;

    let currentTime = 0;
    let deltaTime = 0;

    class Star {
      constructor() {
        this.x = getRandomInt(-centerX, centerX);
        this.y = getRandomInt(-centerY, centerY);
        this.counter = getRandomInt(1, canvasWidth);

        this.radiusMax = 1 + Math.random() * 10;
        this.speed = getRandomInt(1, 5);

        this.context = mainContext;
      }

      drawStar() {
        this.counter -= this.speed;

        if (this.counter < 1) {
          this.counter = canvasWidth;
          this.x = getRandomInt(-centerX, centerX);
          this.y = getRandomInt(-centerY, centerY);

          this.radiusMax = getRandomInt(1, 10);
          this.speed = getRandomInt(1, 5);
        }

        let xRatio = this.x / this.counter;
        let yRatio = this.y / this.counter;

        let starX = remap(xRatio, 0, 1, 0, canvasWidth);
        let starY = remap(yRatio, 0, 1, 0, canvasHeight);

        this.radius = remap(this.counter, 0, canvasWidth, this.radiusMax, 0);

        mainContext.beginPath();

        mainContext.arc(starX, starY, this.radius, 0, Math.PI * 2, false);
        mainContext.closePath();

        mainContext.fillStyle = "#FFF";
        mainContext.fill();
      }
    }

    function setup() {
      for (let i = 0; i < numberOfStars; i++) {
        let star = new Star();
        stars.push(star);
      }
    }
    setup();

    function draw(timestamp) {
      currentTime = timestamp;
      deltaTime = currentTime - previousTime;

      if (deltaTime > interval) {
        previousTime = currentTime - (deltaTime % interval);

        mainContext.clearRect(0, 0, canvasWidth, canvasHeight);
        mainContext.fillStyle = "#111";
        mainContext.fillRect(0, 0, canvasWidth, canvasHeight);

        mainContext.translate(centerX, centerY);

        for (let i = 0; i < stars.length; i++) {
          let star = stars[i];
          star.drawStar();
        }

        mainContext.translate(-centerX, -centerY);
      }

      requestAnimationFrame(draw);
    }
    draw();

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function remap(value, istart, istop, ostart, ostop) {
      // Ensure values are numerical to avoid potential errors
      value = Number(value);
      istart = Number(istart);
      istop = Number(istop);
      ostart = Number(ostart);
      ostop = Number(ostop);

      // Perform the mapping calculation
      return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
    }
  </script>

</body>

</html>
"""

FILES = [
    ("ref1-gist-css-starfield.html", REF1 % shadows(0x5EED)),
    ("ref2-codepen-css-starfield.html", REF2 % shadows(0x5EED)),
    ("ref3-kirupa-canvas-starfield.html", REF3),
]

if __name__ == "__main__":
    print("%-36s %10s %10s" % ("file", "raw", "gz -9"))
    for name, body in FILES:
        data = body.encode("utf-8")
        (HERE / name).write_bytes(data)
        gz = len(gzip.compress(data, 9))
        print("%-36s %9db %8.2fKB" % (name, len(data), gz / 1024))
