export default function Footer({timeStamp}) {
    return <footer>
        <div className="footerContainer">
        <article className={"footerContacts"}> 
        <h4>Contacts</h4>
            <ul>
                <li>Tel: 99992222</li>
                <li>Email: CssIsHard@something.com</li>
                <li>Something else..</li>
            </ul>
        </article>
        <article className={"footerClock"}>
            <h4>Time</h4>
            <p>{timeStamp.date}</p>
            <p>{timeStamp.time}</p>
        </article>
        </div>
        <p className={"copyright"}>© I take no right for this... </p>
    </footer>
}