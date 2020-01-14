import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';

import ListRepos from './ListRepos';

let container = null;
beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() =>{
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it('renders name and link >',()=>{
    act(()=>{
        const repoInfo = {
            name: 'Priya',
            link: 'abc@gmail.com'
        }
        render(<ListRepos repoInfo={repoInfo} />,container);
    });
    expect(container.querySelector('.card-title').textContent).toEqual('PriyaRepo >');
    expect(container.querySelector('.card-link').textContent).toEqual('Repo >');
    expect(container.querySelector('.card-link').getAttribute('href')).toEqual('abc@gmail.com');
});
