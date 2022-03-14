export enum Page {
    // Used both for Navigation Links & Routes
    HOME = "/",
    LOGIN = "/LoginPage",
    REGISTER = "/RegisterPage",
    MAIN = "/MainMenu",
    STATUS = "/MainMenu/StatusPage",
    DEPOSIT = "/MainMenu/DepositPage",
    WITHDRAW = "/MainMenu/WithdrawPage",
    ADMIN = "/AdminPage",
    SERVICE = "/ServicePage",

    // Used only for Custom Display
    NULL = "",
    PIN = "pin",
    TRANSACTION = "complete"
}