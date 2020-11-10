import { render, screen } from '@testing-library/react';
import IPSearchResults from '../IPSearchResults';

describe('IPSearchResults properly displays errors', () => {
  test('Displays server errors', () => {
    const error = {
        response: {
            data: {
                error: 'Server Error!'
            }
        }
    }
    render(<IPSearchResults error={ error } />);
 
    const errorMessage = screen.queryByText(/Server Error!/i);
    expect(errorMessage).toBeInTheDocument();

    const latitude = screen.queryByText(/Latitude/i);
    expect(latitude).not.toBeInTheDocument();

    const longitude = screen.queryByText(/Longitude/i);
    expect(longitude).not.toBeInTheDocument();
  });

  test('Displays no response from server errors', () => {
    const error = {
        request: {}
    }
    render(<IPSearchResults error={ error } />);
 
    const errorMessage = screen.queryByText(/No response received from server/i);
    expect(errorMessage).toBeInTheDocument();

    const latitude = screen.queryByText(/Latitude/i);
    expect(latitude).not.toBeInTheDocument();

    const longitude = screen.queryByText(/Longitude/i);
    expect(longitude).not.toBeInTheDocument();
  });

  test('Displays validation errors', () => {
    const error = {
        message: 'Validation error!'
    }
    render(<IPSearchResults error={ error } />);
 
    const errorMessage = screen.queryByText(/Validation error!/i);
    expect(errorMessage).toBeInTheDocument();

    const latitude = screen.queryByText(/Latitude/i);
    expect(latitude).not.toBeInTheDocument();

    const longitude = screen.queryByText(/Longitude/i);
    expect(longitude).not.toBeInTheDocument();
  });
});

describe('IPSearchResults displays geolocation results', () => {
  test('properly displays response with geolocation', () => {
    const results = {
        data: {
            location: {
                latitude: '10.5',
                longitude: '45.3',
            }
        }
    }
    render(<IPSearchResults results={ results } />);
 
    const latitude = screen.queryByText(/Latitude/i);
    expect(latitude).toBeInTheDocument();

    const longitude = screen.queryByText(/Longitude/i);
    expect(longitude).toBeInTheDocument();
  });

  test('properly displays response without geolocation or unexpected structure', () => {
    const results = {
        data: {
            location: {
            }
        }
    }
    render(<IPSearchResults results={ results } />);

    const message = screen.queryByText(/No location information available/i);
    expect(message).toBeInTheDocument();
 
    const latitude = screen.queryByText(/Latitude/i);
    expect(latitude).not.toBeInTheDocument();

    const longitude = screen.queryByText(/Longitude/i);
    expect(longitude).not.toBeInTheDocument();
  });
});