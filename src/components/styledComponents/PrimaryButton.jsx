const PrimaryButton = ({ cta, wide, action, disabled }) => {
  let classes =
    "px-4 py-[7px] sm:py-[9px] rounded-lg font-semibold text-white bg-faraday-night hover:bg-faraday-night-hover cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none";

  classes += wide ? " w-full" : "";

  return (
    <button
      onClick={() => action()}
      className={classes}
      disabled={false || disabled}
    >
      {cta}
    </button>
  );
};

export default PrimaryButton;
