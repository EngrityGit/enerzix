import { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function DropletIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" {...base} {...props}>
      <path d="M16 4.5C16 4.5 8.5 14.2 8.5 20.2C8.5 24.5 11.9 28 16 28C20.1 28 23.5 24.5 23.5 20.2C23.5 14.2 16 4.5 16 4.5Z" />
      <path d="M12 21.5C12 23.7 13.6 25.3 15.6 25.5" opacity="0.5" />
    </svg>
  );
}

export function MountainIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" {...base} {...props}>
      <path d="M3 24.5L11.5 10.5L17 19L20 14.5L29 24.5H3Z" />
      <path d="M13.5 13.5L11.5 10.5L9 14.5" opacity="0.6" />
    </svg>
  );
}

export function LeafIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" {...base} {...props}>
      <path d="M7 25C6 15 12 6 25 6C25 19 16.5 25.5 7 25Z" />
      <path d="M8 24C13 18 18 13 24 7" opacity="0.6" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" {...base} {...props}>
      <path d="M16 4L27 8V15.5C27 22 22.5 26.7 16 28.5C9.5 26.7 5 22 5 15.5V8L16 4Z" />
      <path d="M11.5 16L14.7 19.2L21 12.5" />
    </svg>
  );
}

export function RecycleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" {...base} {...props}>
      <path d="M13 6.5L17.5 6.5L20 11" />
      <path d="M22.5 12.5L26 18.5L22 21" />
      <path d="M23.5 25H16.5L14.5 21.5" />
      <path d="M9.5 22.5L6 16.5L10.5 14" />
      <path d="M6.5 12.5L10.5 6" opacity="0.5" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" {...base} {...props}>
      <path d="M16 28C16 28 25 19.2 25 12.5C25 7.8 20.9 4 16 4C11.1 4 7 7.8 7 12.5C7 19.2 16 28 16 28Z" />
      <circle cx="16" cy="12.5" r="3.3" />
    </svg>
  );
}

export function SparkleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" {...base} {...props}>
      <path d="M16 4C16.8 10.5 18 13.5 26 15C18 16.5 16.8 19.5 16 26C15.2 19.5 14 16.5 6 15C14 13.5 15.2 10.5 16 4Z" />
    </svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M5 12H19" />
      <path d="M13 6L19 12L13 18" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M12 5V19" />
      <path d="M5 12H19" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M5 12.5L9.5 17L19 6.5" />
    </svg>
  );
}

export function GlassIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" {...base} {...props}>
      <path d="M9 5H23L20.5 26.5C20.3 27.6 19.4 28.5 18.2 28.5H13.8C12.6 28.5 11.7 27.6 11.5 26.5L9 5Z" />
      <path d="M10.2 13.5H21.8" opacity="0.5" />
    </svg>
  );
}

export function BottleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 44" {...base} {...props}>
      <path d="M13 2H19V7.5L21.5 11V39C21.5 40.4 20.4 41.5 19 41.5H13C11.6 41.5 10.5 40.4 10.5 39V11L13 7.5V2Z" />
      <path d="M11 20H21" opacity="0.5" />
      <path d="M13 2H19" strokeWidth="2" />
    </svg>
  );
}

export function MapleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" {...base} {...props}>
      <path d="M16 4L18 11L23.5 8L21.5 13.5L28 14L22.5 17.5L26 23L19.5 21L20 27L16 22.5L12 27L12.5 21L6 23L9.5 17.5L4 14L10.5 13.5L8.5 8L14 11L16 4Z" />
    </svg>
  );
}
