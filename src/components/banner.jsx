import { useContext } from 'react';
import logo from '../assets/globo-logo.png';
import { logo as logoClass } from './banner.module.css';
import { subtitle as subtitleClass } from './banner.module.css';
import propTypes from 'prop-types';
import navigationContext from '../navigation/navigation-context';
import navigationValues from '../navigation/navigation-values';

function Banner({ children }) {
  const { navigate } = useContext(navigationContext);

  return (
    <header className='row'>
      <div className='col-5 mb-4'>
        <img src={logo} alt="logo" className={logoClass} onClick={() => navigate(navigationValues.home)} />
      </div>
      <div className={`col-7 mt-5 ${subtitleClass}`}>
        {children}
      </div>
    </header>
  );
}

Banner.propTypes = {
  headerText: propTypes.string.isRequired
}

export default Banner;