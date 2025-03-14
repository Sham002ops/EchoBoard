import { type JSX } from "react";

export function Card({
  className,
  title,
  children,
 
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <a
      className={className}
      // href={`${href}?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo"`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <h2>
        {title} <span>-&gt;</span>
      </h2>
      <div>{children}</div>
    </a>
  );
}