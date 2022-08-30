const PrimaryButton = ({ cta, wide, action, disabled }) => {
  let classes =
    "px-4 py-[7px] sm:py-[9px] rounded-lg font-semibold text-white bg-brand hover:bg-brand-dark cursor-pointer";

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
