import React from "react";

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#0a001f] to-[#030014] opacity-90" />

      {/* Grid overlay */}
      <div
        className="
          absolute inset-0 
          bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),
               linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)]
          bg-[size:24px_24px]
          opacity-40
        "
      />
    </div>
  );
};

export default AnimatedBackground;
