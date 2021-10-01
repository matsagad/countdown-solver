import PropTypes from 'prop-types';
import Button from './Button';
import NumberCard from './NumberCard';

const numbersMap = [0, 1, 2, 3, 4, 5]

const NumberBoard = ({ target, targetChange, onChange }) => {
  function randomizeTarget(n) {
    if (n > 0) {
      targetChange(Math.floor(Math.random() * 898) + 101);
      setTimeout(() => randomizeTarget(n - 1), 75);
    }
  }
  return (
    <div className='NumberBoard'>
      <NumberCard value={target} isTarget={true} onChange={val => targetChange(val)} />
      <div>
        <Button className='Randomizer' onClick={() => randomizeTarget(10)} />
        {numbersMap.map(i => {return <NumberCard key={i} onChange={val => onChange(i, val)} />})}
      </div>
    </div>
  );
}

NumberBoard.propTypes = {
  target: PropTypes.number,
  targetChange: PropTypes.func,
  onChange: PropTypes.func,
}

export default NumberBoard;