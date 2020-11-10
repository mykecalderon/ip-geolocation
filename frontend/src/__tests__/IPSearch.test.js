import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import IPSearch from '../IPSearch';
import TestResponse from '../TestResponse';

const baseUrl = process.env.REACT_APP_BASE_URL;

const server = setupServer(
  rest.post(`${baseUrl}ip/search`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(TestResponse)
    )
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Validates against empty string', async () => {
  render(<IPSearch />)

  const searchInput = screen.getByRole('textbox');
  const submitButton = screen.queryByRole('button');

  fireEvent.change(searchInput, {
    target: { value: '' },
  });
  fireEvent.click(submitButton);

  expect(screen.queryByText(/Please enter a valid IPv4/i)).toBeInTheDocument();
})

test('Validates against wrong format', async () => {
  render(<IPSearch />)

  const searchInput = screen.getByRole('textbox');
  const submitButton = screen.queryByRole('button');

  // out of range
  fireEvent.change(searchInput, {
    target: { value: '0.0.0.256' },
  });
  fireEvent.click(submitButton);

  expect(screen.queryByText(/Please enter a valid IPv4/i)).toBeInTheDocument();

  fireEvent.change(searchInput, {
    target: { value: '-1.0.0.0' },
  });
  fireEvent.click(submitButton);

  expect(screen.queryByText(/Please enter a valid IPv4/i)).toBeInTheDocument();

  // wrong number of parts
  fireEvent.change(searchInput, {
    target: { value: '0.0.0' },
  });
  fireEvent.click(submitButton);

  expect(screen.queryByText(/Please enter a valid IPv4/i)).toBeInTheDocument();

  // NaN
  fireEvent.change(searchInput, {
    target: { value: 'test' },
  });
  fireEvent.click(submitButton);

  expect(screen.queryByText(/Please enter a valid IPv4/i)).toBeInTheDocument();
})

test('displays loading gif during request', async () => {
  render(<IPSearch />)

  const searchInput = screen.getByRole('textbox');

  fireEvent.change(searchInput, {
    target: { value: '111.222.111.222' },
  });

  const submitButton = screen.queryByRole('button');
  fireEvent.click(submitButton);

  const loading = screen.queryByText(/Loading.../i);
  expect(loading).toBeInTheDocument();

  await waitFor(() => screen.getByText(/Latitude/i))

  expect(loading).not.toBeInTheDocument();
})

test('handles server error', async () => {
  server.use(
    rest.post(`${baseUrl}ip/search`, (req, res, ctx) => {
      return res(
        ctx.status(500),
        ctx.json({
          error: 'Mocked Error Message!',
        })
      )
    })
  )

  render(<IPSearch />)

  const searchInput = screen.getByRole('textbox');

  fireEvent.change(searchInput, {
    target: { value: '111.222.111.222' },
  });

  const submitButton = screen.queryByRole('button');
  fireEvent.click(submitButton);

  await waitFor(() => screen.getByText(/Mocked Error Message!/i))

  const latitude = screen.queryByText(/Latitude/i);
  expect(latitude).not.toBeInTheDocument();

  const longitude = screen.queryByText(/Longitude/i);
  expect(longitude).not.toBeInTheDocument();
})