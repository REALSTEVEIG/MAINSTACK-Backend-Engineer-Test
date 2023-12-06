module.exports = {
  async up(db, client) {
    const exists = await db.listCollections({ name: 'events' }).toArray();
    if (exists.length === 0) {
      return await db.createCollection('events');
    }
    return;
  },

  async down(db, client) {
    await db.collection('events').drop();
  },
};
