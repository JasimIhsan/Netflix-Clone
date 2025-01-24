import { useEffect, useRef, useState, WheelEvent } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';

interface Props {
	title: string;
	category: string;
}

interface Movie {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
};


const TitleCards = (props: Props) => {
	const { title, category } = props;

	const [ apiData, setApiData ] = useState<Movie[]>([]);
	const cardsRef = useRef<HTMLDivElement>(null);

	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDJkMzA2YWFkMGViYmRhZDA3ZTYyZTE1YjZlNTBiZCIsIm5iZiI6MTczNzYyMDUxNi40NTksInN1YiI6IjY3OTFmYzI0ZThiNjdmZjgzM2ZhNzcyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GM4lTrCb3mCqMye4nK1BAPvxuQz7fwsCTao6jPvGia0'
		}
	};



	const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
		event.preventDefault();
		if (cardsRef.current) {
			cardsRef.current.scrollLeft += event.deltaY;
		}
	};

	useEffect(() => {
		fetch(`https://api.themoviedb.org/3/movie/${category ? category : 'now_playing'}?language=en-US&page=1`, options)
			.then(res => res.json())
			.then(res => setApiData(res.results))
			.catch(err => console.error(err));

		const refCurrent = cardsRef.current;
		if (refCurrent) {
			refCurrent.addEventListener('wheel', handleWheel as unknown as EventListener);
		}

		return () => {
			if (refCurrent) {
				refCurrent.removeEventListener('wheel', handleWheel as unknown as EventListener);
			}
		};
	}, []);

	return (
		<div className="title-cards">
			<h2>{title ? title : 'Popular on Netflix'}</h2>
			<div className="card-list" ref={cardsRef} >
				{
					apiData.map((card, index) => (
						<Link to={`/player/${card.id}`} className="card" key={index}>
							<img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt="Movie" />
							<p>{card.original_title}</p>
						</Link>
					)
					)
				}
			</div>
		</div>
	);
};

export default TitleCards;
