import React, { useState, useEffect } from "react";
import "./countrydetail.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const CountryDetail = () => {
	let { id } = useParams();
	const [country, setCountry] = useState([]);

	useEffect(() => {
		const getCountryByName = async () => {
			const { data } = await axios.post(
				`http://localhost:4300/api/v2/country/`,
				{ name: id }
			);
			setCountry(data);
		};
		getCountryByName();
	}, [id]);

	return (
		<div className='countryDetail__container'>
			<header>
				<p>Where in the world?</p>
				<p>Explore</p>
			</header>
			<div className='singleCountry__container'>
				<Link to='/explore'>
					<i className='fas fa-long-arrow-left    '></i>
					back
				</Link>
				{country.map((state, index) => {
					const {
						name: { common },
						population,
						region,
						capital,
						flags,
						subregion,
						languages,
					} = state;

					return (
						<div className='singleCountry__detail' key={index}>
							<img src={flags.svg} alt='' />
							<div className='singleCountry__detailContainer'>
								<div className='singleCountry__detailed'>
									<h4>{common}</h4>
									<p>
										Population: <span>{population}</span>
									</p>
									<p>
										Region: <span>{region}</span>
									</p>
									<p>
										Sub Region: <span>{subregion}</span>
									</p>
									<p>
										Capital: <span>{capital}</span>
									</p>
									<p>
										Languages:{" "}
										{Object.keys(languages).map(function (key, index) {
											return (
												<span className='language__element' key={index}>
													{languages[key]}
												</span>
											);
										})}
									</p>
								</div>
								<div className='singleCountry__detailedTwo'>
									<p>
										TopLevelDomain: <span>.be</span>
									</p>
									<p>
										Currencies: <span>Eur</span>
									</p>
									<p>
										Languages: <span>Dutch, French, German</span>
									</p>
								</div>
								<div className='singleCountry__borders'>
									<p>Border Countries:</p>
									<span>Netherlands</span>
									<span>Germany</span>
									<span>England</span>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default CountryDetail;
