"use client";

import { useState } from "react";
import Chat from "../components/Chat";

export default function Home() {
  const [backgroundColor, setBackgroundColor] = useState("#17191c");

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center transition-colors duration-500"
      style={{ backgroundColor }}
    >
      <div className="scale-[1]">
        <Chat onColorChange={setBackgroundColor} />
      </div>
    </div>
  );
}
