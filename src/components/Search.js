import {useHistory} from 'react-router'
import {useState} from "react";
import SearchBar from "./SearchBar"
import SearchListings from "./SearchListings"

export default function Search(props) {
    const {fetchedMovies, timeStamp, setBookingObject, setMessage} = props;
    const history = useHistory()
    function clearsearchQueryState() {
        const initialSearchQueryState = {
            queryTitle: "",
            queryDate: "",
            queryTime: "",
            querySort: "date",
            removeAlreadyAired: true,
            removeFullSeats: true
        }
        setsearchQuery({
            ...initialSearchQueryState
        });
        // TODO I have no idea how to clean the values on inputs.. So will just...
        // Reload the page.
        history.go(0)
    };

    const [searchQuery,
        setsearchQuery] = useState({queryTitle: "", queryDate: "", queryTime: "", querySort: "showAll", removeAlreadyAired: true, removeFullSeats: true});

    return (
        <main>
            <h1>Our offering</h1>
            <section>
                <SearchBar
                    searchQuery={searchQuery}
                    setsearchQuery={setsearchQuery}
                    clearsearchQueryState={clearsearchQueryState}/>
            </section>
            <section>
                <h2>Results:</h2>
                {(fetchedMovies) && (timeStamp.date || timeStamp.time)
                    ? <SearchListings
                            fetchedMovies={fetchedMovies}
                            timeStamp={timeStamp}
                            searchQuery={searchQuery}
                            setBookingObject={setBookingObject}
                            setMessage={setMessage}/>
                    : <h1>Loading</h1>}

            </section>
        </main>
    );
}