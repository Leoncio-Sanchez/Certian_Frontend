
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T


export const Sidebar: typeof import("../components/Sidebar.vue")['default']
export const AdminAudit: typeof import("../components/admin/Audit.vue")['default']
export const AdminBadgesConfig: typeof import("../components/admin/BadgesConfig.vue")['default']
export const AdminDashboard: typeof import("../components/admin/Dashboard.vue")['default']
export const AdminInstitutions: typeof import("../components/admin/Institutions.vue")['default']
export const AdminRoles: typeof import("../components/admin/Roles.vue")['default']
export const AdminSettings: typeof import("../components/admin/Settings.vue")['default']
export const AdminUsers: typeof import("../components/admin/Users.vue")['default']
export const EmpresaChallengeEditor: typeof import("../components/empresa/ChallengeEditor.vue")['default']
export const EmpresaCompanyProfile: typeof import("../components/empresa/CompanyProfile.vue")['default']
export const EmpresaDashboard: typeof import("../components/empresa/Dashboard.vue")['default']
export const EmpresaEvaluationSuite: typeof import("../components/empresa/EvaluationSuite.vue")['default']
export const EmpresaNetworkingHub: typeof import("../components/empresa/NetworkingHub.vue")['default']
export const EmpresaTalentExplorer: typeof import("../components/empresa/TalentExplorer.vue")['default']
export const EstudianteBadges: typeof import("../components/estudiante/Badges.vue")['default']
export const EstudianteChallenges: typeof import("../components/estudiante/Challenges.vue")['default']
export const EstudianteDashboard: typeof import("../components/estudiante/Dashboard.vue")['default']
export const EstudianteNetworking: typeof import("../components/estudiante/Networking.vue")['default']
export const EstudianteProfile: typeof import("../components/estudiante/Profile.vue")['default']
export const EstudianteRanking: typeof import("../components/estudiante/Ranking.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const Motion: typeof import("@vueuse/motion")['MotionComponent']
export const MotionGroup: typeof import("@vueuse/motion")['MotionGroupComponent']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const LazySidebar: LazyComponent<typeof import("../components/Sidebar.vue")['default']>
export const LazyAdminAudit: LazyComponent<typeof import("../components/admin/Audit.vue")['default']>
export const LazyAdminBadgesConfig: LazyComponent<typeof import("../components/admin/BadgesConfig.vue")['default']>
export const LazyAdminDashboard: LazyComponent<typeof import("../components/admin/Dashboard.vue")['default']>
export const LazyAdminInstitutions: LazyComponent<typeof import("../components/admin/Institutions.vue")['default']>
export const LazyAdminRoles: LazyComponent<typeof import("../components/admin/Roles.vue")['default']>
export const LazyAdminSettings: LazyComponent<typeof import("../components/admin/Settings.vue")['default']>
export const LazyAdminUsers: LazyComponent<typeof import("../components/admin/Users.vue")['default']>
export const LazyEmpresaChallengeEditor: LazyComponent<typeof import("../components/empresa/ChallengeEditor.vue")['default']>
export const LazyEmpresaCompanyProfile: LazyComponent<typeof import("../components/empresa/CompanyProfile.vue")['default']>
export const LazyEmpresaDashboard: LazyComponent<typeof import("../components/empresa/Dashboard.vue")['default']>
export const LazyEmpresaEvaluationSuite: LazyComponent<typeof import("../components/empresa/EvaluationSuite.vue")['default']>
export const LazyEmpresaNetworkingHub: LazyComponent<typeof import("../components/empresa/NetworkingHub.vue")['default']>
export const LazyEmpresaTalentExplorer: LazyComponent<typeof import("../components/empresa/TalentExplorer.vue")['default']>
export const LazyEstudianteBadges: LazyComponent<typeof import("../components/estudiante/Badges.vue")['default']>
export const LazyEstudianteChallenges: LazyComponent<typeof import("../components/estudiante/Challenges.vue")['default']>
export const LazyEstudianteDashboard: LazyComponent<typeof import("../components/estudiante/Dashboard.vue")['default']>
export const LazyEstudianteNetworking: LazyComponent<typeof import("../components/estudiante/Networking.vue")['default']>
export const LazyEstudianteProfile: LazyComponent<typeof import("../components/estudiante/Profile.vue")['default']>
export const LazyEstudianteRanking: LazyComponent<typeof import("../components/estudiante/Ranking.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyMotion: LazyComponent<typeof import("@vueuse/motion")['MotionComponent']>
export const LazyMotionGroup: LazyComponent<typeof import("@vueuse/motion")['MotionGroupComponent']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>

export const componentNames: string[]
