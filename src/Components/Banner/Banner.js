import { Typography } from '@mui/material';
import { Container } from '@mui/system'
import React from 'react'
import './Banner.css'
import Carousel from './Carousel';


const Banner = () => {

  return (
    <div className='banner'>
        <Container className='bannercontent'>
          <div className='tagline'>
            <Typography variant='h2' style={{
              fontWeight: "bold",
              marginBottom: 15,
            }}>
              Crypto Tracker
            </Typography>
            <Typography variant='subtitle2' style={{
              color: "darkgrey",
              textTransform: "capitalize",
            }}>
              Get all the info regarding your favorite Crypto Currency
            </Typography>
          </div>
          <Carousel/>
        </Container>
    </div>
  );
};

export default Banner