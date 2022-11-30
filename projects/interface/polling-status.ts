import { Polling } from "./polling"

export interface PollingStatus extends Polling {
	id: string
	version: number
  isActive:boolean
	polling:Polling
}
