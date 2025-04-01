"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const Accordion = ({ data = [] }: { data: any[] }) => {
  return (
    <div className="space-y-2">
      {data.map((item, index) => {
        return <AccordionItem key={index} item={item} />;
      })}
    </div>
  );
};

const AccordionItem = ({ item }: { item: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-[1px] overflow-hidden border-black/20 rounded-lg">
      <div
        className="flex justify-between items-center p-4 bg-gray-100 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-sm font-semibold">{item.title}</h3>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {isOpen && item.component && <div className="p-4">{item.component}</div>}

      {isOpen && !item.component && (
        <div className="p-4 bg-gray-50">
          {item.content && <p className="text-gray-600">{item.content}</p>}
          {item.children && item.children.length > 0 && (
            <Accordion data={item.children} />
          )}
        </div>
      )}
    </div>
  );
};
export default Accordion;
