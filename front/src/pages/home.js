import React from 'react';
import {Navigate, Outlet} from 'react-router-dom'
import Navbar from "./homeNav";
import ReactPlayer from 'react-player'
import LastMovies from '../components/lastMovies';
import MostViewed from '../components/mostViewed';
import ('./home.css')

function Home(props) {
    return (
        <><div className='home'><Navbar />
                <div className='lastMovies'>
                    <h1 className='netfrick'>Netfrick, streaming for the poor</h1>
                    <LastMovies />
                    <MostViewed />
                </div>
            </div><div className="video">
            <ReactPlayer url='https://youtu.be/_SQVLIqqUww' playing muted width="100%" height="500px" />
        </div></>
    )
}

export default Home;