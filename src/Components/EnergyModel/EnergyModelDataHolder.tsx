// this file listens to the energy model and makes sure that the data is available to the rest of the app
//

import React, { useEffect, useState } from 'react';

export const Title = (props:any) => {
    const [title, setTitle] = useState('Hero Protagonist');
    if (props !== '') {
        setTitle(props);
    return (
        <div>
            {title}
        </div>
    )
    } else {
        return (
            <div>
                {title}
            </div>
        )
    }
}

