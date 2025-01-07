const pool = require('./db'); // Adjust the path if needed
async function testConnection() {
  try {
    console.log('Attempting to connect to the database...');
    const result = await pool.query('SELECT NOW() AS current_time'); // Simple query
    console.log('Connection successful! Current time from database:', result.rows[0].current_time);
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  } finally {
    await pool.end(); // Close the pool after the test
    console.log('Database connection test completed.');
  }
}

testConnection();
