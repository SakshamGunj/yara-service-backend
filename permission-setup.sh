# Run these commands in your terminal to grant necessary permissions

# Set your project ID (replace with your actual project ID)
gcloud config set project funk-456015

# Grant yourself the Cloud Build Editor role
gcloud projects add-iam-policy-binding funk-456015 \
    --member=user:gunj06saksham@gmail.com \
    --role=roles/cloudbuild.builds.editor

# Grant yourself the Storage Admin role (needed for uploading build sources)
gcloud projects add-iam-policy-binding funk-456015 \
    --member=user:gunj06saksham@gmail.com \
    --role=roles/storage.admin

# Grant Cloud Run Admin role (for deploying to Cloud Run)
gcloud projects add-iam-policy-binding funk-456015 \
    --member=user:gunj06saksham@gmail.com \
    --role=roles/run.admin

# Grant Service Account User role
gcloud projects add-iam-policy-binding funk-456015 \
    --member=user:gunj06saksham@gmail.com \
    --role=roles/iam.serviceAccountUser
