const SecondaryButton = ({ cta, wide, action }) => {
  let classes =
    "px-4 py-[7px] sm:py-[9px] rounded-lg font-semibold text-brand hover:bg-brand-highlight ";

  classes += wide ? " w-full" : "";
  return (
    <button
      onClick={() => action}
      className={classes}
      style={{ border: "1.4px solid #05b851" }}
    >
      {cta}
    </button>
  );
};

export default SecondaryButton;
