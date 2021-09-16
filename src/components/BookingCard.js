export default function BookingCard({children, bookingObject}) {

    const {
        movieName,
        img,
        runtime,
        seats,
        date,
        time
    } = bookingObject;

    function countFreeSeats() {
        return seats
            .filter(d => d)
            .length;
    }

    return (
        <section>
            <h2>{movieName}</h2>
            <p>{date}</p>
            <p>{time}</p>
            {img
                ? <img src={img} alt={movieName} width="200"></img>
                : <img src={'./assets/no_image.jpeg'} alt={movieName} width="200"></img>}
            <p>Runtime: {runtime}</p>
            <p>Seats available: {countFreeSeats()} of {seats.length}</p>
            {children}
        </section>
    )
}