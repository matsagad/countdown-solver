# Countdown Solver

<p align='center'>
  <img width="40%" src="https://github.com/matsagad/countdown-solver/blob/main/public/demo.gif" alt="Demo Video"/>
</p>

A neat little web app that finds and displays the best answer to the [Countdown Numbers Game](https://wiki.apterous.org/Numbers_game). The given solution conforms to the Countdown rules (i.e. integers as answers, no fractional intermediate steps, basic operations only, and all numbers need not be used). If no exact answer is found, the closest one is provided. Try it out [here](https://matsagad.github.io/countdown-solver).

## Algorithm

The first algorithm I used evaluates all valid polish notation expressions by considering all the number permutations and choices for operations as done in `OldBoard.js`. 

The current one makes use of a divide-and-conquer strategy of splitting the work by considering each combination of numbers, finding every value they could evaluate to (with their corresponding expressions), and recording all possible resulting values after combining them together. 

In hindsight, the older algorithm was inefficient in that for every permutation, the next to consider often only swaps two values. This means, apart from the non-commutative operations, everything else evaluates the same. By considering each individual combination instead, we eliminate the need to redundantly record the values that the four other numbers can make up.

## Other
Color palette used is [Cyber Ping Pong](https://lospec.com/palette-list/cyber-ping-pong) by sukinapan.
