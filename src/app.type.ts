export interface Point {
  x: number
  y: number
}

export interface Line {
  start: Point
  end: Point
  angue?: number
  len?: number
}
