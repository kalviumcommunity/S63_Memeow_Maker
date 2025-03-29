const User = require('./models/User');
const Entity = require('./models/Entity');
const { sequelize } = require('./connectDB');

const seedDatabase = async () => {
  try {
    // Force sync all models (this will drop tables if they exist)
    // In production, you would use migrations instead
    await sequelize.sync({ force: true });
    console.log('✅ Database synced');

    // Create users
    const users = await User.bulkCreate([
      {
        username: 'catLover',
        email: 'cat.lover@example.com',
        name: 'Cat Lover',
        password: 'password123', // Will be hashed by the beforeCreate hook
      },
      {
        username: 'memeCreator',
        email: 'meme.creator@example.com',
        name: 'Meme Creator',
        password: 'password123', // Will be hashed by the beforeCreate hook
      },
      {
        username: 'funnyPerson',
        email: 'funny.person@example.com',
        name: 'Funny Person',
        password: 'password123', // Will be hashed by the beforeCreate hook
      },
    ]);

    console.log('✅ Users seeded');

    // Create entities
    const entities = await Entity.bulkCreate([
      {
        name: 'Grumpy Cat',
        description: 'A meme about a cat that always looks grumpy',
        userId: users[0].id, // Created by Cat Lover
      },
      {
        name: 'Doge',
        description: 'A meme about a Shiba Inu dog with broken English phrases',
        userId: users[1].id, // Created by Meme Creator
      },
      {
        name: 'Keyboard Cat',
        description: 'A meme about a cat playing a keyboard',
        userId: users[0].id, // Created by Cat Lover
      },
      {
        name: 'Distracted Boyfriend',
        description: 'A meme about a boyfriend looking at another woman',
        userId: users[2].id, // Created by Funny Person
      },
      {
        name: 'Success Kid',
        description: 'A meme about a kid with a clenched fist',
        userId: users[1].id, // Created by Meme Creator
      },
    ]);

    console.log('✅ Entities seeded');
    console.log('✅ Database seeding completed');

    return { users, entities };
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};

// If this file is run directly (not imported), run the seeder
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('✅ Seeding completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Seeding failed:', error);
      process.exit(1);
    });
}

module.exports = seedDatabase;