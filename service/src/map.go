package main

//World Game World
type World struct {
	walls [][]int
}

//NewWorld returns a new world instance
func NewWorld() World {
	w := World{
		walls: generateWalls(),
	}
	return w
}

func generateWalls() [][]int {
	return [][]int{
		[]int{1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
		[]int{1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1},
		[]int{1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1},
		[]int{1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1},
		[]int{1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1},
		[]int{1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1},
		[]int{1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
	}
}

func (w *World) pickRandomSpawnPlace() Vector2d {
	return Vector2d{
		x: 2,
		y: 1,
	}
}
