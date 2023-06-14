const Spinner = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="w-8 h-8 rounded-full animate-spin
                    border-4 border-solid border-purple-500 border-t-transparent"
      ></div>
    </div>
  );
};

export default Spinner;
