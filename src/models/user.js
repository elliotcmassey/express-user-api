import { bookshelf } from '../modules/bookshelf';

export default bookshelf.model('User', {
  tableName: 'users',
  idAttribute: 'id',
});
