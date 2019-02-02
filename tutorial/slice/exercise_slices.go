package main

import "golang.org/x/tour/pic"

//
func Pic(dx, dy int) [][]uint8 {
	img := make([][]uint8, dy)
	for ind := range img {
		img[ind] = make([]uint8, dx)
		for jnd := range img[ind] {
			img[ind][jnd] = uint8(ind * jnd)
		}
	}
	return img
}

func main() {
	pic.Show(Pic)
}
