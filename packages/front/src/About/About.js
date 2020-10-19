import React, { useEffect, useState } from 'react';
import './About.css';
import { Button } from 'antd';
const axios = require('axios').default;
const instance = axios.create({
    baseURL: 'http://localhost:3001/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});


function About(props) {
    const ethAddr = props.ethAddr;
    const [isEligibleForSwapFrenzy, setIsEligibleForSwapFrenzy] = useState(false);

    useEffect(() => {
        if (ethAddr.indexOf('0x00') != 0) {
            instance.post('/isEligibleForSwapFrenzy', {
                userAddress: ethAddr
            })
                .then(function (response) {
                    console.log('/isEligibleForSwapFrenzy:' + response.data);
                    setIsEligibleForSwapFrenzy(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    });

    return (<>
        <h1>About</h1>
        TEST "isEligibleForSwapFrenzy" on wallet connect
        <br></br>
        <Button type={isEligibleForSwapFrenzy ? 'primary' : 'ghost'}>{isEligibleForSwapFrenzy ? 'Mint !' : 'You are not eligible'}</Button>
    </>
    );
}

export default About;