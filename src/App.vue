<template>
  <div class="content">
    <canvas class="canvas" ref="canvasEl" width="100vw" height="100vh"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { $, $ref, $computed } from 'vue/macros'

const canvasEl = $ref<HTMLCanvasElement>()
let ctx = $computed(() => canvasEl.getContext('2d')!)

onMounted(() => {
  canvasEl.width = document.body.clientWidth - 20
  canvasEl.height = document.body.clientHeight - 20

  init()
  init()
})

async function init() {
  ctx.strokeStyle = '#ff0'
  ctx.beginPath()

  let e = drow(genertionStratLine())

  for (let i = 0; i < 10; i++) {
    let a = getLineByEndPoint(e)
    if (i % 3 == 0) {
      for (let j = 0; j < 5; j++) {
        getLineByEndPoint(a)
      }
    }
  }

  let arr = []

  ctx.closePath()
  ctx.stroke()
  ctx.stroke()
}

interface Point {
  x: number
  y: number
}

interface Line {
  start: Point
  end: Point
  angue?: number
  len?: number
}

function drow(line: Line): Point {
  ctx.moveTo(line.start.x, line.start.y)
  ctx.lineTo(line.end.x, line.end.y)
  return line.end
}

function genertionStratLine(): Line {
  let angue = (Math.random() * Math.PI) / 2
  let len = 100

  let y = canvasEl.height - 500 + Math.round(Math.random() * 500)
  return {
    start: {
      x: 0,
      y,
    },
    end: {
      x: Math.cos(angue) * len,
      y: y - Math.sin(angue) * len,
    },
    angue,
    len,
  }
}

function getLineByEndPoint(startPoint: Point): Point {
  let angue = (Math.random() * Math.PI) / 2
  let len = 100
  let o = {
    start: startPoint,
    end: {
      x: startPoint.x + Math.cos(angue) * len,
      y: startPoint.y - Math.sin(angue) * len,
    },
  }
  drow(o)
  return o.end
}

function sleep(time: any) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.content {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
}
canvas {
  box-sizing: border-box;
  border: 1px solid #000;
  background-color: #f5f5d5;
}
</style>
