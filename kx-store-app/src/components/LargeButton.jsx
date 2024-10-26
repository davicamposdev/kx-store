import PropTypes from "prop-types";

function LargeButton(props) {
  return (
    <button
      onClick={props.onClick}
      className="border border-slate-400 py-2 w-full rounded-xl bg-kx-orange text-xl text-slate-200"
    >
      {props.text}
    </button>
  );
}

LargeButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default LargeButton;
