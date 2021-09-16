import MovieCard from "./MovieCard";

export default function Listings({fetchedMovies, timeStamp, searchQuery, setBookingObject, setMessage}) {

    let newArrayOfMoviesAfterFiltering = fetchedMovies

    const {
        queryTitle,
        queryDate,
        queryTime,
        querySort,
        removeAlreadyAired,
        removeFullSeats
    } = searchQuery;

    if (removeAlreadyAired) {
        newArrayOfMoviesAfterFiltering = newArrayOfMoviesAfterFiltering.filter(movie => movie.date >= timeStamp.date);
    }

    // TODO SOLVE THIS
    // function functionvalidateObjectViaTime(movieObject) {
    //     return movieObject.date === timeStamp.date ? movieObject.time.replace(":", "") >= String(timeStamp.time.replace(":", "")) : "" ;
    //   }

    // console.log(newArrayOfMoviesAfterFiltering.filter(movie => movie.date >= timeStamp.date && movie.date === timeStamp.date ? movie.time.replace(":", "") >= String(timeStamp.time.replace(":", "")) : ""));
    // if (removeAlreadyAired) {

    //     newArrayOfMoviesAfterFiltering = newArrayOfMoviesAfterFiltering.filter(movie => movie.date >= timeStamp.date && validateObjectViaTime(movie));
    // }




    if (removeFullSeats) {
        newArrayOfMoviesAfterFiltering = newArrayOfMoviesAfterFiltering.filter(movie => movie.seats.includes(true));
    }

    if (queryTitle) {
        newArrayOfMoviesAfterFiltering = newArrayOfMoviesAfterFiltering.filter(movie => movie.movieName.toLowerCase().includes(queryTitle));
    }

    if (queryDate) {
        newArrayOfMoviesAfterFiltering = newArrayOfMoviesAfterFiltering.filter(movie => movie.date.includes(queryDate));
    }

    if (queryTime) {
        newArrayOfMoviesAfterFiltering = newArrayOfMoviesAfterFiltering.filter(movie => movie.time >= queryTime);
    }

    if (querySort !== "showAll") {
        if (querySort === "startDate") {
            newArrayOfMoviesAfterFiltering = newArrayOfMoviesAfterFiltering.sort((x, y) => x.date.replaceAll("-", "") - y.date.replaceAll("-", ""));
        }
        if (querySort === "startTime") {
            newArrayOfMoviesAfterFiltering = newArrayOfMoviesAfterFiltering.sort((x, y) => x.time.replace(":", "") - y.time.replace(":", ""));
        }
    }

    if (newArrayOfMoviesAfterFiltering.length === 0) {
        newArrayOfMoviesAfterFiltering = false;
    }

    // DeBugging... console.log(newArrayOfMoviesAfterFiltering) console.log(
    // queryTitle,     queryDate,     queryTime,     querySort,
    // removeAlreadyAired,     removeFullSeats);

    // TODO Make sure time works as well
    // console.log( String(timeStamp.time.replace(":", "")));
    // console.log(newArrayOfMoviesAfterFiltering.filter(movie => movie.time.replace(":", "") >= String(timeStamp.time.replace(":", ""))))
    // console.log(newArrayOfMoviesAfterFiltering);

    return (
        <section className="listingContainer">
            {newArrayOfMoviesAfterFiltering
                ? newArrayOfMoviesAfterFiltering.map(movie => <MovieCard
                    key={movie.id}
                    movie={movie}
                    timeStamp={timeStamp}
                    setBookingObject={setBookingObject}
                    setMessage={setMessage}/>)
                : <p>There are no movies that matches your search D:
                </p>}
        </section>
    )
}
