import type { Severity } from "@/types/terracure";

export function severityClasses(severity: Severity) {
  if (severity === "critical") {
    return {
      border: "border-[#F0C4C0]",
      bg: "bg-[#FFF0EE]",
      text: "text-[#A92B24]",
      solid: "bg-[#D63A31] text-white"
    };
  }

  if (severity === "warning") {
    return {
      border: "border-[#EAC89E]",
      bg: "bg-[#FFF3DF]",
      text: "text-[#8A470C]",
      solid: "bg-[#B86516] text-white"
    };
  }

  return {
    border: "border-[#D7DEC0]",
    bg: "bg-[#EFF7D7]",
    text: "text-[#23483E]",
    solid: "bg-[#173F36] text-white"
  };
}
