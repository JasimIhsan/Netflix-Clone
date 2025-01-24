import { useEffect, useState } from 'react';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';
import './Player.css'

interface ApiData {
	name: string;
	key: string;
	published_at: string;
	typeof: string;
}

const Player = () => {

	const {id} = useParams();
	const navigate = useNavigate();
	const [ apiData, setApiData ] = useState<ApiData>({
		name: "",
		key: "",
		published_at: "",
		typeof: ""
	})

	const url = `https://www.youtube.com/embed/${apiData.key}`

	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDJkMzA2YWFkMGViYmRhZDA3ZTYyZTE1YjZlNTBiZCIsIm5iZiI6MTczNzYyMDUxNi40NTksInN1YiI6IjY3OTFmYzI0ZThiNjdmZjgzM2ZhNzcyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GM4lTrCb3mCqMye4nK1BAPvxuQz7fwsCTao6jPvGia0'
		}
	};

	useEffect(() => {
		fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
			.then(res => res.json())
			.then(res => setApiData(res.results[ 0 ]))
			.catch(err => console.error(err));
	}, [])

	return (
		<div className='player'>
			<img onClick={() => navigate(-2)} src={back_arrow_icon} alt="" />
			<iframe src={url} width='90%' height='90%' title='trailer' frameBorder='0' allowFullScreen></iframe>
			<div className="player-info">
				<p>{apiData.published_at.slice(0, 10)}</p>
				<p>{apiData.name}</p>
				<p>{apiData.typeof}</p>
			</div>
		</div>
	)
}

export default Player
