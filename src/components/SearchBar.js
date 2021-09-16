export default function Home({searchQuery, setsearchQuery, clearsearchQueryState}) {

    const handleChange = event => {
        let {name, value} = event.target;
        if (event.target.type === "checkbox") {
            value = event.target.checked;
        }
        setsearchQuery(spreadObject => ({
            ...spreadObject,
            [name]: value === String
                ? value.toLowerCase()
                : value
        }));
    };

    return (
        <nav>
            <h2>Search movies</h2>
            <label htmlFor="textInput">
                Name of movie:
            </label>
            <input
                name="queryTitle"
                id="textInput"
                type="text"
                value={searchQuery.text}
                onInput={handleChange}/>
            <br/>
            < label htmlFor="sortByInput">
                Order by:
            </label>
            <span>
                <input
                    name="querySort"
                    id="sortByInput"
                    type="radio"
                    value={"startDate"}
                    onInput={handleChange}/>
                Start Date
                <input
                    name="querySort"
                    id="sortByInput"
                    type="radio"
                    value={"startTime"}
                    onInput={handleChange}/>
                Start Time
                <input
                defaultChecked 
                    name="querySort"
                    id="sortByInput"
                    type="radio"
                    value={"showAll"}
                    onInput={handleChange}/>
                Show all
            </span>
            <br/>
            < label htmlFor="dateInput">
                Search Specific date
            </label>
            <input
                type="date"
                id="dateInput"
                name="queryDate"
                value={searchQuery.date}
                onInput={handleChange}/> {/* search after time.. */}

            < label htmlFor="timeInput">
                Search what time
            </label>
            <input
                type="time"
                id="timeInput"
                name="queryTime"
                value={searchQuery.time}
                onInput={handleChange}/>
            <br/>

            < label htmlFor="checkBoxAired">
            Don't show movies that has already Aired
            </label>
            <input
                 defaultChecked 
                type="checkbox"
                id="checkBoxAired"
                name="removeAlreadyAired"
                checked={searchQuery.airing}
                onChange={handleChange}/>

            <br/>
            < label htmlFor="checkBoxSeats">
                Don't show movies with full seats
            </label>
            <input
                  defaultChecked 
                type="checkbox"
                id="checkBoxSeats"
                name="removeFullSeats"
                checked={searchQuery.seats}
                onChange={handleChange}/>
            <br/>
            <span className="fakeHyperlink" onClick={() => clearsearchQueryState()}>Reset search</span>
        </nav>
    )
}
