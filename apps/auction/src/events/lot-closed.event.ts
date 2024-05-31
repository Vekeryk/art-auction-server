import { Lot } from '../lots/lot.entity';
import { User } from '../users/user.enitity';

export class LotClosedEvent {
  constructor(
    readonly lot: Lot,
    readonly seller: User,
    readonly buyer: User | null,
  ) {}
}
