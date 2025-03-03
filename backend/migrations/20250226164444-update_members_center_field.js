module.exports = {
  async up(db, client) {
    // Fetch all members
    const members = await db.collection('members').find({}).toArray();
    
    // Fetch all center IDs
    const centers = await db.collection('centers').find({}, { projection: { _id: 1 } }).toArray();
    
    if (centers.length === 0) {
      return;
    }

    // Function to get a random center ID
    const getRandomCenterId = () => centers[Math.floor(Math.random() * centers.length)]._id;

    // Update each member with a random center ID
    const bulkOperations = members.map(member => ({
      updateOne: {
        filter: { _id: member._id },
        update: { $set: { center: getRandomCenterId() } }
      }
    }));

    if (bulkOperations.length > 0) {
      await db.collection('members').bulkWrite(bulkOperations);
  }
  },
  async down(db, client) {
    // Reset the center field to null in case of rollback
    await db.collection('members').updateMany({}, { $unset: { center: "" } });
  }
};
