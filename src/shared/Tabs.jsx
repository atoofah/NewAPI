import { useState } from "react";
import { TABS_LIST } from "../lists";
import Tab from "./Tab";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(TABS_LIST[0].name);
  const [temIdx, setTemIdx] = useState(0);

  return (
    <div>
      <div className="flex items-center justify-center my-10">
        {TABS_LIST.map((tab, idx) => (
          <Tab
            key={tab.id}
            onClick={() => {
              setTemIdx(idx);
              setActiveTab(tab.name);
            }}
            isActive={activeTab === tab.name}
          >
            {tab.title}
          </Tab>
        ))}
      </div>
      {TABS_LIST[temIdx].tabPanel}
    </div>
  );
};

export default Tabs;
