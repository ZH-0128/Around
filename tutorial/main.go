package main

import (
	"fmt"
	"math"
	"runtime"
	"time"
)

// struct
type Vertex struct {
	X int
	Y int
}

func add(x, y int) int {
	return x + y
}
func swap(x, y string) (string, string) {
	return y, x
}

//  named return / also naked return
func split(sum int) (x, y int) {
	x = sum * 4 / 9
	y = sum - x
	return
}

// Exercise: Loops and Functions, newton's methods to find the sqrt
func sqrt(x float64) float64 {
	z, oldZ := 1., 0.
	for math.Abs(oldZ-z) > 1e-8 {
		oldZ = z
		for i := 0; i < 10; i++ {
			z -= (z*z - x) / (2 * z)
		}

	}
	return z
}

func printSlice(s []int) {
	fmt.Printf("length is %d, cap is %d, slice is %v", len(s), cap(s), s)
}

// var declares a list of variables with initialization
var a, b, c = 1, 0, 2

func main() {

	v := Vertex{1, 2}
	p := &v
	p.X = v.Y
	fmt.Println(p)
	// Inside a function, the := short assignment
	// statement can be used in place of a var declaration with implicit type.
	// Outside a function, every statement begins with a keyword
	// (var, func, and so on) and so the := construct is not available.
	// var i, j int = 1, 2
	// k := 3
	// c, python, java := true, false, "no!"
	// fmt.Println(i, j, k, c, python, java)
	// fmt.Println(a, b, c)
	// h := "a"
	// fmt.Printf("%v\n", h)

	// const cannot use :=
	const n = 1
	b := 72
	// defer to execute it when the main func returns, multiple defers are store into stack
	defer fmt.Printf("Type is %c\n%v\n", b, n)
	// for loop, init and post statements are optional(while)
	sum := 1
	for sum < 1000 {
		sum += sum
	}
	fmt.Println(sum)
	// infinite loop
	// for {

	// }

	// if with a short statement, only avaliable in if and else blocks
	// if v := math.Pow(2, 2); v < 7 {
	// 	fmt.Println(v)
	// }

	// swtich statement
	switch os := runtime.GOOS; os {
	case "darwin":
		fmt.Println(os)
		fmt.Println("OS X.")
	case "linux":
		fmt.Println("Linux.")
	default:
		// freebsd, openbsd,
		// plan9, windows...
		fmt.Printf("%s.", os)
	}
	today := time.Now().Weekday()
	fmt.Printf("%v\n", today)
	//pointers
	i := 42

	ptr := &i       // point to i
	fmt.Println(*p) // read i through the pointer
	*ptr = 21       // set i through the pointer
	fmt.Println(i)  // see the new value of i

	// array

	primes := [6]int{2, 3, 5, 7, 11, 13}
	fmt.Println(primes)

	// slices

	var s = primes[:4]
	printSlice(s)
	s = s[:5]
	printSlice(s)
	// s := primes[1:4]
	// var s = primes[1:4]

	// var a = 1

	fmt.Printf("%T\n", s)

	names := [4]string{
		"John",
		"Paul",
		"George",
		"Ringo",
	}
	var a = names[1:3]
	a[0] = "XXX"
	fmt.Println(names)

	// struct array
	sArray := []struct {
		i int
		b bool
	}{
		{2, true},
		{3, false},
		{5, true},
		{7, true},
		{11, false},
		{13, true},
	}
	fmt.Println(sArray)
	fmt.Printf("%T\n", sArray)

	// You can extend a slice's length by re-slicing it, provided it has sufficient capacity

	// dynamically allocate the slice using make function
	// b := make([]int, 0, 5)
	// printSlice("b", b)
	// append function can append more elements in the slice
	// s = append(s, 2, 3, 4)
}
