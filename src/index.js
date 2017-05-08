import deepMerge from "deepmerge"
import SwaggerUI from "swagger-ui"
import EditorLayout from "./layout"
import "swagger-ui/dist/swagger-ui.css"

import EditorPlugin from "./plugins/editor"
import LocalStoragePlugin from "./plugins/local-storage"
import TopBarPlugin from "./plugins/topbar"
import ValidationApiPlugin from "./plugins/validation/apis"

const plugins = {
  EditorPlugin,
  TopBarPlugin,
  ValidationApiPlugin,
  LocalStoragePlugin
}

// eslint-disable-next-line no-undef
const { GIT_DIRTY, GIT_COMMIT, PACKAGE_VERSION } = buildInfo

window.versions = window.versions || {}
window.versions.swaggerEditor = `${PACKAGE_VERSION}/${GIT_COMMIT || "unknown"}${GIT_DIRTY ? "-dirty" : ""}`

const defaults = {
  dom_id: "#swagger-editor", // eslint-disable-line camelcase, we have this prop for legacy reasons.
  layout: "EditorLayout",
  presets: [
    SwaggerUI.presets.apis
  ],
  plugins: Object.values(plugins),
  components: {
    EditorLayout,
  },
}

module.exports = function SwaggerEditor(options) {
  let mergedOptions = deepMerge(defaults, options)

  return SwaggerUI(mergedOptions)
}

module.exports.plugins = plugins