import { Container } from "react-bootstrap";
import { FormCreate } from "@/components/FormCreate";
import "./index.css";

export default function App() {
  return (
    <Container fluid className="my-5">
      <div className="head-text text-center">
        <h1>
          React TS + Vite <span>CRUD</span>
        </h1>
      </div>
      <FormCreate />
    </Container>
  );
}
