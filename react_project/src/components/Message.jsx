function Message({ icon, text, children }) {
  return (
    <div>
      {text} - {icon} - {children}
    </div>
  );
}

export default Message;
