import React from 'react';

export default ({ data, loading }) => 
<div>
    { loading ? 'loading...' : <div>{data.messageAdded.content}</div> }
</div> 