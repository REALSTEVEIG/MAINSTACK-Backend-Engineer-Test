module.exports = {
  async up(db, client) {
    const exists = await db.listCollections({name: 'actiontokens'}).toArray();
    if (exists.length === 0) {
      await db.createCollection('actiontokens');
      return await db.collection('actiontokens').createIndex({ createdAt: 1 }, { expires: 60, name: 'tokenttl' });
    }
    return;
  },

  async down(db, client) {
    await db.collection('actiontokens').dropIndex('tokenttl');
  }
};
