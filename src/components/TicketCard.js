import {useHistory} from 'react-router'
import {useState} from "react";
import SeatingCard from "./SeatingCard"
export default function TicketCard({bookingObject, setBookingObject, setMessage}) {

    let {seats} = bookingObject

    const history = useHistory()

    const [totalSeats,
        setTotalSeats] = useState(seats)

    const [tickets,
        setTickets] = useState(1)

    const [orderStep,
        setOrderStep] = useState(true)


    function sortFreeSeats() {
        let countSeats = totalSeats
            .filter(seat => seat === true)
            .length
        if (countSeats === 0) {
            return "No free seats"

        }
        return countSeats;
    }

    function incrementTickets() {
        if (tickets >= sortFreeSeats()) {
            setMessage("Can't order more than tickets than there are free seats")
            return;
        }
        setTickets(tickets => tickets += 1)
    }

    function decreaseTickets() {
        if (tickets <= 1) {
            setMessage("You must at least order 1 ticket")
            return;
        }
        setTickets(tickets => tickets -= 1)
    }

    const bookSeating = (seatingIndex) => {
        const newSeats = [...totalSeats];
        if (newSeats[seatingIndex] === false) {
            return setMessage("How did you do that?");
        }
        if (newSeats[seatingIndex] === true) {
            if (tickets === 0 || !tickets) {
                return setMessage("You have already booked all your tickets.. proceed to checkout");
            }
            newSeats[seatingIndex] = "booked";
            setTickets(tickets => tickets - 1)
            return setTotalSeats(newSeats)
        }
        if (newSeats[seatingIndex] === "booked") {
            newSeats[seatingIndex] = true;
            setTickets(tickets => tickets + 1)
            return setTotalSeats(newSeats)
        }
    }

    function validateOrder() {
        try {
            if (tickets !== 0) {
                throw new Error("User still has tickets");
            }

            const updatedSeats = totalSeats.map(seat => seat === "booked"
                ? false
                : seat);

            if (!Array.isArray(updatedSeats) || !updatedSeats.includes(true) || !updatedSeats.includes(false)) {
                throw new Error("The validation of seats didn't go through");
            }

            setBookingObject({
                ...bookingObject,
                seats: updatedSeats
            });

            return true;

        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async function postToDummyApi(url) {
        return fetch(url, {
            method: 'PUT',
            body: JSON.stringify(bookingObject),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
            .then(resp => resp.json())
            .then(data => {
                if (!data) {
                    throw new Error("something went wrong with fetch....")
                }
                return data;
            })

    }

    function createBookingNumber() {
        function bookingNumber() {
            const lettersAsString = `A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,0,1,2,3,4,5,6,7,8,9`;
            const letters = lettersAsString.split(',');
            let randStr = '';
            for (let i = 0; i < 40; i++) {
                randStr += letters[Math.floor(Math.random() * letters.length)];
            };
            return randStr;
        };

        let getBookingNumber = bookingNumber()

        const allSeatNumbers = totalSeats.map((seat, i) => seat === 'booked'
            ? i
            : -1).filter(index => index !== -1);

        alert("congrats, your booking number is\r\n" + getBookingNumber + "\r\n\r\nwith the seat Numbers of..." + allSeatNumbers)

        history.go(0)
    }

    async function checkout() {

        try {
            const validationAccepted = validateOrder()

            if (validationAccepted instanceof Error) {
                throw new Error(validationAccepted)
            }

            const fetchAccepted = await postToDummyApi('https://jsonplaceholder.typicode.com/posts/1')
                .then(anwser => {
                return anwser
            })
                .catch(error => {
                    return error
                });

            if (fetchAccepted instanceof Error) {
                throw new Error(fetchAccepted)
            }

        } catch (error) {
            alert(error)
            return;
        }

        createBookingNumber()

    }

    return (
        <section>
            {orderStep
                ? <section>
                        <h3>Number of Tickets</h3>
                        <button onClick={() => decreaseTickets()}>←</button>
                        <p>{tickets}</p>
                        <button onClick={() => incrementTickets()}>→</button>
                        <button onClick={() => setOrderStep(false)}>Next</button>
                    </section>
                : <section>
                    <h3>Choose your seat</h3>
                    <div className="seatingContainer">
                        {totalSeats.map((seating, seatingIndex) => <SeatingCard
                            key={seatingIndex}
                            seatingIndex={seatingIndex}
                            seatingValue={seating}
                            bookSeating={() => bookSeating(seatingIndex)}/>)}
                    </div>
                    <button onClick={() => setOrderStep(true)}>Back</button>
                </section>}
            {tickets === 0
                ? <button onClick={() => checkout()}>Order Your seats</button>
                : ""}
        </section>
    )
}