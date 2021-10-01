import { useState } from 'react';
import Button from './Button';
import NumberBoard from './NumberBoard';
import WhiteBoard from './WhiteBoard';
import ValueExpPair from '../ValueExpPair';

const opLookup = {'+': (a, b) => a + b, '-': (a, b) => b - a, '*': (a, b) => a * b, '/': (a, b) => b / a};

function Board() {
  const [target, setTarget] = useState(0);
  const [nums, setNums] = useState([-1, -1, -1, -1, -1, -1]);
  const [expr, setExpr] = useState('');
  const combinations = findCombinations([0, 1, 2, 3, 4, 5]);
  var closest = { value: -1, expression: '' };
  var found = false;
  var exprTable = {};

  // Method - Split into smaller chunks, find all possible values for each chunk and combine
  function processByChunks(numbers) {
    let len = numbers.length;
    for (let i = 0; i < len; i++) {
      exprTable[combToKey([i])] = new ValueExpPair([nums[i]], [nums[i]]);
    }
    let start = 0;
    let end = nCr(len, 1) - 1;
    for (let i = 1; i < len; i++) {
      start += nCr(len, i);
      end += nCr(len, i + 1);
      for (let j = start; j < end + 1; j++) {
        if (found) {
          break;
        }
        let res = new ValueExpPair([], []);
        let subCombs = findCombinations(combinations[j]);
        for (let k = 0; subCombs[k].length <= Math.floor(combinations[j].length / 2) && !found; k++) {
          let exp1 = exprTable[combToKey(subCombs[k])];
          let exp2 = exprTable[combToKey(combinations[j].filter((x) => subCombs[k].indexOf(x) < 0))];
          res.concatWith(findAllExpressions(exp1, exp2));
        }
        exprTable[combToKey(combinations[j])] = res;
      }
    }
  }

  function nCr(n, r) {
    if (2 * r > n) {
      r = n - r;
    }
    let res = 1;
    for (let i = 1; i < r + 1; i++) {
      res *= n - r + i;
      res /= i;
    }
    return res;
  }

  function combToKey(comb) {
    return comb.join('');
  }

  function findCombinations(arr){
    // adapted from: https://stackoverflow.com/a/42531964
    return new Array(1 << arr.length).fill().map((e1, i) => arr.filter((e2, j) => i & (1 << j))).sort((x, y) => x.length - y.length).slice(1);
  }

  function findAllExpressions(pair1, pair2) {
    if (found) {
      return new ValueExpPair([], []);
    }
    let values = [];
    let expressions = [];
    for (let i = 0; i < pair1.values.length; i++) {
      for (let j = 0; j < pair2.values.length; j++) {
        let newExprs = getAllArrangements(pair1.expressions[i], pair2.expressions[j]);
        let newVals = getAllArrangements(pair1.values[i], pair2.values[j]).map((pn) => opLookup[pn[0]](pn[1], pn[2]));
        values = values.concat(newVals);
        expressions = expressions.concat(newExprs);
      } 
    }
    return processPair(new ValueExpPair(values, expressions));
  }

  function processPair(pair) {
    let values = pair.values;
    let expressions = pair.expressions;
    let seen = [];
    let count = 0;
    for (let i = 0; i < values.length; i++) {
      if (seen.indexOf(values[i]) < 0 && isFinite(values[i]) && (values[i] >= 0) && (Number.isInteger(values[i]))) {
        let value = values[i];
        if (Math.abs(value - target) < Math.abs(closest.value - target)) {
          closest.value = value;
          closest.expression = expressions[i - count];
          if (value === target) {
            found = true;
            break;
          }
        } 
        seen.push(value);
      } else {
        expressions.splice(i - count, 1);
        count += 1;
      }
    }
    return new ValueExpPair(seen, expressions);
  }

  function getAllArrangements(exp1, exp2) {
    return [['+'].concat(exp1).concat(exp2), ['-'].concat(exp1).concat(exp2), ['-'].concat(exp2).concat(exp1), 
        ['*'].concat(exp1).concat(exp2), ['/'].concat(exp1).concat(exp2), ['/'].concat(exp2).concat(exp1)];
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
        console.log('Missing Card #' + (i + 1));
        return;
      }
      numbers.push(nums[i]);
    }
    found = false;
    closest = { value: numbers[0], expression: numbers[0] };
    exprTable = { '' : new ValueExpPair([], []) };
    processByChunks(numbers);
    setExpr(closest.value + '=' + processExpression(closest.expression));
  }

  function updateNumbers(key, value) {
    setNums({ ...nums, [key]: value });
  }

  return (
    <div className='Board'>
      <Button className='Solve' onClick={solveExpression} text='SOLVE' />
      <WhiteBoard expression={expr} />
      <NumberBoard target={target} targetChange={setTarget} onChange={updateNumbers} />
    </div>
  );
}

export default Board;