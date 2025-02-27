module.exports = {
  async up(db) {
    // Fetch all center IDs
    const centers = await db.collection('centers').find({}, { projection: { _id: 1 } }).toArray();
    
    if (centers.length === 0) {
      console.log("No centers found. Migration aborted.");
      return;
    }

      // Fetch all visitors
      const visitors = await db.collection('visitors').find({}).toArray();

      // Function to get a random center ID
      const getRandomCenterId = () => centers[Math.floor(Math.random() * centers.length)]._id;

      // Update each visitor with a random center ID
      const bulkOperations = visitors.map(visitor => ({
        updateOne: {
          filter: { _id: visitor._id },
          update: { $set: { visiting_center: getRandomCenterId() } }
        }
      }));

    if (bulkOperations.length > 0) {
      await db.collection('visitors').bulkWrite(bulkOperations);
      console.log(`Updated ${bulkOperations.length} visitors.`);
    }
  },

  async down(db) {
    // Undo the changes by setting visiting_center to null
    await db.collection('visitors').updateMany({}, { $set: { visiting_center: null } });
    console.log("Reverted visiting_center changes.");
  }
};
