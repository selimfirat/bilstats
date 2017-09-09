import React from 'react'
import DuckImage from '../assets/bilkent.svg'
import './HomeView.scss'

export const HomeView = () => (
  <div>
    <h4>Welcome to BilStats!</h4>
    <img className='bilkent' src={DuckImage} />
  </div>
)

export default HomeView
