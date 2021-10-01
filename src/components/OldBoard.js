import { useState } from 'react';
import Button from './Button';
import NumberBoard from './NumberBoard';
import WhiteBoard from './WhiteBoard';

const opLookup = {'+': (a, b) => a + b, '-': (a, b) => b - a, '*': (a, b) => a * b, '/': (a, b) => b / a}
const operations = ['+', '-', '*', '/'];

function Board() {
  const [target, setTarget] = useState(0);
  const [nums, setNums] = useState([-1, -1, -1, -1, -1, -1]);
  const [expr, setExpr] = useState('');
  var closest = { value: -1, expression: '' };
  var found = false;

  // (Old) Method - For every permutation, evaluate every polish notation expression
  function processNumbers(used, rem) {
    if (found) {
      return true;
    }
    if (used.length < 6) {
      for (let i = 0; i < rem.length; i++) {
        if (processNumbers(used.concat(rem[i]), rem.slice(0, i).concat(rem.slice(i + 1)))) {
          return true;
        }
      }
    } else {
      return processPNs(0, 0, [], used);
    }
  }

  function processPNs(numNums, numOps, used, rem) {
    if (found || (numNums === numOps + 1 && evaluateClosest(used))) {
      return true;
    }
    if (used.length >= 11) {
      return false;
    }
    let foundAnswer = numNums > numOps + 1;
    for (let i = 0; i < 4; i++) {
      foundAnswer &= processPNs(numNums, numOps + 1, used.concat(operations[i]), rem);
      if (foundAnswer) {
        return true;
      }
    }
    return foundAnswer || processPNs(numNums + 1, numOps, used.concat(rem[0]), rem.slice(1));
  }

  function evaluateClosest(pn) {
    let numStack = [];
    for (let i = pn.length - 1; i > -1 && !found; i--) {
      if (typeof(pn[i]) == 'number') {
        numStack.push(pn[i]);
      } else {
        let result = opLookup[pn[i]](numStack.pop(), numStack.pop());
        if (!isFinite(result)) {
          return;
        }
        numStack.push(result);
      }
      if (Math.abs(numStack[0] - target) <= Math.abs(closest.value - target)) {
        found = numStack[0] === target;
        closest.value = numStack[0];
        closest.expression = pn.slice(i);
      }
    }
    return closest.value === target;
  }

  function processExpression(pn) {
    let numStack = [];
    for (let i = pn.length - 1; i > -1; i--) {
      if (typeof(pn[i]) == 'number') {
        numStack.push({ value: pn[i], op: -1 });
      } else {
        let right = numStack.pop();
        let left = numStack.pop();
        switch(pn[i]) {
          case '+':
            numStack.push({ value: left.value + '+' + right.value, op: 0 });
            break;
          case '-': {
            let rightPart = 0 <= right.op && right.op <= 1 ? '\\left(' + right.value + '\\right)' : right.value;
            numStack.push({ value: left.value + '-' + rightPart, op: 1 });
            break;
          }
          case '*': {
            let leftPart = 0 <= left.op && left.op <= 1 ? '\\left(' + left.value + '\\right)' : left.value;
            let rightPart = 0 <= right.op && right.op <= 1 ? '\\left(' + right.value + '\\right)' : right.value;
            numStack.push({ value: leftPart + '\\times' + rightPart, op: 2 });
            break;
          }
          case '/':
            numStack.push({ value: '\\frac{' + left.value + '}{' + right.value +'}', op: 3 });
            break;
          default:
            break;
        }
      }
    }
    return numStack[numStack.length - 1].value;
  }
  
  function solveExpression() {
    var numbers = []
    for (let i = 0; i < 6; i++) {
      if (nums[i] < 0) {
        console.log('Missing Card #' + (i + 1))
        return;
      }
      numbers.push(nums[i])
    }
    found = false;
    closest = { value: nums[0], expression: nums[0] };
    processNumbers([], numbers);
    setExpr(closest.value + '=' + processExpression(closest.expression));
  }

  function updateNumbers(key, value) {
    setNums({ ...nums, [key]: value });
  }

  return (
    <div className='Board'>
      <Button onClick={solveExpression} text='test' />
      <WhiteBoard expression={expr} />
      <NumberBoard target={target} targetChange={setTarget} onChange={updateNumbers} />
    </div>
  );
}

export default Board;