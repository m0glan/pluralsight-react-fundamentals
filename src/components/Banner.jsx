import logo from '../assets/globo-logo.png';
import { logo as logoClass } from './Banner.module.css';
import { subtitle as subtitleClass } from './Banner.module.css';
import propTypes from 'prop-types';

function Banner({ headerText }) {
  return (
    <header className='row'>
      <div className='col-5 mb-4'>
        <img src={logo} alt="logo" className={logoClass} />
      </div>
      <div className={ `col-7 mt-5 ${subtitleClass}` }>
        { headerText }
      </div>
    </header>
  );
}

Banner.propTypes = {
  headerText: propTypes.string.isRequired
}

export default Banner;