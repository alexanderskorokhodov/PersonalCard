import { useEffect, useId, useRef, useState, type RefObject } from 'react'
import type { FeatureCollection, Point } from 'geojson'
import { Link } from 'react-router-dom'
import ReactMap, {
  Layer,
  Popup,
  Source,
  type LayerProps,
  type MapLayerMouseEvent,
  type MapRef,
} from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import { CloseIcon } from '@/components/icons'
import { projectLocations } from '@/content/project-locations'
import { useLocale, type Locale } from '@/lib/locale-context'

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
const INITIAL_VIEW_STATE = {
  longitude: 35,
  latitude: 41,
  zoom: 2.2,
}

const pointGlowLayer: LayerProps = {
  id: 'project-points-glow',
  type: 'circle',
  paint: {
    'circle-color': '#f4d75d',
    'circle-opacity': 0.28,
    'circle-radius': 18,
    'circle-blur': 0.18,
  },
}

const pointCoreLayer: LayerProps = {
  id: 'project-points-core',
  type: 'circle',
  paint: {
    'circle-color': '#121212',
    'circle-radius': 6,
    'circle-stroke-color': '#ffffff',
    'circle-stroke-width': 2,
  },
}

const mapCopyByLocale = {
  en: {
    summary: 'Project geography',
    countLabel: 'projects',
    cityLabel: 'cities',
    yearLabel: 'Year',
    taskLabel: 'Task',
    openLabel: 'Open full screen',
    closeLabel: 'Close map',
    modalTitle: 'Cities where I shipped products',
    modalBody: 'Tap a point or pick a project from the list to inspect the task, year, and available detail page.',
    detailLabel: 'Open detail page',
    emptyTitle: 'Project map is empty',
    emptyBody: 'Add project coordinates in src/content/project-locations.ts',
  },
  ru: {
    summary: 'География проектов',
    countLabel: 'проекта',
    cityLabel: 'города',
    yearLabel: 'Год',
    taskLabel: 'Тип задачи',
    openLabel: 'Открыть на весь экран',
    closeLabel: 'Закрыть карту',
    modalTitle: 'Города, где я запускал проекты',
    modalBody:
      'Нажмите на точку или выберите проект в списке, чтобы посмотреть тип задачи, год и ссылку на страницу проекта.',
    detailLabel: 'Открыть страницу проекта',
    emptyTitle: 'Карта проектов пока пустая',
    emptyBody: 'Добавьте координаты проектов в src/content/project-locations.ts',
  },
} as const

type ProjectPoint = {
  id: string
  title: string
  city: string
  country: string
  year: string
  taskType: string
  href?: string
  coordinates: [number, number]
  visualCoordinates: [number, number]
}

type ProjectFeatureProperties = {
  id: string
  title: string
  city: string
  country: string
  year: string
  taskType: string
}

type ProjectMapCanvasProps = {
  points: ProjectPoint[]
  selectedProject: ProjectPoint | null
  interactive: boolean
  mapRef?: RefObject<MapRef | null>
  onProjectSelect?: (project: ProjectPoint) => void
  padding: number | { top: number; right: number; bottom: number; left: number }
}

function localizeProjects(locale: Locale) {
  return projectLocations.map((project) => ({
    id: project.id,
    title: project.title[locale],
    city: project.city[locale],
    country: project.country[locale],
    year: project.year[locale],
    taskType: project.taskType[locale],
    href: project.href,
    coordinates: project.coordinates,
  }))
}

function spreadOverlappingProjects(
  points: ReturnType<typeof localizeProjects>,
): ProjectPoint[] {
  const groupedPoints = new globalThis.Map<string, typeof points>()

  for (const point of points) {
    const key = point.coordinates.join(':')
    const existingGroup = groupedPoints.get(key)

    if (existingGroup) {
      existingGroup.push(point)
      continue
    }

    groupedPoints.set(key, [point])
  }

  const spreadPoints: ProjectPoint[] = []

  for (const group of groupedPoints.values()) {
    if (group.length === 1) {
      const [project] = group
      spreadPoints.push({
        ...project,
        visualCoordinates: project.coordinates,
      })
      continue
    }

    group.forEach((project, index) => {
      const angle = (Math.PI * 2 * index) / group.length - Math.PI / 2
      const radius = group.length === 2 ? 0.16 : 0.2
      const [longitude, latitude] = project.coordinates

      spreadPoints.push({
        ...project,
        visualCoordinates: [
          longitude + Math.cos(angle) * radius,
          latitude + Math.sin(angle) * radius * 0.68,
        ],
      })
    })
  }

  return spreadPoints
}

