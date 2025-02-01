import { Action } from 'src/authentication/model/action/action.entity';
import { DeepPartial } from 'typeorm';

export const ACTIONS: DeepPartial<Action>[] = [
  {
    id: 0,
    label: 'همه',
  },
  {
    id: 1,
    label: 'مشاهده',
  },
  {
    id: 2,
    label: 'ثبت',
  },
  {
    id: 3,
    label: 'بروزرسانی',
  },
  {
    id: 4,
    label: 'حذف',
  },
  {
    id: 5,
    label: 'کامنت',
  },
  {
    id: 6,
    label: 'خرید',
  },
  {
    id: 7,
    label: 'مشاهده‌ی گزارش',
  },
];
