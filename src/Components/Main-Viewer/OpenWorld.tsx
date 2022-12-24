import react from 'react';
import { FunctionComponent } from 'react';
import { DataManager } from '../EnergyModel/ContractBuilder/DataLayerTypes';
import styles from './MainViewer.module.css';

interface DataLayer {
    dataLayer: typeof DataManager | undefined;
    data: any;
}

export const OpenWorld: FunctionComponent<DataLayer> = (data) => {
    return (
        <div>
            <h1>Open World</h1>
        </div>
    )
}