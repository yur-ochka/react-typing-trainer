export default function TextArea({ fullText }) {
  return (
    <div className="textArea">
      <textarea
        className="textAreaItem"
        name=""
        id="typingArea"
        cols="30"
        rows="10"
      ></textarea>
      <textarea
        className="crutchPlaceholder"
        name=""
        id="hintArea"
        cols="30"
        rows="10"
        value={fullText}
        readOnly
      ></textarea>
    </div>
  );
}
