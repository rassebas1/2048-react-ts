import React from 'react'
export default class Cell extends React.Component {
    shouldComponentUpdate() {
        return false;
    }
    render() {
        return (
            <span className='cell'>{''}</span>
        );
    }
};