# Run this command to allow public access to your Cloud Run service

gcloud run services set-iam-policy yara-service-backend \
  --region=us-central1 \
  --member="allUsers" \
  --role="roles/run.invoker"
