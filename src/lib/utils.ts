import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateAddress = (
  address: string,
  prefixLength = 6,
  suffixLength = 4,
): string => {
  if (address.length <= prefixLength + suffixLength) {
    return address;
  }
  const prefix = address.slice(0, prefixLength);
  const suffix = address.slice(-suffixLength);
  return `${prefix}...${suffix}`;
};