const localizedProjectPointsByLocale: Record<Locale, ProjectPoint[]> = {
  en: spreadOverlappingProjects(localizeProjects('en')),
  ru: spreadOverlappingProjects(localizeProjects('ru')),
}

function buildFeatureCollection(points: ProjectPoint[]): FeatureCollection<Point, ProjectFeatureProperties> {
  return {
    type: 'FeatureCollection',
    features: points.map((point) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: point.visualCoordinates,
      },
      properties: {
        id: point.id,
        title: point.title,
        city: point.city,
        country: point.country,
        year: point.year,
        taskType: point.taskType,
      },
    })),
  }
}

function fitMapToProjects(
  map: MapRef | null,
  points: ProjectPoint[],
  padding: number | { top: number; right: number; bottom: number; left: number },
) {
  if (!map || points.length === 0) {
    return
  }

  let minLongitude = points[0].visualCoordinates[0]
  let maxLongitude = points[0].visualCoordinates[0]
  let minLatitude = points[0].visualCoordinates[1]
  let maxLatitude = points[0].visualCoordinates[1]

  for (const point of points) {
    const [longitude, latitude] = point.visualCoordinates

    minLongitude = Math.min(minLongitude, longitude)
    maxLongitude = Math.max(maxLongitude, longitude)
    minLatitude = Math.min(minLatitude, latitude)
    maxLatitude = Math.max(maxLatitude, latitude)
  }

  if (maxLongitude - minLongitude < 0.3) {
    minLongitude -= 0.3
    maxLongitude += 0.3
  }

  if (maxLatitude - minLatitude < 0.2) {
    minLatitude -= 0.2
    maxLatitude += 0.2
  }

  map.fitBounds(
    [
      [minLongitude, minLatitude],
      [maxLongitude, maxLatitude],
    ],
    {
      padding,
      duration: 0,
    },
  )
}

function ProjectMapCanvas({
  points,
  selectedProject,
  interactive,
  mapRef,
  onProjectSelect,
  padding,
}: ProjectMapCanvasProps) {
  const internalMapRef = useRef<MapRef | null>(null)
  const resolvedMapRef = mapRef ?? internalMapRef
  const featureCollection = buildFeatureCollection(points)
  const idBase = useId().replaceAll(':', '')
  const glowLayerId = `${idBase}-project-points-glow`
  const pointLayerId = `${idBase}-project-points-core`

  function handleMapLoad() {
    fitMapToProjects(resolvedMapRef.current, points, padding)
  }

  function handleMapClick(event: MapLayerMouseEvent) {
    const featureId = event.features?.[0]?.properties?.id

    if (!featureId || !onProjectSelect) {
      return
    }

    const selectedPoint = points.find((point) => point.id === String(featureId))

    if (selectedPoint) {
      onProjectSelect(selectedPoint)
    }
  }

  return (
    <ReactMap
      ref={resolvedMapRef}
      initialViewState={INITIAL_VIEW_STATE}
      mapStyle={MAP_STYLE}
      attributionControl={interactive ? {} : false}
      cursor={interactive ? 'grab' : 'default'}
      interactive={interactive}
      dragPan={interactive}
      scrollZoom={interactive}
      touchZoomRotate={interactive}
      doubleClickZoom={interactive}
      keyboard={interactive}
      interactiveLayerIds={interactive ? [pointLayerId] : undefined}
      onClick={interactive ? handleMapClick : undefined}
      onLoad={handleMapLoad}
      style={{ width: '100%', height: '100%' }}
    >
      <Source id={`${idBase}-project-points`} type="geojson" data={featureCollection}>
        <Layer {...pointGlowLayer} id={glowLayerId} />
        <Layer {...pointCoreLayer} id={pointLayerId} />
      </Source>

      {interactive && selectedProject ? (
        <Popup
          className="project-map-popup"
          anchor="bottom"
          closeButton={false}
          closeOnClick={false}
          longitude={selectedProject.visualCoordinates[0]}
          latitude={selectedProject.visualCoordinates[1]}
          offset={18}
        >
          <div className="space-y-1">
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--text-soft)]">
              {selectedProject.city}, {selectedProject.country}
            </p>
            <p className="text-[15px] font-medium text-[var(--text-strong)]">
              {selectedProject.title}
            </p>
            <p className="text-[12px] leading-5 text-[var(--text-muted)]">
              {selectedProject.year} · {selectedProject.taskType}
            </p>
          </div>
        </Popup>
      ) : null}
    </ReactMap>
  )
}

