export class NotificationEvent {
  constructor(
    readonly userId: string,
    readonly message: string,
  ) {}
}
