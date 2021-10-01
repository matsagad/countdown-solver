# Countdown Solver

<p align="center" width="100%">
  <img width="40%" src="https://github.com/matsagad/countdown-solver/blob/main/public/demo.gif" alt="Demo Video"/>
</p>

A neat little web app that finds and displays the best answer to a Countdown Numbers Game. The given solution conforms to the Countdown rules (i.e. no fractional intermediate steps, integers as answers, and not all numbers need to be used). If no exact answer is found, the closest one is provided.

## Algorithm

The first algorithm I used evaluates all valid polish notation expressions by considering all the number permutations and choices for operations as done in `OldBoard.js`. 

The current one makes use of a divide-and-conquer strategy of splitting the work by considering each combination of numbers, finding every value they could evaluate to (with their corresponding expressions), and recording all possible resulting values after combining them together. 

In hindsight, the older algorithm was inefficient in that for every permutation, the next to consider often only swaps two values. This means, apart from the non-commutative operations, everything else evaluates the same. By considering each individual combination instead, we eliminate the need to redundantly record the values that the four other numbers can make up.

## Other
Color palette used is [Cyber Ping Pong](https://lospec.com/palette-list/cyber-ping-pong) by sukinapan.
