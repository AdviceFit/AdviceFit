import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface PopoverProps {
  content: React.ReactNode;
  buttonLabel: string;
}

const Popover: React.FC<PopoverProps> = ({ content, buttonLabel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const togglePopover = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <Button onClick={togglePopover} className="relative z-10">
        {buttonLabel}
      </Button>
      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute left-0 bottom-0 ml-2 w-full translate-y-full p-4 bg-white shadow-lg border rounded-lg z-20"
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Popover;