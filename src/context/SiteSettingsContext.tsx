import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getSiteSettings } from '../lib/supabase'
import { SiteSettings } from '../lib/types'
import { INITIAL_SITE_SETTINGS } from '../data/initialData'

interface SiteSettingsContextValue {
  settings: SiteSettings
  /** Re-fetches settings from the database (bypassing cache) and updates the whole site. */
  refresh: () => Promise<void>
  /** Helpers derived from the settings */
  whatsappLink: (message?: string) => string
  telHref: string
  mailHref: string
  mapsHref: string
}

const SiteSettingsContext = createContext<SiteSettingsContextValue | null>(null)

const digitsOnly = (value: string): string => value.replace(/[^0-9]/g, '')

/** Injects Google Analytics + Search Console verification based on the admin settings. */
function useGlobalTrackingTags(settings: SiteSettings): void {
  useEffect(() => {
    const verification = settings.google_site_verification?.trim()
    if (!verification) return
    let meta = document.querySelector('meta[name="google-site-verification"]') as HTMLMetaElement | null
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'google-site-verification')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', verification)
  }, [settings.google_site_verification])

  useEffect(() => {
    const gaId = settings.google_analytics_id?.trim()
    if (!gaId || document.querySelector(`script[data-ga-id="${gaId}"]`)) return

    const w = window as unknown as { dataLayer: unknown[]; gtag?: (...args: unknown[]) => void }
    w.dataLayer = w.dataLayer || []
    if (!w.gtag) {
      w.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        w.dataLayer.push(arguments)
      }
      w.gtag('js', new Date())
    }

    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`
    script.setAttribute('data-ga-id', gaId)
    document.head.appendChild(script)
    w.gtag('config', gaId)
  }, [settings.google_analytics_id])
}

export const SiteSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SITE_SETTINGS)

  const refresh = useCallback(async () => {
    const data = await getSiteSettings(true)
    if (data) setSettings(data)
  }, [])

  useEffect(() => {
    let isMounted = true
    getSiteSettings().then((data) => {
      if (isMounted && data) setSettings(data)
    })
    return () => {
      isMounted = false
    }
  }, [])

  useGlobalTrackingTags(settings)

  const value = useMemo<SiteSettingsContextValue>(() => {
    const whatsapp = digitsOnly(settings.whatsapp_number || settings.phone_number || '')
    const phone = (settings.phone_number || '').replace(/\s+/g, '')
    return {
      settings,
      refresh,
      whatsappLink: (message?: string) =>
        `https://wa.me/${whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ''}`,
      telHref: `tel:${phone}`,
      mailHref: `mailto:${settings.email_address || ''}`,
      mapsHref: `https://maps.google.com/?q=${encodeURIComponent(settings.address || '')}`,
    }
  }, [settings, refresh])

  return <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>
}

export function useSiteSettings(): SiteSettingsContextValue {
  const ctx = useContext(SiteSettingsContext)
  if (!ctx) throw new Error('useSiteSettings must be used within SiteSettingsProvider')
  return ctx
}

