exports.seed = async function createAdminUserIfMissing(knex) {
  const [anyUsersPresent] = await knex('user').count('*');
  if (!anyUsersPresent || !parseInt(anyUsersPresent.count, 10)) {
    const [user] = await knex('user').returning('*').insert({
      first_name: 'Admin',
      last_name: 'User',
      email: 'admin@server.tld',
      // Password is: password1
      password: '$2a$08$JlMhh3n1.GQG4z4tcd35IOrVpCWskXLup0iuxncJxbAR7ubjQwRzW',
      join_date: new Date(),
      activated_at: new Date(),
      company_name: 'WEALTHE DEV',
    });

    await knex('user_role').insert({
      user_id: user.user_id,
      role_code: 'ADMIN',
    });
  }
};
