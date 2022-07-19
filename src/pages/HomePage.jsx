import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { ALL_COUNTRIES } from '../config';
import { Controls } from '../components/Controls';
import { List } from '../components/List';
import { Card } from '../components/Card';

export const HomePage = ({ countries, setCountries }) => {
    const [filtredCountries, setFiltredCountries] = useState(countries);
    const navigate = useNavigate();

    const handleSearch = (search, region) => {
        let data = [...countries];
        if (region) {
            data = data.filter((c) => c.region.includes(region));
        }
        if (search) {
            data = data.filter((c) =>
                c.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        setFiltredCountries(data);
    };

    useEffect(() => {
        if (!countries.length)
            axios.get(ALL_COUNTRIES).then(({ data }) => setCountries(data));
    }, []);
    return (
        <>
            <Controls onSearch={handleSearch} />
            <List>
                {filtredCountries.map((c) => {
                    const countryInfo = {
                        img: c.flags.png,
                        name: c.name,
                        info: [
                            {
                                title: 'Population',
                                description: c.population.toLocaleString(),
                            },
                            {
                                title: 'Region',
                                description: c.region,
                            },
                            {
                                title: 'Capital',
                                description: c.capital,
                            },
                        ],
                    };
                    return (
                        <Card
                            key={c.name}
                            onClick={() => navigate(`/country/${c.name}`)}
                            {...countryInfo}
                        />
                    );
                })}
            </List>
        </>
    );
};
