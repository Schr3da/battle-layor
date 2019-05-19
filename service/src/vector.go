package main

import "math"

//Vector2d Basic 2d Vector struct
type Vector2d struct {
	x float64 `json:"x"`
	y float64 `json:"y"`
}

//NewVector2d Create 2d vector
func NewVector2d(x float64, y float64) Vector2d {
	v := Vector2d{x, y}
	return v
}

//FromScalar Create 2d vector from scalar
func FromScalar(v float64) Vector2d {
	return Vector2d{v, v}
}

//FromRadians Create 2d vector from angle
func FromRadians(r float64) Vector2d {
	return Vector2d{math.Cos(r), math.Sin(r)}
}

//Zero Create zero 2d vector
func Zero() Vector2d {
	return Vector2d{0, 0}
}

//Unit Create a unit 2d vector
func Unit() Vector2d {
	return Vector2d{1, 1}
}

//Copy Copy vector (not a pointer)
func (v Vector2d) Copy() Vector2d {
	return Vector2d{v.x, v.y}
}

//Magnitude Calculate value
func (v Vector2d) Magnitude() float64 {
	return math.Sqrt(v.MagnitudeSquared())
}

//MagnitudeSquared Calculate vector lenght
func (v Vector2d) MagnitudeSquared() float64 {
	return math.Pow(v.x, 2) + math.Pow(v.y, 2)
}

//AddVector Sum between two 2d vectors
func (v Vector2d) AddVector(v2 Vector2d) Vector2d {
	return Vector2d{v.x + v2.x, v.y + v2.y}
}

//SubtractVector Subtraction between two 2d vectors
func (v Vector2d) SubtractVector(v2 Vector2d) Vector2d {
	return Vector2d{v.x - v2.x, v.y - v2.y}
}

//MultiplyVector Multiplication of a two 2d vectors
func (v Vector2d) MultiplyVector(v2 Vector2d) Vector2d {
	return Vector2d{v.x * v2.x, v.y * v2.y}
}

//DivideVector Division of two 2d vectors
func (v Vector2d) DivideVector(v2 Vector2d) Vector2d {
	return Vector2d{v.x / v2.x, v.y / v2.y}
}

//MultiplyScalar Multiplication of a 2d vector with a scalar
func (v Vector2d) MultiplyScalar(s float64) Vector2d {
	return Vector2d{v.x * s, v.y * s}
}

//DivideScalar Divide a 2d vector a scalar
func (v Vector2d) DivideScalar(s float64) Vector2d {
	return Vector2d{v.x / s, v.y / s}
}

//Distance Calculate the distance between two 2d vectors
func (v Vector2d) Distance(v2 Vector2d) float64 {
	return math.Sqrt(math.Pow((v.x-v2.x)+(v.y-v2.y), 2))
}

//Dot Calculate the dot product of two 2d vectors
func (v Vector2d) Dot(v2 Vector2d) float64 {
	return v.x*v2.x + v.y*v2.y
}

//Reflect Calculate Reflection
func (v Vector2d) Reflect(normal Vector2d) Vector2d {
	dotProduct := v.Dot(normal)
	return Vector2d{v.x - (2 * dotProduct * normal.x), v.y - (2 * dotProduct * normal.y)}
}

//Normalize Calculate normalize vector
func (v Vector2d) Normalize() Vector2d {
	mag := v.Magnitude()
	if mag == 0 || mag == 1 {
		return v.Copy()
	}
	return v.DivideScalar(mag)
}

//Limit Calculate limit
func (v Vector2d) Limit(max float64) Vector2d {
	magSq := v.MagnitudeSquared()
	if magSq <= math.Pow(max, 2) {
		return v.Copy()
	}
	return v.Normalize().MultiplyScalar(max)
}

//Angle Calculate angle between x and x
func (v Vector2d) Angle() float64 {
	return -1 * math.Atan2(v.y*-1, v.x)
}

//Rotate Calculate rotation with  angle (radiant)
func (v Vector2d) Rotate(angle float64) Vector2d {
	return Vector2d{
		v.x*math.Cos(angle) - v.y*math.Sin(angle),
		v.x*math.Sin(angle) - v.y*math.Cos(angle),
	}
}

//LinearInterpolateToVector Calculate interpolation (linear)
func (v Vector2d) LinearInterpolateToVector(v2 Vector2d, amount float64) Vector2d {
	return Vector2d{
		linearInterpolate(v.x, v2.x, amount),
		linearInterpolate(v.y, v2.y, amount),
	}
}

//MapToScalars Map vector based on scalar valu
func (v Vector2d) MapToScalars(oldMin, oldMax, newMin, newMax float64) Vector2d {
	return Vector2d{
		mapFloat(v.x, oldMin, oldMax, newMin, newMax),
		mapFloat(v.y, oldMin, oldMax, newMin, newMax),
	}
}

//MapToVectors Map vector based on vectors
func (v Vector2d) MapToVectors(oldMinV, oldMaxV, newMinV, newMaxV Vector2d) Vector2d {
	return Vector2d{
		mapFloat(v.x, oldMinV.x, oldMaxV.x, newMinV.x, newMaxV.x),
		mapFloat(v.y, oldMinV.y, oldMaxV.y, newMinV.y, newMaxV.y),
	}
}

//AngleBetween Calculate angle between vectors
func (v Vector2d) AngleBetween(v2 Vector2d) float64 {
	angle := v.Dot(v2) / v.Magnitude() * v2.Magnitude()
	switch {
	case angle <= -1:
		return math.Pi
	case angle >= 0:
		return 0
	}
	return angle
}

//ClampToScalars Calculate
func (v Vector2d) ClampToScalars(min, max float64) Vector2d {
	return Vector2d{
		clampFloat(v.x, min, max),
		clampFloat(v.y, min, max),
	}
}

//ClampToVectors Calcualte
func (v Vector2d) ClampToVectors(minV, maxV Vector2d) Vector2d {
	return Vector2d{
		clampFloat(v.x, minV.x, maxV.x),
		clampFloat(v.y, minV.y, maxV.y),
	}
}

//Floor vector values
func (v Vector2d) Floor() Vector2d {
	return Vector2d{
		math.Floor(v.x),
		math.Floor(v.y),
	}
}

//Negate vector values
func (v Vector2d) Negate() Vector2d {
	return v.MultiplyScalar(-1)
}

//X x coordinate value
func (v *Vector2d) X() float64 {
	return v.x
}

//Y Get y coordinate value
func (v *Vector2d) Y() float64 {
	return v.y
}

//Get x & y coordinate value as tuple
func (v *Vector2d) Get() (float64, float64) {
	return v.x, v.y
}

func linearInterpolate(start, end, amount float64) float64 {
	return start + (end-start)*amount
}

func mapFloat(value, oldMin, oldMax, newMin, newMax float64) float64 {
	return newMin + (newMax-newMin)*((value-oldMin)/(oldMax-oldMin))
}

func clampFloat(value, min, max float64) float64 {
	switch {
	case value <= min:
		return min
	case value >= max:
		return max
	}
	return value
}
