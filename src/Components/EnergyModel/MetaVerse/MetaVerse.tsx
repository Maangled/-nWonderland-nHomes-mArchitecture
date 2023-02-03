import react, { FunctionComponent } from "react";
import styles from "./MetaVerse.module.css";
import { ContractBuilder, ContractBuilderViewer } from "../ContractBuilder/ContractBuilder";
import { CatModelType } from "../../CatModel/CatButton/CatModelTypes";

//TODO: 

export const MetaVerse:FunctionComponent<CatModelType> = ({attributes, functions, ...rest}) => {
    return (
        <>
        <ContractBuilder attributes={attributes} functions={functions}/>
      </>
    );
}

export const MetaVerseViewer:FunctionComponent<CatModelType> = ({attributes, functions, ...rest}) => {
    return (
        <>
        <ContractBuilderViewer attributes={attributes}/>
      </>
    );
}
