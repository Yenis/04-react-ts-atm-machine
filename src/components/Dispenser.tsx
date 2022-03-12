import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface DispenserProps{
    amount: number
}
 
const Dispenser: React.FC<DispenserProps> = (props) => {
    const [notes, setNotes] = useState(0);
    const [change, setChange] = useState(0);
    const {t} = useTranslation();

    const handleDispense = (amount: number) => {
        let totalCash = amount;
        let totalNotes = 0
        while (totalCash >= 20) {
            totalCash = totalCash - 20;
            totalNotes++
        }
        setNotes(totalNotes);
        setChange(totalCash);
    }

    useEffect(()=>{
        handleDispense(props.amount)
    }, [props.amount])

    return ( 
    <div className="printed-receipt">
        <h3 style={{color: "purple"}}>{t("dispenser-title")}</h3>

        {notes !== 0 && <h4 style={{color: "gold"}}>20$ {t("notes-dispensed")} {notes}</h4>}
        {notes !== 0 && change && <h4 style={{color: "gold"}}>{t("leftover-change")} {change}</h4>}
        {notes === 0 && change && <h4 style={{color: "gold"}}>{t("dispensed-coins")} {change}</h4>}
        
        {props.amount && <h4 style={{color: "purple"}}>{t("dispensed-total")} {props.amount}</h4>}
    </div>
     );
}
 
export default Dispenser;

