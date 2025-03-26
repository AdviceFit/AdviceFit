module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    // Add the 'credits' field to all documents in the 'users' collection
    await db.collection('users').updateMany(
      {}, // Matches all documents
      {
        $set: {
          credits: {
            whatsapp: 0,
            sms: 0,
          },
        },
      }
    );
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {
    // Remove the 'credits' field from all documents in the 'users' collection
    await db.collection('users').updateMany(
      {}, // Matches all documents
      {
        $unset: {
          credits: '', // Unset removes the field
        },
      }
    );
  },
};
