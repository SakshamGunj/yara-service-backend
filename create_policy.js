// Script to create a properly encoded policy.json file using ES module syntax

import { writeFileSync } from 'fs';

const policy = {
  bindings: [
    {
      role: "roles/run.invoker",
      members: ["allUsers"]
    }
  ]
};

// Write policy to file with proper encoding
writeFileSync('policy.json', JSON.stringify(policy, null, 2), 'utf8');

console.log('Policy file created successfully');
console.log('Now run: gcloud run services set-iam-policy yara-service-backend policy.json --region=us-central1');
