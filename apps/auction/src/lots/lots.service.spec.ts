// import { Test, TestingModule } from '@nestjs/testing';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { EventEmitter2 } from '@nestjs/event-emitter';
// import { LessThan, Repository } from 'typeorm';
//
// import { LotsService } from './lots.service';
// import { Lot, LotStatus } from './lot.entity';
//
// import { LotClosedEvent } from '../events/lot-closed.event';
// import { User } from '../users/user.enitity';
// import { UsersService } from '../users/users.service';
// import { NotificationsService } from '../notifications/notifications.service';
// import { MessagesService } from '../messages/messages.service';
// import { Notification } from '../notifications/notification.entity';
// import { Message } from '../messages/message.entity';
//
// describe('LotsService', () => {
//   let lotsService: LotsService;
//   let userService: UsersService;
//   let notificationsService: NotificationsService;
//   let messagesService: MessagesService;
//   let repository: Repository<Lot>;
//   let userRepository: Repository<Lot>;
//   let eventEmitter: EventEmitter2;
//   let testLot: Lot;
//   let now = new Date();
//
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         LotsService,
//         UsersService,
//         NotificationsService,
//         MessagesService,
//         EventEmitter2,
//         {
//           provide: getRepositoryToken(User),
//           useClass: Repository,
//         },
//         {
//           provide: getRepositoryToken(Message),
//           useClass: Repository,
//         },
//         {
//           provide: getRepositoryToken(Notification),
//           useClass: Repository,
//         },
//         {
//           provide: getRepositoryToken(Lot),
//           useClass: Repository,
//         },
//       ],
//     }).compile();
//     // await module.init();
//
//     lotsService = module.get<LotsService>(LotsService);
//     eventEmitter = module.get<EventEmitter2>(EventEmitter2);
//     userService = module.get<UsersService>(UsersService);
//     // notificationsService =
//     //   module.get<NotificationsService>(NotificationsService);
//     // messagesService = module.get<MessagesService>(MessagesService);
//     repository = module.get<Repository<Lot>>(getRepositoryToken(Lot));
//     // eventEmitter = module.get<EventEmitter2>(EventEmitter2);
//     await module.init();
//
//     now = new Date();
//     testLot = {
//       id: '1',
//       endTime: new Date(now.getTime() - 10000),
//       status: LotStatus.ACTIVE,
//       user: { id: 'sellerId' },
//       userId: 'sellerId',
//       leader: { id: 'buyerId' },
//       leaderId: 'buyerId',
//     } as unknown as Lot;
//   });
//
//   // it('should process closed lots and emit events', async () => {
//   //   const lots = [testLot];
//   //   jest.spyOn(repository, 'findBy').mockResolvedValueOnce(lots);
//   //   // @ts-ignore
//   //   jest.spyOn(repository, 'save').mockResolvedValueOnce(lots);
//   //   const emitSpy = jest.spyOn(eventEmitter, 'emit');
//   //   await lotsService.processClosedLots();
//   //
//   //   expect(repository.findBy).toHaveBeenCalledWith({
//   //     endTime: expect.any(LessThan(this.now)),
//   //     status: LotStatus.ACTIVE,
//   //   });
//   //   expect(testLot.status).toBe(LotStatus.CLOSED);
//   //   expect(repository.save).toHaveBeenCalledWith(lots);
//   //   expect(emitSpy).toHaveBeenCalledWith('lot.closed', expect.any(LotClosedEvent),);
//   //
//   //   expect(eventEmitter.hasListeners('lot.closed')).toBe(true);
//   //
//   //   const spy = jest
//   //     .spyOn(userService, 'onClosedLot')
//   //     .mockImplementation(() => null);
//   //
//   //   // expect(userService.onClosedLot({} as LotClosedEvent)).toBeTruthy();
//   //   expect(spy).toHaveBeenCalledWith({} as LotClosedEvent);
//   //   spy.mockRestore();
//   // });
//
//   // it('should handle lot.closed event and increment ratings', async () => {
//   //   const incrementRatingSpy = jest.spyOn(userService, 'incrementRating');
//   //   const payload = new LotClosedEvent(
//   //     { id: 'lotId', title: 'Lot Title' } as Lot,
//   //     { id: 'sellerId' } as User,
//   //     { id: 'buyerId' } as User,
//   //   );
//   //
//   //   await userService.onClosedLot(payload);
//   //
//   //   expect(incrementRatingSpy).toHaveBeenCalledWith({ id: 'sellerId' });
//   //   expect(incrementRatingSpy).toHaveBeenCalledWith({ id: 'buyerId' });
//   // });
//
//   // it('should handle lot.closed event and create notifications', async () => {
//   //   const createNotificationSpy = jest.spyOn(service, 'createNotification');
//   //   const payload = new LotClosedEvent(
//   //     { id: 'lotId', title: 'Lot Title' },
//   //     { id: 'sellerId' },
//   //     { id: 'buyerId' },
//   //   );
//   //
//   //   await service.onLotClosed(payload);
//   //
//   //   expect(createNotificationSpy).toHaveBeenCalledWith(
//   //     'sellerId',
//   //     'Торги за лотом Lot Title завершено',
//   //   );
//   //   expect(createNotificationSpy).toHaveBeenCalledWith(
//   //     'buyerId',
//   //     "Ви виграли лот Lot Title. Зв'яжіться з продавцем",
//   //   );
//   // });
//   //
//   // it('should handle lot.closed event and create messages', async () => {
//   //   const createMessageSpy = jest.spyOn(service, 'create');
//   //   const payload = new LotClosedEvent(
//   //     { id: 'lotId', title: 'Lot Title' },
//   //     { id: 'sellerId' },
//   //     { id: 'buyerId' },
//   //   );
//   //
//   //   await service.onLotClosed(payload);
//   //
//   //   expect(createMessageSpy).toHaveBeenCalledWith({
//   //     message:
//   //       'Вітаю вас виграшем лоту! Чи є у вас якісь побажання щодо доставки?',
//   //     senderId: 'sellerId',
//   //     receiverId: 'buyerId',
//   //   });
//   // });
//
//   it('should find recent lots', async () => {
//     // const lots = [new Lot(), new Lot()];
//     // jest.spyOn(repository, 'find').mockResolvedValueOnce(lots);
//     //
//     // expect(await service.findAll()).toEqual(lots);
//   });
//
//   it('should find one lot by ID', async () => {
//     // const lot = new Lot();
//     // jest.spyOn(repository, 'findOne').mockResolvedValueOnce(lot);
//     //
//     // expect(await service.findOne('1')).toEqual(lot);
//   });
//
//   it('should throw error if lot not found', async () => {
//     // jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);
//     //
//     // await expect(service.findOne('1')).rejects.toThrow('Lot not found');
//   });
//
//   it('should create a new lot', async () => {
//     // const lot = new Lot();
//     // jest.spyOn(repository, 'save').mockResolvedValueOnce(lot);
//     //
//     // expect(await service.create(lot)).toEqual(lot);
//   });
//
//   it('should process closed lots and emit events', async () => {
//     // const lots = [new Lot()];
//     // lots[0].endTime = new Date(Date.now() - 1000);
//     // lots[0].status = LotStatus.ACTIVE;
//     // jest.spyOn(repository, 'findBy').mockResolvedValueOnce(lots);
//     // jest.spyOn(repository, 'save').mockResolvedValueOnce(lots);
//     // const emitSpy = jest.spyOn(eventEmitter, 'emit');
//     //
//     // await service.processClosedLots();
//     //
//     // expect(lots[0].status).toBe(LotStatus.CLOSED);
//     // expect(emitSpy).toHaveBeenCalledWith('lot.closed', expect.any(Object));
//   });
//
//   it('should not process lots if no active lots found', async () => {
//     // jest.spyOn(repository, 'findBy').mockResolvedValueOnce([]);
//     // const saveSpy = jest.spyOn(repository, 'save');
//     //
//     // await service.processClosedLots();
//     //
//     // expect(saveSpy).not.toHaveBeenCalled();
//   });
//
//   it('should emit event when new bid placed', async () => {
//     // const emitSpy = jest.spyOn(eventEmitter, 'emit');
//     // const lot = new Lot();
//     // lot.id = '1';
//     // const bid = { lotId: lot.id, amount: 100, userId: 'user1' };
//     // jest.spyOn(repository, 'findOne').mockResolvedValueOnce(lot);
//     // jest.spyOn(repository, 'save').mockResolvedValueOnce(lot);
//     //
//     // await service.placeBid(bid);
//     //
//     // expect(emitSpy).toHaveBeenCalledWith('bid.placed', expect.any(Object));
//   });
//
//   it('should decrement user rating when lot withdrawn', async () => {
//     // const lot = new Lot();
//     // lot.status = LotStatus.ACTIVE;
//     // lot.user = { id: 'user1', role: 'user' };
//     // jest.spyOn(repository, 'findOne').mockResolvedValueOnce(lot);
//     // jest.spyOn(repository, 'save').mockResolvedValueOnce(lot);
//     // const decrementRatingSpy = jest.spyOn(service, 'decrementRating').mockImplementation();
//     //
//     // await service.withdrawLot({ id: 'user1', role: 'user' }, '1');
//     //
//     // expect(lot.status).toBe(LotStatus.INACTIVE);
//     // expect(decrementRatingSpy).toHaveBeenCalledWith(lot.user);
//   });
//
//   it('should process closed lots and emit events', async () => {
//     const lots = [testLot];
//     jest.spyOn(repository, 'findBy').mockResolvedValueOnce(lots);
//     // @ts-ignore
//     jest.spyOn(repository, 'save').mockResolvedValueOnce(lots);
//     const emitSpy = jest.spyOn(eventEmitter, 'emit');
//     await lotsService.processClosedLots();
//
//     expect(repository.findBy).toHaveBeenCalledWith({
//       endTime: expect.anything(),
//       status: LotStatus.ACTIVE,
//     });
//     expect(testLot.status).toBe(LotStatus.CLOSED);
//     expect(repository.save).toHaveBeenCalledWith(lots);
//     expect(emitSpy).toHaveBeenCalledWith(
//       'lot.closed',
//       expect.any(LotClosedEvent),
//     );
//     // expect(eventEmitter.hasListeners('lot.closed')).toBe(true);
//
//     // const event = new LotClosedEvent(testLot, null, null);
//     // const services = [userService, messagesService, notificationsService];
//     // for (const service of services) {
//     //   const serviceSpy = jest
//     //     .spyOn(service, 'onLotClosed')
//     //     .mockImplementation();
//     //   expect(serviceSpy).toHaveBeenCalledWith(event);
//     // }
//   });
// });
