const PrimaryButton = ({ cta, action }) => {
  return (
    <button
      onClick={() => action()}
      className="px-4 py-[9px] rounded-lg font-semibold text-white bg-brand hover:bg-brand-dark"
    >
      {cta}
    </button>
  );
};

export default PrimaryButton;
