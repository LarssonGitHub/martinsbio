export default function SeatingCard({seatingIndex, seatingValue, bookSeating}) {
    
    // todo CLEAN THIS MESS UP....
    return (
        <>
            {seatingValue === false
                ? <span className="seat unavailable">  <b>{seatingIndex}</b> </span>
                : <span className={`seat ${seatingValue !== "booked" ? "free" : "booked"}`} onClick={bookSeating}><b>{seatingIndex}</b></span>}
       </>
    )
}