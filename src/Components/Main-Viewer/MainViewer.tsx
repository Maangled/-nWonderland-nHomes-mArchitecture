import { FunctionComponent, useState, useCallback, useEffect, useRef } from "react";
import { HostBankModel } from "../BankModels/HostBankModel";
import { DataManager, DataType, ProfileType } from "../EnergyModel/ContractBuilder/DataLayerTypes";
import { HeroHud } from "./HeroHud";
import { OpenWorld } from "./OpenWorld";
import { AiTools } from "./AI Tools";
import { DigitalTwin } from "./DigitalTwin";
import styles from "./MainViewer.module.css";



export const MainViewer: FunctionComponent = () => {
return(
    <>
    <HeroHud dataLayer={undefined} data={undefined} />
    {/* <OpenWorld dataLayer={undefined} data={undefined} />
    <DigitalTwin dataLayer={undefined} data={undefined} />
    <AiTools dataLayer={undefined} data={undefined} /> */}
    </>
)
}
