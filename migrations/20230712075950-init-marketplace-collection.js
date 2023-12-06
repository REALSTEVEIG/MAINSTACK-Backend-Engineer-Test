module.exports = {
  async up(db, client) {
    const exists = await db.listCollections({ name: 'marketplace' }).toArray();
    if (exists.length === 0) {
      return await db.createCollection('marketplace');
    }
    return;
  },
  async down(db, client) {
    await db.collection('marketplace').drop();
  }
}