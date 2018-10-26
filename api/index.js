import { AppService } from './Service'

export default function BackendService() {
  AppService.initialize()
  return AppService
}
