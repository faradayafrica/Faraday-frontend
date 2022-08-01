const PrimaryButton = ({ cta, wide, action }) => {
  let classes =
    "px-4 py-[9px] rounded-lg font-semibold text-white bg-brand hover:bg-brand-dark";

  classes += wide ? " w-full" : "";
  return (
    <button onClick={() => action()} className={classes}>
      {cta}
    </button>
  );
};

export default PrimaryButton;
