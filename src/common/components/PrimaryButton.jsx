import "../styles/button.css";

const PrimaryButton = ({ cta, wide, action, disabled, variant, children }) => {
  let classes = `px-4 py-[7px] sm:py-[9px] rounded-lg font-semibold text-white bg-brand hover:bg-brand-dark cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none btn-${variant}`;

  classes += wide ? " w-full" : "";

  return (
    <button onClick={action} className={classes} disabled={false || disabled}>
      {cta}
      {children}
    </button>
  );
};

export default PrimaryButton;
