exports.seed = async function createAdminUserIfMissing(knex) {
  const [anyUsersPresent] = await knex('site_user').count('*');
  if (!anyUsersPresent || !parseInt(anyUsersPresent.count, 10)) {
    const [user] = await knex('site_user').returning('*').insert({
      user_id: 1,
      email: 'user@server.tld',
      // Password is: password1
      password: '$2a$08$JlMhh3n1.GQG4z4tcd35IOrVpCWskXLup0iuxncJxbAR7ubjQwRzW',
      created_at: new Date(),
    });

    await knex('user_role').insert({
      user_id: user.user_id,
      role_code: 'ADMIN',
    });
  }
};
