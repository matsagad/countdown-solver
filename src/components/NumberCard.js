import { useState } from 'react';
import PropTypes from 'prop-types';

function NumberCard(props) {
  const [value, setValue] = useState(props.isTarget ? 0 : -1);
  function padThreeZeros(num) {
    let strNum = String(num);
    while (strNum.length < 3) {
      strNum = '0' + strNum;
    }
    return strNum;
  }
  function displayValue(val) {
    return props.isTarget ? padThreeZeros(val) : (val >= 0 ? String(val) : '');
  }
  const inputHandler = (event) => {
    if (event.target.value === '') {
      setValue(-1);
      props.onChange(-1);
      return;
    } 
    let newValue = parseInt(event.target.value);
    if (0 <= newValue && newValue <= 999) {
      setValue(newValue);
      props.onChange(newValue);
      return;
    }
  }
  return (
    <input 
      value={displayValue(props.isTarget ? props.value : value)}
      onInput={inputHandler}
      className={'NumberCard ' + (props.isTarget ? 'Target' : (value >= 0 ? '' : 'Empty'))}
    />
  );
}

NumberCard.defaultProps = {
  isTarget: false,
  value: -1,
}

NumberCard.propTypes = {
  isTarget: PropTypes.bool,
  value: PropTypes.number,
}

export default NumberCard;