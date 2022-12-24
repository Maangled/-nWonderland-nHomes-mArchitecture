import { FunctionComponent } from "react";
import { DataManager} from "../EnergyModel/ContractBuilder/DataLayerTypes";

interface DataLayer {
    dataLayer: typeof DataManager | undefined;
    data: any;
}

export const AiTools: FunctionComponent<DataLayer> = (data) => {
    return (
        <div>
            <h1>Ai Tools</h1>
        </div>
    )
}