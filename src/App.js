import {useEffect, useState} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import Search from "./components/Search";
import Booking from './components/Booking'
import TicketCard from "./components/TicketCard";
import BookingCard from "./components/BookingCard";
import PopupBox from "./components/PopupBox";

import './app.scss';
export default function App() {

    const [fetchedMovies,
        setfetchedMovies] = useState("");
    const [timeStamp,
        setTimeStamp] = useState({date: null, time: null})
    const [bookingObject,
        setBookingObject] = useState()
    const [message,
        setMessage] = useState("")

    useEffect(() => {
        fetch('data.json')
            .then(resp => resp.json())
            .then(data => setfetchedMovies(data))
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        console.log("date timestamp use effect ran");
        //Must be a better way than this....
        const interval = setInterval(() => {
            let date = new Date()
            var time = String(date.getHours()).padStart(2, "0") + ":" + String(date.getMinutes()).padStart(2, "0");
            setTimeStamp(spreadObject => ({
                ...spreadObject,
                date: date.toLocaleDateString(),
                time: time
            }));
        }, 1000);
        return () => clearInterval(interval);

    }, [])

    return (
        <div className={"appContainer"}>
            <Router>
                <Header/>
                <Switch>
                    <Route exact path="/">
                        <Home
                            fetchedMovies={fetchedMovies}
                            timeStamp={timeStamp}
                            setBookingObject={setBookingObject}
                            setMessage={setMessage}/>
                    </Route>
                    <Route exact path="/search">
                        <Search
                            fetchedMovies={fetchedMovies}
                            timeStamp={timeStamp}
                            setBookingObject={setBookingObject}
                            setMessage={setMessage}/>
                    </Route>
                    {/* Above this line is props passed down levels mainly used, bellow this one is composition, hence why they might be written diffrently. */}

                    <Route exact path="/booking">
                        <Booking>
                            {bookingObject
                                ? <BookingCard bookingObject={bookingObject}>
                                        <TicketCard
                                            bookingObject={bookingObject}
                                            setBookingObject={setBookingObject}
                                            setMessage={setMessage}/>
                                    </BookingCard>
                                : <p>Sorry, you need to book a movie first!</p>}
                        </Booking>
                    </Route>

                    <Route exact path="/booking">
                        <Booking
                            bookingObject={bookingObject}
                            setBookingObject={setBookingObject}
                            setMessage={setMessage}/>
                    </Route>

                    <Route component={NoMatchPage}/>
                </Switch>
                <Footer timeStamp={timeStamp}/>
                <PopupBox message={message} setMessage={setMessage}/>
            </Router>
        </div>
    );
}

const NoMatchPage = () => {
    return (
        <h3>404 - Not found</h3>
    );
};
