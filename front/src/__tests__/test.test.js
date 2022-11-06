import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Modal from '../components/modal';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Movie from '../components/movie';
import {BrowserRouter, MemoryRouter} from 'react-router-dom'
import App from '../App';


describe('Movie', () => {
    test('Should render', async ()=> {
        render(<Movie />)
    })
})

describe('Footer', () => {
    test('Should footer', async ()=> {
        render(<Footer />)
    })
})

test('Render app', async () => {
    render(<App />, {wrapper: BrowserRouter})
    expect(screen.getByText(/Netfrick, streaming for the poor/i)).toBeInTheDocument()
  })