import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import TheTable from './Table';

jest.mock("react-router-dom",()=>{
    return {
        useNavigate: ()=> jest.fn()
    }
})

describe("Table", ()=>{

    jest.setTimeout(10000)

    it('renders without crash', () => {
        render(<TheTable />);
    });
      
    it('matches snapshot', () => {
        const view =  render(<TheTable />);
        expect(view).toMatchSnapshot()
    });

    it('contains table header', () => {
         render(<TheTable />);
         const tableHead = screen.getByTestId("tableHead")
         expect(tableHead).toBeInTheDocument()
    });

    it('contains first post on loading and clicking works', async () => {
        render(<TheTable />);
        await new Promise((r)=> setTimeout(r, 2000))
        const post = screen.getByTestId("post-0")
        expect(post).toBeInTheDocument()
        const click = fireEvent.click(post)
        expect(click).toBe(true)
   });
})
