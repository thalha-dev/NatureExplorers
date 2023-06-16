const ROLES_LIST = {
  Admin: Number(process.env.ADMIN_ROLE),
  Writer: Number(process.env.WRITER_ROLE),
  User: Number(process.env.USER_ROLE),
};

module.exports = ROLES_LIST;
