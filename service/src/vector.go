package main

import "math"

//Vector2d Basic 2d Vector struct
type Vector2d struct {
	X float64 `json:"x"`
	Y float64 `json:"y"`
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
	return Vector2d{v.X, v.Y}
}

//Magnitude Calculate value
func (v Vector2d) Magnitude() float64 {
	return math.Sqrt(v.MagnitudeSquared())
}

//MagnitudeSquared Calculate vector lenght
func (v Vector2d) MagnitudeSquared() float64 {
	return math.Pow(v.X, 2) + math.Pow(v.Y, 2)
}

//AddVector Sum between two 2d vectors
func (v Vector2d) AddVector(v2 Vector2d) Vector2d {
	return Vector2d{v.X + v2.X, v.Y + v2.Y}
}

//SubtractVector Subtraction between two 2d vectors
func (v Vector2d) SubtractVector(v2 Vector2d) Vector2d {
	return Vector2d{v.X - v2.X, v.Y - v2.Y}
}

//MultiplyVector Multiplication of a two 2d vectors
func (v Vector2d) MultiplyVector(v2 Vector2d) Vector2d {
	return Vector2d{v.X * v2.X, v.Y * v2.Y}
}

//DivideVector Division of two 2d vectors
func (v Vector2d) DivideVector(v2 Vector2d) Vector2d {
	return Vector2d{v.X / v2.X, v.Y / v2.Y}
}

//MultiplyScalar Multiplication of a 2d vector with a scalar
func (v Vector2d) MultiplyScalar(s float64) Vector2d {
	return Vector2d{v.X * s, v.Y * s}
}

//DivideScalar Divide a 2d vector a scalar
func (v Vector2d) DivideScalar(s float64) Vector2d {
	return Vector2d{v.X / s, v.Y / s}
}

//Distance Calculate the distance between two 2d vectors
func (v Vector2d) Distance(v2 Vector2d) float64 {
	return math.Sqrt(math.Pow((v.X-v2.X)+(v.Y-v2.Y), 2))
}

//Dot Calculate the dot product of two 2d vectors
func (v Vector2d) Dot(v2 Vector2d) float64 {
	return v.X*v2.X + v.Y*v2.Y
}

//Reflect Calculate Reflection
func (v Vector2d) Reflect(normal Vector2d) Vector2d {
	dotProduct := v.Dot(normal)
	return Vector2d{v.X - (2 * dotProduct * normal.X), v.Y - (2 * dotProduct * normal.Y)}
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
	return -1 * math.Atan2(v.Y*-1, v.X)
}

//Rotate Calculate rotation with  angle (radiant)
func (v Vector2d) Rotate(angle float64) Vector2d {
	return Vector2d{
		v.X*math.Cos(angle) - v.Y*math.Sin(angle),
		v.X*math.Sin(angle) - v.Y*math.Cos(angle),
	}
}

//LinearInterpolateToVector Calculate interpolation (linear)
func (v Vector2d) LinearInterpolateToVector(v2 Vector2d, amount float64) Vector2d {
	return Vector2d{
		linearInterpolate(v.X, v2.X, amount),
		linearInterpolate(v.Y, v2.Y, amount),
	}
}

//MapToScalars Map vector based on scalar valu
func (v Vector2d) MapToScalars(oldMin, oldMax, newMin, newMax float64) Vector2d {
	return Vector2d{
		mapFloat(v.X, oldMin, oldMax, newMin, newMax),
		mapFloat(v.Y, oldMin, oldMax, newMin, newMax),
	}
}

//MapToVectors Map vector based on vectors
func (v Vector2d) MapToVectors(oldMinV Vector2d, oldMaxV Vector2d, newMinV Vector2d, newMaxV Vector2d) Vector2d {
	return Vector2d{
		mapFloat(v.X, oldMinV.X, oldMaxV.X, newMinV.X, newMaxV.X),
		mapFloat(v.Y, oldMinV.Y, oldMaxV.Y, newMinV.Y, newMaxV.Y),
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
		clampFloat(v.X, min, max),
		clampFloat(v.Y, min, max),
	}
}

//ClampToVectors Calcualte
func (v Vector2d) ClampToVectors(minV, maxV Vector2d) Vector2d {
	return Vector2d{
		clampFloat(v.X, minV.X, maxV.X),
		clampFloat(v.Y, minV.Y, maxV.Y),
	}
}

//Floor vector values
func (v Vector2d) Floor() Vector2d {
	return Vector2d{
		math.Floor(v.X),
		math.Floor(v.Y),
	}
}

//Negate vector values
func (v Vector2d) Negate() Vector2d {
	return v.MultiplyScalar(-1)
}

//X x coordinate value
func (v *Vector2d) getX() float64 {
	return v.X
}

//Y Get y coordinate value
func (v *Vector2d) getY() float64 {
	return v.Y
}

//Get x & y coordinate value as tuple
func (v *Vector2d) Get() (float64, float64) {
	return v.X, v.Y
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
