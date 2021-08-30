import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from './App';

test('renders titles', () => {
  render(<App />);
  const keyWordElement = screen.getByText(/Social Key Words Aggregated by Certik/i);
  expect(keyWordElement).toBeInTheDocument();

  const activityElement = screen.getByText(/Twitter Account Activity/i);
  expect(activityElement).toBeInTheDocument();

  const sentimentElement = screen.getByText(/Certik Sentiment Analysis/i);
  expect(sentimentElement).toBeInTheDocument();
});
