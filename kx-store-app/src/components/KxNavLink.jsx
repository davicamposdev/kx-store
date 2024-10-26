import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function KxNavLink(props) {
  return (
    <div>
      <Link to={props.to}>
        <div className="flex gap-2">
          {props.icon}
          {props.text}
        </div>
      </Link>
    </div>
  );
}

KxNavLink.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  icon: PropTypes.element,
};

export default KxNavLink;
