export class UserRatingUpdateEvent {
  constructor(
    readonly userId: string,
    readonly newRating: number,
  ) {}
}
