import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Page from '../pages/index';

const appTitle = 'Code Challenge: Airports';
const inputText = {
  placeholder: 'Start typing to look up airport information...',
};

describe('Search', () => {
  let container: HTMLElement;
  beforeEach(() => {
    const r = render(<Page />);
    container = r.container;
  });

  describe('Layout', () => {
    it('should render the app title', () => {
      const title = screen.getByText(appTitle);
      expect(title).toBeInTheDocument();
    });

    it('should render a search input', () => {
      const input = screen.getByPlaceholderText(inputText.placeholder);
      expect(input).toBeInTheDocument();
    });

    it('should have a message with "0 airports found" when input become blank', () => {
      const input = screen.getByPlaceholderText(inputText.placeholder);
      fireEvent.change(input, { target: { value: 'Brazil' } });

      fireEvent.change(input, { target: { value: '' } });

      const message = screen.getByText('0 airports found');
      expect(message).toBeInTheDocument();
    });

    it('should wait at least 500 milliseconds before start filtering', async () => {
      const input = screen.getByPlaceholderText(inputText.placeholder);
      fireEvent.change(input, { target: { value: 'a' } });

      const link = container.getElementsByTagName('a');
      expect(link.length).toBe(0);

      await waitFor(() => {
        expect(link.length).toBe(10);
      });
    });
  });

  describe('Interactions', () => {
    it('should be empty if the search input is blank', async () => {
      const input = screen.getByPlaceholderText(inputText.placeholder);
      fireEvent.change(input, { target: { value: '' } });

      await waitFor(() => {
        const link = container.getElementsByTagName('a');
        expect(link.length).toBe(0);
      });
    });

    it('should look up the aiports by name', async () => {
      const input = screen.getByPlaceholderText(inputText.placeholder);
      fireEvent.change(input, {
        target: { value: '9 de Maio - Teixeira de Freitas Airport' },
      });

      await waitFor(() => {
        const link = container.getElementsByTagName('a');
        expect(link.length).toBe(1);
      });
    });

    it('should look up the aiports by IATA', async () => {
      const input = screen.getByPlaceholderText(inputText.placeholder);
      fireEvent.change(input, { target: { value: 'TXF' } });

      await waitFor(() => {
        const link = container.getElementsByTagName('a');
        expect(link.length).toBe(1);
      });
    });

    it('should look up the aiports by city', async () => {
      const input = screen.getByPlaceholderText(inputText.placeholder);
      fireEvent.change(input, { target: { value: 'Dire Dawa' } });

      await waitFor(() => {
        const link = container.getElementsByTagName('a');
        expect(link.length).toBe(1);
      });
    });

    it('should look up the aiports by country', async () => {
      const input = screen.getByPlaceholderText(inputText.placeholder);
      fireEvent.change(input, { target: { value: 'Russia' } });

      await waitFor(() => {
        const link = container.getElementsByTagName('a');
        expect(link.length).toBe(1);
      });
    });

    it('should not exceed 10 items in the search results', async () => {
      const input = screen.getByPlaceholderText(inputText.placeholder);
      fireEvent.change(input, { target: { value: 'a' } });
      await waitFor(() => {
        const link = container.getElementsByTagName('a');
        expect(link.length).toBeLessThanOrEqual(10);
      });
    });
  });
});

jest.mock('../hooks/use-api-data', () => {
  return jest.fn(() => [
    {
      name: '9 de Maio - Teixeira de Freitas Airport',
      iata: 'TXF',
      city: 'Teixeira de Freitas',
      country: 'Brazil',
    },
    {
      name: 'A Coruña Airport',
      iata: 'LCG',
      city: 'La Coruna',
      country: 'Spain',
    },
    {
      name: 'Aachen-Merzbrück Airport',
      iata: 'AAH',
      city: 'Aachen',
      country: 'Germany',
    },
    {
      name: 'Aalborg Airport',
      iata: 'AAL',
      city: 'Aalborg',
      country: 'Denmark',
    },
    {
      name: 'Aarhus Airport',
      iata: 'AAR',
      city: 'Aarhus',
      country: 'Denmark',
    },
    {
      name: 'Aasiaat Airport',
      iata: 'JEG',
      city: 'Aasiaat',
      country: 'Greenland',
    },
    {
      name: 'Aba Tenna Dejazmach Yilma International Airport',
      iata: 'DIR',
      city: 'Dire Dawa',
      country: 'Ethiopia',
    },
    {
      name: 'Abaco I Walker C Airport',
      iata: 'WKR',
      city: "Walker's Cay",
      country: 'Bahamas',
    },
    {
      name: 'Abadan Airport',
      iata: 'ABD',
      city: 'Abadan',
      country: 'Iran',
    },
    {
      name: 'Abaiang Airport',
      iata: 'ABF',
      city: 'Abaiang Atoll',
      country: 'Kiribati',
    },
    {
      name: 'Abakan Airport',
      iata: 'ABA',
      city: 'Abakan',
      country: 'Russia',
    },
  ]);
});
