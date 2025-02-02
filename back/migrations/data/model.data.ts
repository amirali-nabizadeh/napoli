import { Action } from 'src/authentication/model/action/action.entity';
import { Model } from 'src/authentication/model/model/model.entity';
export const MODELS: (Pick<Model, 'id' | 'name' | 'label'> & {
  actions: Pick<Action, 'id'>[];
})[] = [
  {
    id: 1,
    name: 'all',
    label: 'همه بخش ها',
    actions: [
      {
        id: 0,
      },
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
      {
        id: 4,
      },
    ],
  },
  {
    id: 2,
    name: 'authentication__user',
    label: 'کاربران',
    actions: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
  },
  {
    id: 3,
    name: 'site_management__contact_request',
    label: 'درخواست تماس',
    actions: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
  },
];
