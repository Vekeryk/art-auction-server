/* eslint-disable */
import {
  CollectionCustomizer,
  TAggregation,
  TConditionTree,
  TPaginatedFilter,
  TPartialRow,
  TSortClause
} from '@forestadmin/agent';

export type CategoryCustomizer = CollectionCustomizer<Schema, 'category'>;
export type CategoryRecord = TPartialRow<Schema, 'category'>;
export type CategoryConditionTree = TConditionTree<Schema, 'category'>;
export type CategoryFilter = TPaginatedFilter<Schema, 'category'>;
export type CategorySortClause = TSortClause<Schema, 'category'>;
export type CategoryAggregation = TAggregation<Schema, 'category'>;

export type CommentCustomizer = CollectionCustomizer<Schema, 'comment'>;
export type CommentRecord = TPartialRow<Schema, 'comment'>;
export type CommentConditionTree = TConditionTree<Schema, 'comment'>;
export type CommentFilter = TPaginatedFilter<Schema, 'comment'>;
export type CommentSortClause = TSortClause<Schema, 'comment'>;
export type CommentAggregation = TAggregation<Schema, 'comment'>;

export type LotCustomizer = CollectionCustomizer<Schema, 'lot'>;
export type LotRecord = TPartialRow<Schema, 'lot'>;
export type LotConditionTree = TConditionTree<Schema, 'lot'>;
export type LotFilter = TPaginatedFilter<Schema, 'lot'>;
export type LotSortClause = TSortClause<Schema, 'lot'>;
export type LotAggregation = TAggregation<Schema, 'lot'>;

export type LotImageCustomizer = CollectionCustomizer<Schema, 'lot_image'>;
export type LotImageRecord = TPartialRow<Schema, 'lot_image'>;
export type LotImageConditionTree = TConditionTree<Schema, 'lot_image'>;
export type LotImageFilter = TPaginatedFilter<Schema, 'lot_image'>;
export type LotImageSortClause = TSortClause<Schema, 'lot_image'>;
export type LotImageAggregation = TAggregation<Schema, 'lot_image'>;

export type LotTagsCustomizer = CollectionCustomizer<Schema, 'lot_tags'>;
export type LotTagsRecord = TPartialRow<Schema, 'lot_tags'>;
export type LotTagsConditionTree = TConditionTree<Schema, 'lot_tags'>;
export type LotTagsFilter = TPaginatedFilter<Schema, 'lot_tags'>;
export type LotTagsSortClause = TSortClause<Schema, 'lot_tags'>;
export type LotTagsAggregation = TAggregation<Schema, 'lot_tags'>;

export type MessageCustomizer = CollectionCustomizer<Schema, 'message'>;
export type MessageRecord = TPartialRow<Schema, 'message'>;
export type MessageConditionTree = TConditionTree<Schema, 'message'>;
export type MessageFilter = TPaginatedFilter<Schema, 'message'>;
export type MessageSortClause = TSortClause<Schema, 'message'>;
export type MessageAggregation = TAggregation<Schema, 'message'>;

export type NotificationCustomizer = CollectionCustomizer<Schema, 'notification'>;
export type NotificationRecord = TPartialRow<Schema, 'notification'>;
export type NotificationConditionTree = TConditionTree<Schema, 'notification'>;
export type NotificationFilter = TPaginatedFilter<Schema, 'notification'>;
export type NotificationSortClause = TSortClause<Schema, 'notification'>;
export type NotificationAggregation = TAggregation<Schema, 'notification'>;

export type ReportCustomizer = CollectionCustomizer<Schema, 'report'>;
export type ReportRecord = TPartialRow<Schema, 'report'>;
export type ReportConditionTree = TConditionTree<Schema, 'report'>;
export type ReportFilter = TPaginatedFilter<Schema, 'report'>;
export type ReportSortClause = TSortClause<Schema, 'report'>;
export type ReportAggregation = TAggregation<Schema, 'report'>;

export type TagCustomizer = CollectionCustomizer<Schema, 'tag'>;
export type TagRecord = TPartialRow<Schema, 'tag'>;
export type TagConditionTree = TConditionTree<Schema, 'tag'>;
export type TagFilter = TPaginatedFilter<Schema, 'tag'>;
export type TagSortClause = TSortClause<Schema, 'tag'>;
export type TagAggregation = TAggregation<Schema, 'tag'>;

export type UserCustomizer = CollectionCustomizer<Schema, 'user'>;
export type UserRecord = TPartialRow<Schema, 'user'>;
export type UserConditionTree = TConditionTree<Schema, 'user'>;
export type UserFilter = TPaginatedFilter<Schema, 'user'>;
export type UserSortClause = TSortClause<Schema, 'user'>;
export type UserAggregation = TAggregation<Schema, 'user'>;


