import logo from "../assets/logo.png";
import PropTypes from "prop-types";

function Logo(props) {
  return (
    <div className="bg-slate-200 rounded-xl">
      <img src={logo} alt="kx-store logo" className={props.heigh} />
    </div>
  );
}

Logo.propTypes = {
  heigh: PropTypes.string,
};

export default Logo;
