import type { ElementType, HTMLAttributes, ReactNode } from 'react';

type ContainerProps<T extends ElementType = 'div'> = {
  as?: T;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, 'children'>;

/**
 * Global layout container. Every page section's content sits inside this
 * so horizontal rhythm and max width stay consistent across the app.
 */
export function Container<T extends ElementType = 'div'>({
  as,
  className = '',
  children,
  ...rest
}: ContainerProps<T>) {
  const Component = (as ?? 'div') as ElementType;
  return (
    <Component
      {...rest}
      className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </Component>
  );
}
