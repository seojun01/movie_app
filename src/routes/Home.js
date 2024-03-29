import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Home() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const getMovies = async() => {
        const json = await (await fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year")).json();
        setMovies(json.data.movies);
        setLoading(false);
    };
    useEffect(() => {
        getMovies();
    }, []);
    return (
        <div>
            {loading ? <h3>Loading...</h3> : movies.map((movie) => (
                <div key={movie.id}>
                    <img src={movie.medium_cover_image} />
                    <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                    <p>{movie.summary}</p>
                    <ul>
                        {movie.genres.map((g) => (<li key={g}>{g}</li>))}
                    </ul>
                </div>
                ))}
        </div>
    );
}

export default Home;