import { useRouteError } from "react-router-dom";
import "./errorPage.css"

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div id="container">
      <div id="error-text">
        Sorry, an unexpected error has occurred:
        <div>{error.statusText || error.message}</div>
      </div>
    </div>
  );
}