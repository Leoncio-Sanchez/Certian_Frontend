
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

interface _GlobalComponents {
  Sidebar: typeof import("../../components/Sidebar.vue")['default']
  AdminAudit: typeof import("../../components/admin/Audit.vue")['default']
  AdminBadgesConfig: typeof import("../../components/admin/BadgesConfig.vue")['default']
  AdminDashboard: typeof import("../../components/admin/Dashboard.vue")['default']
  AdminInstitutions: typeof import("../../components/admin/Institutions.vue")['default']
  AdminRoles: typeof import("../../components/admin/Roles.vue")['default']
  AdminSettings: typeof import("../../components/admin/Settings.vue")['default']
  AdminUsers: typeof import("../../components/admin/Users.vue")['default']
  EmpresaChallengeEditor: typeof import("../../components/empresa/ChallengeEditor.vue")['default']
  EmpresaCompanyProfile: typeof import("../../components/empresa/CompanyProfile.vue")['default']
  EmpresaDashboard: typeof import("../../components/empresa/Dashboard.vue")['default']
  EmpresaEvaluationSuite: typeof import("../../components/empresa/EvaluationSuite.vue")['default']
  EmpresaNetworkingHub: typeof import("../../components/empresa/NetworkingHub.vue")['default']
  EmpresaTalentExplorer: typeof import("../../components/empresa/TalentExplorer.vue")['default']
  EstudianteBadges: typeof import("../../components/estudiante/Badges.vue")['default']
  EstudianteChallenges: typeof import("../../components/estudiante/Challenges.vue")['default']
  EstudianteDashboard: typeof import("../../components/estudiante/Dashboard.vue")['default']
  EstudianteNetworking: typeof import("../../components/estudiante/Networking.vue")['default']
  EstudianteProfile: typeof import("../../components/estudiante/Profile.vue")['default']
  EstudianteRanking: typeof import("../../components/estudiante/Ranking.vue")['default']
  NuxtWelcome: typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']
  NuxtLayout: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
  NuxtErrorBoundary: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
  ClientOnly: typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']
  DevOnly: typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']
  ServerPlaceholder: typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']
  NuxtLink: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']
  NuxtLoadingIndicator: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
  NuxtTime: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
  NuxtRouteAnnouncer: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
  NuxtImg: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
  NuxtPicture: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
  Motion: typeof import("@vueuse/motion")['MotionComponent']
  MotionGroup: typeof import("@vueuse/motion")['MotionGroupComponent']
  NuxtPage: typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']
  NoScript: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']
  Link: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']
  Base: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']
  Title: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']
  Meta: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']
  Style: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']
  Head: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']
  Html: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']
  Body: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']
  NuxtIsland: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']
  LazySidebar: LazyComponent<typeof import("../../components/Sidebar.vue")['default']>
  LazyAdminAudit: LazyComponent<typeof import("../../components/admin/Audit.vue")['default']>
  LazyAdminBadgesConfig: LazyComponent<typeof import("../../components/admin/BadgesConfig.vue")['default']>
  LazyAdminDashboard: LazyComponent<typeof import("../../components/admin/Dashboard.vue")['default']>
  LazyAdminInstitutions: LazyComponent<typeof import("../../components/admin/Institutions.vue")['default']>
  LazyAdminRoles: LazyComponent<typeof import("../../components/admin/Roles.vue")['default']>
  LazyAdminSettings: LazyComponent<typeof import("../../components/admin/Settings.vue")['default']>
  LazyAdminUsers: LazyComponent<typeof import("../../components/admin/Users.vue")['default']>
  LazyEmpresaChallengeEditor: LazyComponent<typeof import("../../components/empresa/ChallengeEditor.vue")['default']>
  LazyEmpresaCompanyProfile: LazyComponent<typeof import("../../components/empresa/CompanyProfile.vue")['default']>
  LazyEmpresaDashboard: LazyComponent<typeof import("../../components/empresa/Dashboard.vue")['default']>
  LazyEmpresaEvaluationSuite: LazyComponent<typeof import("../../components/empresa/EvaluationSuite.vue")['default']>
  LazyEmpresaNetworkingHub: LazyComponent<typeof import("../../components/empresa/NetworkingHub.vue")['default']>
  LazyEmpresaTalentExplorer: LazyComponent<typeof import("../../components/empresa/TalentExplorer.vue")['default']>
  LazyEstudianteBadges: LazyComponent<typeof import("../../components/estudiante/Badges.vue")['default']>
  LazyEstudianteChallenges: LazyComponent<typeof import("../../components/estudiante/Challenges.vue")['default']>
  LazyEstudianteDashboard: LazyComponent<typeof import("../../components/estudiante/Dashboard.vue")['default']>
  LazyEstudianteNetworking: LazyComponent<typeof import("../../components/estudiante/Networking.vue")['default']>
  LazyEstudianteProfile: LazyComponent<typeof import("../../components/estudiante/Profile.vue")['default']>
  LazyEstudianteRanking: LazyComponent<typeof import("../../components/estudiante/Ranking.vue")['default']>
  LazyNuxtWelcome: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
  LazyNuxtLayout: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
  LazyNuxtErrorBoundary: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
  LazyClientOnly: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']>
  LazyDevOnly: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']>
  LazyServerPlaceholder: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
  LazyNuxtLink: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
  LazyNuxtLoadingIndicator: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
  LazyNuxtTime: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
  LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
  LazyNuxtImg: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
  LazyNuxtPicture: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
  LazyMotion: LazyComponent<typeof import("@vueuse/motion")['MotionComponent']>
  LazyMotionGroup: LazyComponent<typeof import("@vueuse/motion")['MotionGroupComponent']>
  LazyNuxtPage: LazyComponent<typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']>
  LazyNoScript: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
  LazyLink: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']>
  LazyBase: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']>
  LazyTitle: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']>
  LazyMeta: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']>
  LazyStyle: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']>
  LazyHead: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']>
  LazyHtml: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']>
  LazyBody: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']>
  LazyNuxtIsland: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export {}
