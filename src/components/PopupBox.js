export default function PopupBox({message,setMessage}) {
    return (
        message === "" ? "" : <span className="popupBox"><span className="popupMessage">{message}</span> <span className="popupBtn" onClick={() => setMessage("")}>X</span></span>
    )
}
