import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../../components/Pagination';
import { PaginationProps } from '../../types/types';

describe('Pagination Component', () => {
  let props: PaginationProps;

  beforeEach(() => {
    props = {
      handlePreviousInternalPage: jest.fn(),
      handleNextInternalPage: jest.fn(),
      prevButtonDisabled: false,
      nextButtonDisabled: false,
      totalPages: 10,
      currentPage: 1,
      internalPage: 1,
    };
  });

  test('renders Previous and Next buttons', () => {
    render(<Pagination {...props} />);

    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  test('calls handlePreviousInternalPage on Previous button click', () => {
    render(<Pagination {...props} />);

    fireEvent.click(screen.getByText('Previous'));
    expect(props.handlePreviousInternalPage).toHaveBeenCalled();
  });

  test('calls handleNextInternalPage on Next button click', () => {
    render(<Pagination {...props} />);

    fireEvent.click(screen.getByText('Next'));
    expect(props.handleNextInternalPage).toHaveBeenCalled();
  });

  test('disables Previous button when prevButtonDisabled is true', () => {
    props.prevButtonDisabled = true;
    render(<Pagination {...props} />);

    expect(screen.getByText('Previous')).toBeDisabled();
  });

  test('disables Next button when nextButtonDisabled is true', () => {
    props.nextButtonDisabled = true;
    render(<Pagination {...props} />);

    expect(screen.getByText('Next')).toBeDisabled();
  });

  test('does not call handlePreviousInternalPage when Previous button is disabled', () => {
    props.prevButtonDisabled = true;
    render(<Pagination {...props} />);

    fireEvent.click(screen.getByText('Previous'));
    expect(props.handlePreviousInternalPage).not.toHaveBeenCalled();
  });

  test('does not call handleNextInternalPage when Next button is disabled', () => {
    props.nextButtonDisabled = true;
    render(<Pagination {...props} />);

    fireEvent.click(screen.getByText('Next'));
    expect(props.handleNextInternalPage).not.toHaveBeenCalled();
  });

  test('renders amount of pages', () => {
    render(<Pagination {...props} />);
    expect(screen.getByText('1 out of 20')).toBeInTheDocument();
  });
});
