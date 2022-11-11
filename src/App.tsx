import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import { BottomTabsModel } from "./Components/BottomTabDocker/BottomTabsModel";
import { LoadingScreen } from "./Components/LoadingScreen/LoadingScreen";
import { SingleView } from "./SingleView";
import { Body } from "./Body";
import { MatterButton } from "./Components/CatModel/MatterButton";
import { DualView } from "./DualView";
import { TriView } from "./TriView";
import { QuadView } from "./QuadView";
import { PentaView } from "./PentaView";
import { useEffect } from "react";
import { MainViewer } from "./Components/Main-Viewer/MainViewer";  


function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    //TODO: Update meta titles and descriptions below
    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/single-view":
        title = "";
        metaDescription = "";
        break;
      case "/body":
        title = "";
        metaDescription = "";
        break;
      case "/matter-button":
        title = "";
        metaDescription = "";
        break;
      case "/dual-view":
        title = "";
        metaDescription = "";
        break;
      case "/tri-view":
        title = "";
        metaDescription = "";
        break;
      case "/quad-view":
        title = "";
        metaDescription = "";
        break;
      case "/penta-view":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<LoadingScreen />} />

      <Route path="/single-view" element={<SingleView />} />

      <Route path="/body" element={<Body />} />

      <Route path="/matter-button" element={<MatterButton />} />

      <Route path="/dual-view" element={<DualView />} />

      <Route path="/tri-view" element={<TriView />} />

      <Route path="/quad-view" element={<QuadView />} />

      <Route path="/penta-view" element={<PentaView />} />

      <Route path="/main-viewer" element={<MainViewer />} />
    </Routes>
  );
}
export default App;
