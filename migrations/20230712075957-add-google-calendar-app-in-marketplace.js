module.exports = {
  async up(db, client) {
    const appConfig = {
      clientId:
        '',
      clientSecret: '',
      authCallbackUri:
        'http://localhost:8000/api/marketplace/google-calendar/install',
      scopes: ['https://www.googleapis.com/auth/calendar'],
    };

    await db.collection('marketplace').insertOne({
      name: 'Google Calendar',
      uid: 'google_calendar',
      description:
        'Google Calendar helps you stay on top of your plans - at home, at work and everywhere in between.',
      version: '1.0',
      appIcon:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Calendar_icon_%282020%29.svg',
      appConfig,
    });
  },

  async down(db, client) {
    await db.collection('marketplace').deleteOne({
      name: 'Google Calendar',
    });
  },
};
