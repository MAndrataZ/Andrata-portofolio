import { profile } from '../data/profile.js'
import { asset } from './assets.js'

export const heroPhoto = profile.photo ? asset(profile.photo) : null

// photoAbout: missing = reuse the hero photo, '' = no photo, a path = use that file
export const aboutPhoto =
  profile.photoAbout === undefined ? heroPhoto : profile.photoAbout ? asset(profile.photoAbout) : null