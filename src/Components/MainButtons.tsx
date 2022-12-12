import { FunctionComponent, useMemo, useState, useCallback, ReactNode, CSSProperties } from "react";
import styles from "./MainButtons.module.css";

// Lets use this as the framework for components that need to be resized based on interactions with the user
// the model will default to a small size, and the user can hover over the model to make it larger
// like how the energy model is resized when the user hovers over the energy button. 
// it will have an outer div that is clickable and an inner div that is the actual model.
// the space between the two divs will be the clickable area and draggable area.
// dragging the outer div will resize model.
// clicking the outer div will lock the size of the model (so it does not resize when the user stops hovering over it).
// double clicking will lock the size and move the model to the center of the screen.
// clicking the outer div again will unlock the size and move the model back to the original position.

// create a type for the props
type MainButtonsType = {
  // onClose lets the parent component know when the user closes the popup
  onClose?: () => void;
  // children is the content of the popup
  children: ReactNode;
  // setMainView lets the parent know what the user wants to see on the main view
  setMainViewer: (mainViewer: JSX.Element) => void;
  placement: "Top left" | "Top center" | "Top right" | "Bottom left" | "Bottom center" | "Bottom right";
};

export const MainButtons: FunctionComponent<MainButtonsType> = ({ 
  onClose, 
  setMainViewer, 
  children, placement = "centered" }) => {
  // create a state variable for the model size
  const defaultModelSize = .25;
  const [modelSize, setModelSize] = useState(defaultModelSize);
  let lastModelSize = 1;
  // create a state variable for the model position
  const [modelPosition, setModelPosition] = useState({ x: 0, y: 0 });
  const [isLocked, setIsLocked] = useState(false);
  // set the position of the model based on the placement prop
  const modelPositionStyle = useMemo(() => {
  const style: CSSProperties = {};
  switch (placement) {
    case "Centered":
      style.alignItems = "center";
      style.justifyContent = "center";
      break;
    case "Top left":
      style.alignItems = "flex-start";
      style.margin = "50 50 0 0";
      break;
    case "Top center":
      style.alignItems = "center";
      break;
    case "Top right":
      style.alignItems = "flex-end";
      break;
    case "Bottom left":
      style.alignItems = "flex-start";
      style.justifyContent = "flex-end";
      break;
    case "Bottom center":
      style.alignItems = "center";
      style.justifyContent = "flex-end";
      break;
    case "Bottom right":
      style.alignItems = "flex-end";
      style.justifyContent = "flex-end";
      break;
  }
  return style;
}, [placement]);


  // create a function to handle the mouse enter event
  const handleMouseEnter = useCallback(() => {
    // transform the style to scale the model
    setModelSize(lastModelSize);
  }, []);

  // create a function to handle the mouse leave event
  const handleMouseLeave = useCallback(() => {
    if(!isLocked) {
    setModelSize(defaultModelSize);
    }
  }, []);

  // create a function to handle the mouse click event
  const handleMouseClick = useCallback(() => {
    setIsLocked(!isLocked);
  }, [modelSize]);

  // create a function to handle the mouse double click event
  const handleMouseDoubleClick = useCallback(() => {
    setIsLocked(true);
    setModelPosition({ x: 0, y: 0 });
  }, [modelSize]);

  // create a function to handle the mouse drag event
  // this function will make the model larger or smaller based on the direction of the drag
  const handleMouseDrag = useCallback((e: { movementX: number; }) => {
    // get the direction of the drag
    const direction = e.movementX > 0 ? 1 : -1;
    // get the new size
    const newSize = modelSize + (direction * .05);
    // set the new size
    setModelSize(newSize);
    // set the last size
    lastModelSize = newSize;
  }, [modelSize]);

  // create a function to handle the mouse drag event for the model position
  // this function will move the model based on the direction of the drag
  const handleMouseDragPosition = useCallback((e: { movementX: any; movementY: any; }) => {
    // get the direction of the drag
    const directionX = e.movementX;
    const directionY = e.movementY;
    // get the new position
    const newPosition = { x: modelPosition.x + directionX, y: modelPosition.y + directionY };
    // set the new position
    setModelPosition(newPosition);
  }, [modelPosition]);

  // onMouseMove={handleMouseDrag}
  // onMouseDown={handleMouseDragPosition}

  return (
    <div
      className={styles.mainButtons}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleMouseClick}
      onDoubleClick={handleMouseDoubleClick}

      style={modelPositionStyle}
    >
      {children}
    </div>
  );
};