export function ProjectLocationsMap() {
  const { locale } = useLocale()
  const copy = mapCopyByLocale[locale]
  const projects = localizedProjectPointsByLocale[locale]
  const uniqueCitiesCount = new Set(
    projects.map((project) => `${project.city}:${project.country}`),
  ).size
  const modalMapRef = useRef<MapRef | null>(null)
  const projectItemRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(projects[0]?.id ?? null)
  const selectedProject =
    projects.find((project) => project.id === selectedProjectId) ?? projects[0] ?? null

  useEffect(() => {
    if (!isFullScreen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsFullScreen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isFullScreen])

  useEffect(() => {
    if (!isFullScreen || !selectedProjectId) {
      return
    }

    const activeProjectNode = projectItemRefs.current[selectedProjectId]

    activeProjectNode?.scrollIntoView({
      block: 'nearest',
      behavior: 'smooth',
    })
  }, [isFullScreen, selectedProjectId])

  function focusProject(project: ProjectPoint) {
    setSelectedProjectId(project.id)
    modalMapRef.current?.easeTo({
      center: project.visualCoordinates,
      zoom: Math.max(modalMapRef.current.getZoom(), 6.5),
      duration: 650,
    })
  }

  if (!projects.length) {
    return (
      <div className="surface-card rounded-[24px] border border-[var(--border-subtle)] bg-[var(--surface-soft)] px-5 py-6">
        <p className="text-[15px] font-medium text-[var(--text-strong)]">{copy.emptyTitle}</p>
        <p className="mt-2 text-[14px] leading-6 text-[var(--text-muted)]">{copy.emptyBody}</p>
      </div>
    )
  }

  return (
    <>
      <div className="project-map-preview surface-card relative aspect-[2/1] overflow-hidden rounded-[24px] border border-black/5 bg-[#edf3f4] shadow-[var(--shadow-soft)]">
        <ProjectMapCanvas
          points={projects}
          selectedProject={selectedProject}
          interactive={false}
          padding={36}
        />

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.28),rgba(255,255,255,0)_30%,rgba(7,7,7,0.08)_100%)]" />

        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3">
          <div className="rounded-full border border-white/75 bg-white/88 px-3 py-1.5 text-[11px] font-medium tracking-[0.08em] text-[var(--text-muted)] backdrop-blur">
            {copy.summary}
          </div>
          <div className="rounded-full border border-white/75 bg-white/88 px-3 py-1.5 text-[11px] font-medium tracking-[0.04em] text-[var(--text-muted)] backdrop-blur">
            {projects.length} {copy.countLabel} / {uniqueCitiesCount} {copy.cityLabel}
          </div>
        </div>

        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
          <div className="max-w-[16rem] rounded-[20px] border border-white/75 bg-white/90 px-4 py-3 backdrop-blur">
            <p className="text-[14px] font-medium text-[var(--text-strong)]">
              {selectedProject?.title ?? projects.map((project) => project.title).join(' • ')}
            </p>
            {selectedProject ? (
              <p className="mt-1 text-[12px] leading-5 text-[var(--text-muted)]">
                {selectedProject.year} · {selectedProject.taskType}
              </p>
            ) : null}
            {selectedProject?.href ? (
              <Link
                to={selectedProject.href}
                className="mt-2 inline-flex text-[12px] font-medium text-[var(--text-link)] transition hover:text-[var(--text-link-hover)]"
              >
                {copy.detailLabel}
              </Link>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => {
              setSelectedProjectId((currentProjectId) => currentProjectId ?? projects[0]?.id ?? null)
              setIsFullScreen(true)
            }}
            className="rounded-full border border-black/10 bg-[var(--text-strong)] px-4 py-2 text-[13px] font-medium text-white transition-transform duration-200 hover:-translate-y-0.5"
          >
            {copy.openLabel}
          </button>
        </div>
      </div>

      {isFullScreen ? (
        <div
          className="project-map-modal fixed inset-0 z-50 bg-black/55 p-3 sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-label={copy.modalTitle}
        >
          <div className="relative h-full overflow-hidden rounded-[28px] bg-[var(--surface-canvas)] shadow-[0_30px_120px_rgba(0,0,0,0.3)]">
            <ProjectMapCanvas
              points={projects}
              selectedProject={selectedProject}
              interactive
              mapRef={modalMapRef}
              onProjectSelect={focusProject}
              padding={{ top: 120, right: 48, bottom: 260, left: 48 }}
            />

            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-4 p-4 sm:p-6">
              <div className="max-w-[36rem] rounded-[24px] border border-white/70 bg-white/92 px-4 py-4 backdrop-blur">
                <p className="eyebrow">{copy.summary}</p>
                <p className="mt-2 text-[15px] font-medium text-[var(--text-strong)]">
                  {copy.modalTitle}
                </p>
                <p className="mt-2 text-[14px] leading-6 text-[var(--text-muted)]">
                  {copy.modalBody}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsFullScreen(false)}
                aria-label={copy.closeLabel}
                className="pointer-events-auto inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/65 bg-white/92 text-[var(--text-strong)] backdrop-blur transition-colors duration-200"
              >
                <CloseIcon className="h-4 w-4 shrink-0" />
              </button>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:inset-y-0 sm:left-auto sm:right-0 sm:flex sm:w-full sm:max-w-[28rem] sm:items-stretch sm:p-6">
              <div className="pointer-events-auto ml-auto flex w-full max-w-[28rem] flex-col overflow-hidden rounded-[24px] border border-white/70 bg-white/94 p-4 shadow-[var(--shadow-soft)] backdrop-blur max-sm:max-h-[min(32rem,62vh)] sm:h-full">
                <div className="shrink-0 border-b border-black/6 pb-3">
                  <p className="eyebrow">{copy.summary}</p>
                  <p className="mt-2 text-[13px] leading-5 text-[var(--text-muted)]">
                    {projects.length} {copy.countLabel} / {uniqueCitiesCount} {copy.cityLabel}
                  </p>
                </div>

                <div className="mt-3 flex-1 space-y-2 overflow-y-auto pr-1">
                  {projects.map((project) => {
                    const isActive = selectedProject?.id === project.id

                    return (
                      <div
                        key={project.id}
                        ref={(node) => {
                          projectItemRefs.current[project.id] = node
                        }}
                        className={`rounded-[18px] border px-3 py-3 transition-[background-color,border-color,box-shadow,transform] duration-300 ${
                          isActive
                            ? 'border-black/5 bg-[var(--text-strong)] text-white'
                            : 'border-transparent bg-[var(--surface-soft)] text-[var(--text-default)] hover:border-black/6 hover:bg-[var(--surface-muted)]'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => focusProject(project)}
                          aria-expanded={isActive}
                          className="flex w-full items-start justify-between gap-4 text-left"
                        >
                          <span className="min-w-0 flex-1">
                            <span className="block text-[14px] font-medium">{project.title}</span>
                            <span
                              className={`mt-1 block text-[12px] ${
                                isActive ? 'text-white/72' : 'text-[var(--text-soft)]'
                              }`}
                            >
                              {project.year} · {project.taskType}
                            </span>
                          </span>
                          <span
                            className={`shrink-0 text-[12px] ${
                              isActive ? 'text-white/72' : 'text-[var(--text-soft)]'
                            }`}
                          >
                            {project.city}
                          </span>
                        </button>

                        <div
                          className={`overflow-hidden transition-[max-height,opacity,margin-top] duration-300 ${
                            isActive ? 'mt-3 max-h-64 opacity-100' : 'max-h-0 opacity-0'
                          }`}
                        >
                          <div className={`border-t pt-3 ${isActive ? 'border-white/14' : 'border-black/6'}`}>
                            <p className="text-[12px] leading-5 text-white/72">
                              {project.city}, {project.country}
                            </p>
                            <p className="mt-1 text-[12px] leading-5 text-white/72">
                              {copy.yearLabel}: {project.year}
                            </p>
                            <p className="mt-1 text-[12px] leading-5 text-white/72">
                              {copy.taskLabel}: {project.taskType}
                            </p>
                            {project.href ? (
                              <Link
                                to={project.href}
                                className="mt-3 inline-flex text-[13px] font-medium text-white transition hover:text-white/78"
                              >
                                {copy.detailLabel}
                              </Link>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
