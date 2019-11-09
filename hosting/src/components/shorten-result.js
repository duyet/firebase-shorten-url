import React from 'react';
import { Typography, Result, Button } from 'antd';

import gtagTrack from '../utils/gtag';

const ShortenResult = (props) => {

    if (!props.result) return (
        <Result status="403" />
    );

    return (
        <Result
            status="success"
            title={<Typography.Text
                style={{ fontSize: 25 }}
                copyable={{
                    text: props.result.shortLink,
                    onCopy: () => gtagTrack('CopyToClipboard', 'success', props.result.shortLink)
                }}
            >
                {props.result.shortLink}
            </Typography.Text>}
        />
    );
};

export default ShortenResult