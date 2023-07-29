import {system} from "@minecraft/server"
system.events.beforeWatchdogTerminate.subscribe(data => {
  data.cancel = true
})