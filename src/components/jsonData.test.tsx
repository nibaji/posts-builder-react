import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import JsonData from './JsonData';

jest.mock("react-router-dom",()=>{
    return {
        useLocation: ()=> {
          return { 
              state:{
                item:{
                    test:"testing"
                }
            }
        }
        }
    }
})

describe("jsonData", ()=>{

    it('renders without crash', () => {
        render(<JsonData />);
    });
      
    it('matches snapshot', () => {
        const view =  render(<JsonData />);
        expect(view).toMatchSnapshot()
    });

    it('contains json', () => {
         render(<JsonData />);
         const json = screen.getByTestId("json")
         expect(json).toBeInTheDocument()
    });

    it('contains back button and clicking works', async () => {
        render(<JsonData />);
        const backButton = screen.getByTestId("backButton")
        expect(backButton).toBeInTheDocument()
        const click = fireEvent.click(backButton)
        expect(click).toBe(true)
   });
})
