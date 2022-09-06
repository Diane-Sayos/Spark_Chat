import React from 'react';
import { connect } from 'react-redux';

const Footer = () => {
    return (
        <section className='footer'>
            <hr />
        </section>
    )
};
const mapState= state => {
    return {

    }
};
export default connect(mapState)(Footer);