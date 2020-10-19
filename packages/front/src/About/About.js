import React, {useState} from 'react';
import './About.css';
import { Button } from 'antd';
const axios = require('axios').default;


function About(props) {
    const ethAddr = props.ethAddr;
    const [isEligibleForSwapFrenzy, setIsEligibleForSwapFrenzy] = useState(false);


    return (<>
        <h1>About</h1>
        <Button type="primary">isEligibleForSwapFrenzy</Button>
        </>
    );
}

export default About;