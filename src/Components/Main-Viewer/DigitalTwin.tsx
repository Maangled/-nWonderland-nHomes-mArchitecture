import { FunctionComponent } from "react";
import { DataManager } from "../EnergyModel/ContractBuilder/DataLayerTypes";

interface DataLayer {
    dataLayer: typeof DataManager | undefined;
    data: any;
}

export const DigitalTwin: FunctionComponent<DataLayer> = (data) => {
    return (
        <div>
            <h1>Digital Twin</h1>
        </div>
    )
}
