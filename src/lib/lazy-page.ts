import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

export type LazyPage<T extends ComponentType<object> = ComponentType<object>> =
  LazyExoticComponent<T> & {
    preload: () => Promise<{ default: T }>
  }

export function lazyPage<T extends ComponentType<object>>(
  importer: () => Promise<{ default: T }>,
): LazyPage<T> {
  const Component = lazy(importer) as LazyPage<T>
  Component.preload = importer
  return Component
}
