import "./styles.css";
import ReactDOM from "react-dom/client";
import { TokensPreview } from "./TokensPreview.tsx";

const rootElement = document.getElementById("app");
if (!rootElement) {
  throw new Error("Missing #app root element");
}

ReactDOM.createRoot(rootElement).render(<TokensPreview />);
