// create a function component that contains the Cesium viewer
//

import { Route } from "react-router-dom"
import styles from "./Cesium.module.css"
import { Color, Cartesian3 } from "cesium";
import { Viewer, Entity } from "resium";


export const Cesium = () => {


    return(
        <div className={styles.cesiumModel}>
            <Viewer full/>
    </div>
    )
}
