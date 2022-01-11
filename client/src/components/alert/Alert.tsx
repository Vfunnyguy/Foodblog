import { useSelector } from "react-redux";
import { RootStore } from "../../utils/Type";
import Load from "./Load";
import Toast from "./Toast";
export const Alert = () => {
  const { alertReducer } = useSelector((state: RootStore) => state);
  return (
    <div>
      {alertReducer.loading && <Load />}

      {alertReducer.erros &&
        <Toast
          symbol="&#x2613;"
          body={alertReducer.erros}
          bgColor="bg-danger"
        />
      }

      {alertReducer.success && 
        <Toast
          symbol="&#x2713;"
          body={alertReducer.success}
          bgColor="bg-success"
        />
      }
    </div>
  );
};
export const showErr = (msg: string) => {
  return <div className="errMsg">{msg}</div>;
};
export const showSuccess = (msg: string) => {
  return <div className="successMsg">{msg}</div>;
};
