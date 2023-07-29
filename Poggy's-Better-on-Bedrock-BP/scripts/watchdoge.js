import {system} from "@minecraft/server"
system.beforeEvents.watchdogTerminate.subscribe(data => {
  data.cancel = true
})