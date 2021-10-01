import PropTypes from 'prop-types';
import { MathJax, MathJaxContext } from "better-react-mathjax";

function WhiteBoard(props) {
  const config = {
    loader: { load: ["[tex]/html"] },
    tex: {
      packages: { "[+]": ["html"] },
      inlineMath: [["$", "$"]],
      displayMath: [["$$", "$$"]],
    }
  };
  return (
    <div className='WhiteBoard'>
      <span className='dot' style={{transform: 'translate(2.25vmin, 4.5vmin)'}}></span>
      <span className='dot' style={{transform: 'translate(77.25vmin, 4.5vmin)'}}></span>
      <span className='dot' style={{transform: 'translate(2.25vmin, 39.5vmin)'}}></span>
      <span className='dot' style={{transform: 'translate(77.25vmin, 39.5vmin)'}}></span>
      <div className={'Expression ' + (props.expression === '' ? 'Hidden' : '')}>
        <MathJaxContext config={config} version={3}>
          <MathJax inline dynamic>
            {`$$\\color{#4c282f}{${props.expression}}$$`}
          </MathJax>
        </MathJaxContext>
      </div>
    </div>
  );
}

WhiteBoard.defaultProps = {
  expression: '',
}

WhiteBoard.propTypes = {
  expression: PropTypes.string,
}

export default WhiteBoard;