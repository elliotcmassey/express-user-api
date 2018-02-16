import config from 'config';
import knexFactory from 'knex';
import bookshelfFactory from 'bookshelf';

const knex = knexFactory({ client: 'sqlite3', connection: config.db });
const bookshelf = bookshelfFactory(knex);

// load bookshelf plugins
bookshelf.plugin('registry');

export { bookshelf, knex };
