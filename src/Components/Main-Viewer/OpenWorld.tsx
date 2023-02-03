import react from 'react';
import { FunctionComponent } from 'react';
import { DataManager } from '../EnergyModel/ContractBuilder/DataLayerTypes';
import styles from './MainViewer.module.css';

interface DataLayer {
    dataLayer: typeof DataManager | undefined;
    data: any;
}

//TODO: create a loader for the vault to pick up and display contract profiles from the Local Server
// This is a placeholder for the Open World page.  This page will be used to display the open world of the user.
//

export const OpenWorld: FunctionComponent<DataLayer> = (data) => {
    return (
        <div>
            <h1>Open World</h1>
        </div>
    )
}