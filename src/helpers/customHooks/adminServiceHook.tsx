import { createContext, useContext, useState } from "react";
import ServicingReportPage from "../../pages/ServicingReport";

const AtmStateContext = createContext({
  isServicing: false,
  setServiceState: (service: boolean) => {},
});

export const useAtmState = () => {
  const [inService, setAtmService] = useState(false);
  const { isServicing, setServiceState } = useContext(AtmStateContext);

  const AtmStateProvider = ({ children }: any) => {
    return (
      <AtmStateContext.Provider
        value={{ isServicing: inService, setServiceState: setAtmService }}>
        {inService && <ServicingReportPage />}
        {!inService && children}
      </AtmStateContext.Provider>
    );
  };

  return { isServicing, setServiceState, AtmStateProvider } as const;
};
