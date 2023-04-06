import { render, screen } from '@testing-library/react'
import Home from '../Home'

test("Example 1 renders successfully", () => {
  render(<Home />);

  const element = screen.getByText(/Plan your itinerary with Trippy/i);

  expect(element).toBeInTheDocument();
})