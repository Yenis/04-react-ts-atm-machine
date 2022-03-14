import { Page } from "../pageLinks";
import { createContext, useContext, useState } from "react";

const ActivePageContext = createContext({
  activePage: Page.HOME,
  setActivePage: (page: Page) => {},
});

export const useDisplay = () => {
  const [page, setPage] = useState(Page.HOME);

  const { activePage, setActivePage } = useContext(ActivePageContext);

  const PageProvider = ({ children }: any) => {
    return (
      <ActivePageContext.Provider value={{activePage: page, setActivePage: setPage}}>
        {children}
      </ActivePageContext.Provider>
    );
  };

  return { activePage, setActivePage, PageProvider } as const;
};
