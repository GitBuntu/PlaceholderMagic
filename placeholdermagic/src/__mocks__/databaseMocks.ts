export const mockDatabases = [
    'development_db',
    'production_db',
    'test_db'
];

export const mockSchemas = {
    development_db: ['public', 'auth', 'data'],
    production_db: ['public', 'auth', 'data'],
    test_db: ['public']
};

export const mockTables = {
    'development_db.public': ['users', 'posts', 'comments'],
    'development_db.auth': ['users_auth', 'permissions'],
    'development_db.data': ['analytics', 'logs'],
    'production_db.public': ['users', 'posts', 'comments'],
    'production_db.auth': ['users_auth', 'permissions'],
    'production_db.data': ['analytics', 'logs'],
    'test_db.public': ['test_users', 'test_data']
};

export const mockColumns = {
    'development_db.public.users': ['id', 'username', 'email', 'created_at'],
    'development_db.public.posts': ['id', 'title', 'content', 'user_id'],
    'development_db.public.comments': ['id', 'post_id', 'user_id', 'content'],
    'test_db.public.test_users': ['id', 'test_name', 'test_email']
};