export type Schema = {
  'category': {
    plain: {
      'id': string;
      'name': string;
    };
    nested: {};
    flat: {};
  };
  'comment': {
    plain: {
      'content': string;
      'created_at': string;
      'id': string;
      'lot_id': string | null;
      'user_id': string | null;
    };
    nested: {
      'lot': Schema['lot']['plain'] & Schema['lot']['nested'];
      'user': Schema['user']['plain'] & Schema['user']['nested'];
    };
    flat: {
      'lot:category_id': string | null;
      'lot:created_at': string;
      'lot:current_price': number | null;
      'lot:deal_type': 'CASH_ON_DELIVERY' | 'PREPAYMENT';
      'lot:delivery_methods': Array<'BY_AGREEMENT' | 'COURIER_SERVICE' | 'NOVA_POST' | 'PERSONAL_MEETING' | 'UKR_POST'>;
      'lot:description': string;
      'lot:end_time': string | null;
      'lot:id': string;
      'lot:location': 'CHERKASY' | 'CHERNIVTSI' | 'DNIPRO' | 'DONETSK' | 'IVANO_FRANKIVSK' | 'KHARKIV' | 'KHERSON' | 'KHMELNYTSKYI' | 'KROPYVNYTSKYI' | 'KYIV' | 'LUHANSK' | 'MYKOLAIV' | 'ODESA' | 'POLTAVA' | 'RIVNE' | 'SUMY' | 'TERNOPIL' | 'VINNYTSIA' | 'VOLYN' | 'ZAKARPATTIA' | 'ZAPORIZHZHIA' | 'ZHYTOMYR';
      'lot:payment_methods': Array<'BANK_TRANSFER' | 'BY_AGREEMENT' | 'CASH_ON_MEETING' | 'PAY_TO_COURIER'>;
      'lot:start_time': string;
      'lot:starting_price': number;
      'lot:status': 'ACTIVE' | 'CLOSED' | 'INACTIVE' | 'PENDING';
      'lot:title': string;
      'lot:updated_at': string | null;
      'lot:user_id': string | null;
      'user:balance': number;
      'user:created_at': string;
      'user:email': string;
      'user:first_name': string;
      'user:id': string;
      'user:last_name': string;
      'user:password_hash': string;
      'user:profile_picture': string | null;
      'user:rating': number;
      'user:updated_at': string | null;
      'user:username': string;
      'lot:category:id': string;
      'lot:category:name': string;
      'lot:user:balance': number;
      'lot:user:created_at': string;
      'lot:user:email': string;
      'lot:user:first_name': string;
      'lot:user:id': string;
      'lot:user:last_name': string;
      'lot:user:password_hash': string;
      'lot:user:profile_picture': string | null;
      'lot:user:rating': number;
      'lot:user:updated_at': string | null;
      'lot:user:username': string;
    };
  };
  'lot': {
    plain: {
      'category_id': string | null;
      'created_at': string;
      'current_price': number | null;
      'deal_type': 'CASH_ON_DELIVERY' | 'PREPAYMENT';
      'delivery_methods': Array<'BY_AGREEMENT' | 'COURIER_SERVICE' | 'NOVA_POST' | 'PERSONAL_MEETING' | 'UKR_POST'>;
      'description': string;
      'end_time': string | null;
      'id': string;
      'location': 'CHERKASY' | 'CHERNIVTSI' | 'DNIPRO' | 'DONETSK' | 'IVANO_FRANKIVSK' | 'KHARKIV' | 'KHERSON' | 'KHMELNYTSKYI' | 'KROPYVNYTSKYI' | 'KYIV' | 'LUHANSK' | 'MYKOLAIV' | 'ODESA' | 'POLTAVA' | 'RIVNE' | 'SUMY' | 'TERNOPIL' | 'VINNYTSIA' | 'VOLYN' | 'ZAKARPATTIA' | 'ZAPORIZHZHIA' | 'ZHYTOMYR';
      'payment_methods': Array<'BANK_TRANSFER' | 'BY_AGREEMENT' | 'CASH_ON_MEETING' | 'PAY_TO_COURIER'>;
      'start_time': string;
      'starting_price': number;
      'status': 'ACTIVE' | 'CLOSED' | 'INACTIVE' | 'PENDING';
      'title': string;
      'updated_at': string | null;
      'user_id': string | null;
    };
    nested: {
      'category': Schema['category']['plain'] & Schema['category']['nested'];
      'user': Schema['user']['plain'] & Schema['user']['nested'];
    };
    flat: {
      'category:id': string;
      'category:name': string;
      'user:balance': number;
      'user:created_at': string;
      'user:email': string;
      'user:first_name': string;
      'user:id': string;
      'user:last_name': string;
      'user:password_hash': string;
      'user:profile_picture': string | null;
      'user:rating': number;
      'user:updated_at': string | null;
      'user:username': string;
    };
  };
  'lot_image': {
    plain: {
      'created_at': string;
      'id': string;
      'image': string;
      'lot_id': string | null;
    };
    nested: {
      'lot': Schema['lot']['plain'] & Schema['lot']['nested'];
    };
    flat: {
      'lot:category_id': string | null;
      'lot:created_at': string;
      'lot:current_price': number | null;
      'lot:deal_type': 'CASH_ON_DELIVERY' | 'PREPAYMENT';
      'lot:delivery_methods': Array<'BY_AGREEMENT' | 'COURIER_SERVICE' | 'NOVA_POST' | 'PERSONAL_MEETING' | 'UKR_POST'>;
      'lot:description': string;
      'lot:end_time': string | null;
      'lot:id': string;
      'lot:location': 'CHERKASY' | 'CHERNIVTSI' | 'DNIPRO' | 'DONETSK' | 'IVANO_FRANKIVSK' | 'KHARKIV' | 'KHERSON' | 'KHMELNYTSKYI' | 'KROPYVNYTSKYI' | 'KYIV' | 'LUHANSK' | 'MYKOLAIV' | 'ODESA' | 'POLTAVA' | 'RIVNE' | 'SUMY' | 'TERNOPIL' | 'VINNYTSIA' | 'VOLYN' | 'ZAKARPATTIA' | 'ZAPORIZHZHIA' | 'ZHYTOMYR';
      'lot:payment_methods': Array<'BANK_TRANSFER' | 'BY_AGREEMENT' | 'CASH_ON_MEETING' | 'PAY_TO_COURIER'>;
      'lot:start_time': string;
      'lot:starting_price': number;
      'lot:status': 'ACTIVE' | 'CLOSED' | 'INACTIVE' | 'PENDING';
      'lot:title': string;
      'lot:updated_at': string | null;
      'lot:user_id': string | null;
      'lot:category:id': string;
      'lot:category:name': string;
      'lot:user:balance': number;
      'lot:user:created_at': string;
      'lot:user:email': string;
      'lot:user:first_name': string;
      'lot:user:id': string;
      'lot:user:last_name': string;
      'lot:user:password_hash': string;
      'lot:user:profile_picture': string | null;
      'lot:user:rating': number;
      'lot:user:updated_at': string | null;
      'lot:user:username': string;
    };
  };
  'lot_tags': {
    plain: {
      'lot_id': string;
      'tag_id': string;
    };
    nested: {
      'lot': Schema['lot']['plain'] & Schema['lot']['nested'];
      'tag': Schema['tag']['plain'] & Schema['tag']['nested'];
    };
    flat: {
      'lot:category_id': string | null;
      'lot:created_at': string;
      'lot:current_price': number | null;
      'lot:deal_type': 'CASH_ON_DELIVERY' | 'PREPAYMENT';
      'lot:delivery_methods': Array<'BY_AGREEMENT' | 'COURIER_SERVICE' | 'NOVA_POST' | 'PERSONAL_MEETING' | 'UKR_POST'>;
      'lot:description': string;
      'lot:end_time': string | null;
      'lot:id': string;
      'lot:location': 'CHERKASY' | 'CHERNIVTSI' | 'DNIPRO' | 'DONETSK' | 'IVANO_FRANKIVSK' | 'KHARKIV' | 'KHERSON' | 'KHMELNYTSKYI' | 'KROPYVNYTSKYI' | 'KYIV' | 'LUHANSK' | 'MYKOLAIV' | 'ODESA' | 'POLTAVA' | 'RIVNE' | 'SUMY' | 'TERNOPIL' | 'VINNYTSIA' | 'VOLYN' | 'ZAKARPATTIA' | 'ZAPORIZHZHIA' | 'ZHYTOMYR';
      'lot:payment_methods': Array<'BANK_TRANSFER' | 'BY_AGREEMENT' | 'CASH_ON_MEETING' | 'PAY_TO_COURIER'>;
      'lot:start_time': string;
      'lot:starting_price': number;
      'lot:status': 'ACTIVE' | 'CLOSED' | 'INACTIVE' | 'PENDING';
      'lot:title': string;
      'lot:updated_at': string | null;
      'lot:user_id': string | null;
      'tag:id': string;
      'tag:name': string;
      'lot:category:id': string;
      'lot:category:name': string;
      'lot:user:balance': number;
      'lot:user:created_at': string;
      'lot:user:email': string;
      'lot:user:first_name': string;
      'lot:user:id': string;
      'lot:user:last_name': string;
      'lot:user:password_hash': string;
      'lot:user:profile_picture': string | null;
      'lot:user:rating': number;
      'lot:user:updated_at': string | null;
      'lot:user:username': string;
    };
  };
  'message': {
    plain: {
      'created_at': string;
      'id': string;
      'message': string;
      'receiver_id': string | null;
      'sender_id': string | null;
    };
    nested: {
      'receiver': Schema['user']['plain'] & Schema['user']['nested'];
      'sender': Schema['user']['plain'] & Schema['user']['nested'];
    };
    flat: {
      'receiver:balance': number;
      'receiver:created_at': string;
      'receiver:email': string;
      'receiver:first_name': string;
      'receiver:id': string;
      'receiver:last_name': string;
      'receiver:password_hash': string;
      'receiver:profile_picture': string | null;
      'receiver:rating': number;
      'receiver:updated_at': string | null;
      'receiver:username': string;
      'sender:balance': number;
      'sender:created_at': string;
      'sender:email': string;
      'sender:first_name': string;
      'sender:id': string;
      'sender:last_name': string;
      'sender:password_hash': string;
      'sender:profile_picture': string | null;
      'sender:rating': number;
      'sender:updated_at': string | null;
      'sender:username': string;
    };
  };
  'notification': {
    plain: {
      'created_at': string;
      'id': string;
      'message': string;
      'read': boolean;
      'user_id': string | null;
    };
    nested: {
      'user': Schema['user']['plain'] & Schema['user']['nested'];
    };
    flat: {
      'user:balance': number;
      'user:created_at': string;
      'user:email': string;
      'user:first_name': string;
      'user:id': string;
      'user:last_name': string;
      'user:password_hash': string;
      'user:profile_picture': string | null;
      'user:rating': number;
      'user:updated_at': string | null;
      'user:username': string;
    };
  };
  'report': {
    plain: {
      'content': string;
      'created_at': string;
      'id': string;
      'lot_id': string | null;
      'user_id': string | null;
    };
    nested: {
      'lot': Schema['lot']['plain'] & Schema['lot']['nested'];
      'user': Schema['user']['plain'] & Schema['user']['nested'];
    };
    flat: {
      'lot:category_id': string | null;
      'lot:created_at': string;
      'lot:current_price': number | null;
      'lot:deal_type': 'CASH_ON_DELIVERY' | 'PREPAYMENT';
      'lot:delivery_methods': Array<'BY_AGREEMENT' | 'COURIER_SERVICE' | 'NOVA_POST' | 'PERSONAL_MEETING' | 'UKR_POST'>;
      'lot:description': string;
      'lot:end_time': string | null;
      'lot:id': string;
      'lot:location': 'CHERKASY' | 'CHERNIVTSI' | 'DNIPRO' | 'DONETSK' | 'IVANO_FRANKIVSK' | 'KHARKIV' | 'KHERSON' | 'KHMELNYTSKYI' | 'KROPYVNYTSKYI' | 'KYIV' | 'LUHANSK' | 'MYKOLAIV' | 'ODESA' | 'POLTAVA' | 'RIVNE' | 'SUMY' | 'TERNOPIL' | 'VINNYTSIA' | 'VOLYN' | 'ZAKARPATTIA' | 'ZAPORIZHZHIA' | 'ZHYTOMYR';
      'lot:payment_methods': Array<'BANK_TRANSFER' | 'BY_AGREEMENT' | 'CASH_ON_MEETING' | 'PAY_TO_COURIER'>;
      'lot:start_time': string;
      'lot:starting_price': number;
      'lot:status': 'ACTIVE' | 'CLOSED' | 'INACTIVE' | 'PENDING';
      'lot:title': string;
      'lot:updated_at': string | null;
      'lot:user_id': string | null;
      'user:balance': number;
      'user:created_at': string;
      'user:email': string;
      'user:first_name': string;
      'user:id': string;
      'user:last_name': string;
      'user:password_hash': string;
      'user:profile_picture': string | null;
      'user:rating': number;
      'user:updated_at': string | null;
      'user:username': string;
      'lot:category:id': string;
      'lot:category:name': string;
      'lot:user:balance': number;
      'lot:user:created_at': string;
      'lot:user:email': string;
      'lot:user:first_name': string;
      'lot:user:id': string;
      'lot:user:last_name': string;
      'lot:user:password_hash': string;
      'lot:user:profile_picture': string | null;
      'lot:user:rating': number;
      'lot:user:updated_at': string | null;
      'lot:user:username': string;
    };
  };
  'tag': {
    plain: {
      'id': string;
      'name': string;
    };
    nested: {};
    flat: {};
  };
  'user': {
    plain: {
      'balance': number;
      'created_at': string;
      'email': string;
      'first_name': string;
      'id': string;
      'last_name': string;
      'password_hash': string;
      'profile_picture': string | null;
      'rating': number;
      'updated_at': string | null;
      'username': string;
    };
    nested: {};
    flat: {};
  };
};
