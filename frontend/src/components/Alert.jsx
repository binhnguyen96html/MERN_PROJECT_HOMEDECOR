const Alert = ({ color, content }) => {
  return (
    <div
      role="alert"
      className={`mt-4 mb-4 border border-${color}-500`}
    >
      <div className={`text-${color}-500 font-bold rounded-t px-4 py-2`}>
        Alert
      </div>
      <div
        className={`border-t border-${color}-400  bg-${color}-100 
      px-4 py-3 text-${color}-700`}
      >
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Alert;
