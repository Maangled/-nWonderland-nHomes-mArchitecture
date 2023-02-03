import react, { FunctionComponent } from "react";
import { CatModelType } from "../../CatModel/CatButton/CatModelTypes";
import { ContractBuilder, ContractBuilderViewer } from "../ContractBuilder/ContractBuilder";
import styles from "./VideoStudio.module.css";

export const VideoStudio: FunctionComponent<CatModelType> = ({attributes, functions, ...rest}) => {
    return (
       <>
        <ContractBuilder attributes={attributes} functions={functions}/>
      </>
    );
};

export const VideoStudioViewer: FunctionComponent<CatModelType> = ({attributes}) => {
    return (
      <>
        <ContractBuilderViewer attributes={attributes} />
      </>
    );
}
