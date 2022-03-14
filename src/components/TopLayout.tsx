import { CurrentTime } from "./CurrentTime";
import { CurrentUser } from "./CurrentUser";
import { LanguageChanger } from "./LanguageChanger";

export const TopLayout: React.FC = ({ children }: any) => {

    return (
      <div>
        <div className="top-layout sticky-nav">
          <CurrentTime />
          <CurrentUser />
          <LanguageChanger />
        </div>
  
        <div className="flex-container">{children}</div>
      </div>
    );
  };