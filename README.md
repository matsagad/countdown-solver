# Countdown Solver

<p align='center'>
  <img width="40%" src="https://github.com/matsagad/countdown-solver/blob/main/public/demo.gif" alt="Demo Video"/>
</p>

A React app that finds and displays the best answer to the [Countdown Numbers Game](https://wiki.apterous.org/Numbers_game). The given solution conforms to the Countdown rules (i.e. integers as answers, no fractional intermediate steps, basic operations only, and all numbers need not be used). If no exact answer is found, the closest one is provided. Try it out [here](https://matsagad.github.io/countdown-solver).

## Algorithm

A dynamic programming strategy is done by: splitting the numbers into two groups, finding all unique values a group could evaluate to (with their corresponding expressions), and recording all possible results when two groups are combined. Pairs of numbers are first considered, then, successively, every combination is solved until a combination of all the numbers is reached.

Initially, as in `OldBoard.js`, all valid polish notation expressions were evaluated by considering all the number permutations and choices for operations. In hindsight, this was inefficient in that for every permutation, the next to consider often only swaps two values. This means, apart from the non-commutative operations, everything else evaluates the same. By considering each individual combination instead, we eliminate the redundancy of recording values that the other numbers can make up.

## Other
Color palette used is [Cyber Ping Pong](https://lospec.com/palette-list/cyber-ping-pong) by sukinapan.
