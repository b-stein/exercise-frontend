import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { mocked } from "ts-jest/utils";
import { act } from 'react-dom/test-utils';
import App from './App';
import { getAllShows } from "./apiCalls";
jest.mock('./apiCalls');

describe('App', () => {
  beforeEach(() => {
    mocked(getAllShows).mockImplementation(() =>
      Promise.resolve([
        {
          id: "a1",
          title: "Gaycation",
          episodes: 24,
          product_image_url: "/images/gaycation.jpg"
        },
        {
          id: "b2",
          title: "Huang's World",
          episodes: 12,
          product_image_url: "/images/huangsworld.jpg"
        }
      ])
    );
  });

  // unit tests
  it('renders without crashing', () => {
      const wrapper = render( <MemoryRouter> <App /> </MemoryRouter> );

      expect(wrapper).toBeTruthy();
  });

  it('renders show list navigation menu', async () => {
      const { getByRole } = render( <MemoryRouter> <App /> </MemoryRouter> );

      const navWrapper = getByRole('navigation');

      expect(navWrapper).toBeTruthy();
  });

  it('renders async show items', async () => {
      const { getAllByRole, debug } = render( <MemoryRouter> <App /> </MemoryRouter> );

      const showNavLinks = await waitFor(() => getAllByRole('link'));

      expect(showNavLinks).toBeTruthy();
  });

  it('renders async active show item', async () => {
      const { getByText } = render( <MemoryRouter> <App /> </MemoryRouter> );

      const activeShowEpCount = await waitFor(() => getByText('24 episodes'));
      const activeShowTitle = await waitFor(() => getByText('Gaycation'));

      expect(activeShowEpCount).toBeTruthy();
      expect(activeShowTitle).toBeTruthy();
  });

  // integration test
  it('active show changes when new nav link item is clicked', async () => {
      const { getAllByRole, getByText } = render( <MemoryRouter> <App /> </MemoryRouter> );

      const nextShowLink = await waitFor(() => getAllByRole('link')[1]);

      fireEvent.click(nextShowLink);

      const secondShowEps = await waitFor(() => getByText('12 episodes'));
      const secondShowTitle = await waitFor(() => getByText('Huang\'s World'));

      expect(secondShowEps).toBeTruthy();
      expect(secondShowTitle).toBeTruthy();
  });
})