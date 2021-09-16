import HomeListings from "./HomeListings"

export default function Home({fetchedMovies, timeStamp, setBookingObject}) {

    return (
        <main>
            <h1>Welcome to my movie</h1>

            <section>
                <p>lorem, lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
                    lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
                    lorem lorem lorem lorem lorem lore</p>
            </section>

            <section>
                <h2>What's on today?</h2>
                {(fetchedMovies) && (timeStamp.date || timeStamp.time)
                    ? <HomeListings
                            fetchedMovies={fetchedMovies}
                            timeStamp={timeStamp}
                            setBookingObject={setBookingObject}/>
                    : <h1>Loading</h1>}
            </section>

        </main>
    )
}
