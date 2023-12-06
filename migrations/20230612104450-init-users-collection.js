module.exports = {
  async up(db, client) {
    const exists = await db.listCollections({name: 'users'}).toArray();
    if (exists.length === 0) {
      return await db.createCollection('users');
    }
    return;
  },
  async down(db, client) {
    await db.collection('users').drop();
  }
}