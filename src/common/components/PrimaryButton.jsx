import "../styles/button.css";

const PrimaryButton = ({
  cta,
  wide,
  action,
  disabled,
  variant,
  children,
  className,
}) => {
  let classes = `px-4 py-[7px] sm:py-[9px] rounded-lg font-semibold text-white bg-faraday-night hover:bg-faraday-night-hover cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none btn-${variant}`;

  classes += wide ? " w-full" : "";
  classes += className ? ` ${className}` : "";

  return (
    <button onClick={action} className={classes} disabled={false || disabled}>
      {cta}
      {children}
    </button>
  );
};

export default PrimaryButton;
