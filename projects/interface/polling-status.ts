import { Polling } from "./polling"

export interface PollingStatus {
	id: string
	version: number
  isActive:boolean
	polling:Polling
}
