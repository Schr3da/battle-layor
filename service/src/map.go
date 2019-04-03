package main

import (
	"fmt"
	"math/rand"
	"time"
)

const (
	//MapTilesX max tiles along x axis
	MapTilesX int = 40
	//MapTilesY max tiles along y axis
	MapTilesY int    = 60
	wall      string = "#"
	door      string = "."
	free      string = " "
	floor     string = "."
	corner    string = "!"
)

//World Game World
type World struct {
	tiles [MapTilesY][MapTilesX]string
}

//NewWorld returns a new world instance
func NewWorld() World {
	w := World{
		tiles: generateTiles(),
	}
	return w
}

func generateRoom(start bool, seed *rand.Rand, tiles *[MapTilesY][MapTilesX]string) {
	width := seed.Intn(10) + 5
	height := seed.Intn(6) + 3
	left := seed.Intn(MapTilesX-width-2) + 1
	top := seed.Intn(MapTilesY-height-2) + 1

	for y := top - 1; y < top+height+2; y++ {
		for x := left - 1; x < left+width+2; x++ {
			if tiles[y][x] == floor {
				return
			}
		}
	}

	doors := 0
	var doorX int
	var doorY int

	if start == false {
		for y := top - 1; y < top+height+2; y++ {
			for x := left - 1; x < left+width+2; x++ {
				s := x < left || x > left+width
				t := y < top || y > top+height
				if s != t && tiles[y][x] == wall {
					doors++
					if seed.Intn(doors) == 0 {
						doorX = x
						doorY = y
					}
				}
			}
		}

		if doors == 0 {
			return
		}
	}

	for y := top - 1; y < top+height+2; y++ {
		for x := left - 1; x < left+width+2; x++ {
			s := x < left || x > left+width
			t := y < top || y > top+height

			if s && t {
				tiles[y][x] = corner
			} else if s != t {
				tiles[y][x] = wall
			} else {
				tiles[y][x] = floor
			}
		}
	}

	if doors > 0 {
		tiles[doorY][doorX] = door
	}

	if start {
		tiles[seed.Intn(height)+top][seed.Intn(width)+left] = floor
		return
	}
}

func generateTiles() [MapTilesY][MapTilesX]string {
	var tiles [MapTilesY][MapTilesX]string

	for y := 0; y < MapTilesY; y++ {
		for x := 0; x < MapTilesX; x++ {
			tiles[y][x] = free
		}
	}

	src := rand.NewSource(int64(time.Now().Nanosecond()))
	seed := rand.New(src)

	for j := 0; j < 1000; j++ {
		generateRoom(j == 0, seed, &tiles)
	}

	fmt.Println(tiles)
	return tiles
}

func (w *World) pickRandomSpawnPlace() Vector2d {
	return Vector2d{
		x: 2,
		y: 1,
	}
}
