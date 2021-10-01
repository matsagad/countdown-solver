import PropTypes from 'prop-types'

const Button = ({className, onClick, text}) => {
  return (
    <button onClick={onClick} className={'Button ' + className}>
      {text}
    </button> 
  );
}

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button;