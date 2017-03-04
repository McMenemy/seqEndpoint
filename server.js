const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
  port: 8000,
  routes: {
    cors: true,
  },
});

// Helper Functions
function generateRandomData() {
  // generate random sequence
  const sequenceLength = Math.floor(Math.random() * 100);
  let sequence = '';
  for (let i = 0; i < sequenceLength; i += 1) {
    const rand = Math.random();
    if (rand < 0.25) {
      sequence += 'a';
    } else if (rand < 0.5) {
      sequence += 't';
    } else if (rand < 0.75) {
      sequence += 'c';
    } else {
      sequence += 'g';
    }
  }

  // generate random features
  const numFeatures = Math.floor(Math.random() * 9);
  const featureNames = ['CDS2', 'CDS', 'Restriction Site 1', 'Promoter1', 'Promoter2',
    'Ribosome Binding Site'];
  const features = [];
  for (let i = 0; i < numFeatures; i += 1) {
    const randIdx = Math.floor(Math.random() * features.length);
    const name = featureNames[randIdx];
    const index = Math.floor(Math.random() * sequenceLength);
    features.push({ name, index });
  }

  return { sequence, sequenceLength, features };
}

// Route Handlers
function getSequenceHandler(request, reply) {
  const data = generateRandomData();
  reply(data);
}

// Routes
server.route({
  method: 'GET',
  path: '/getSequence',
  handler: getSequenceHandler,
});

// Start Server
server.start((err) => {
  if (err) {
    throw err;
  }

  console.log('Server running at:', server.info.uri);
});
