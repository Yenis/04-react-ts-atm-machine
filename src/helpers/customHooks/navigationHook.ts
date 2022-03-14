import { useNavigate } from "react-router-dom";
import { useDisplay } from "./displayScreenHook";
import { Page } from "../pageLinks";

export const useNavigation = () => {
    const { setActivePage } = useDisplay();
    const open = useNavigate();

    const navigateTo = (page: Page) => {
        setActivePage(page);
        open(page);
    }
    
    return navigateTo;
}