This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## CI/CD Pipeline

This project uses GitHub Actions for CI/CD. The workflow is defined in `.github/workflows/build-and-deploy.yml`.

### Build Process

A new Docker image is built and pushed to Google Artifact Registry automatically when:
- A commit is pushed to the `main` branch. The image is tagged with the short commit SHA.
- A tag is pushed with the format `v*` (e.g., `v1.0.0`). The image is tagged with the Git tag.

### Deployment Process

Deployment to the Kubernetes cluster is a manual process managed by ArgoCD.

1.  **Trigger the deployment**: Navigate to the "Actions" tab of the GitHub repository, select the "Build and Deploy to Kubernetes" workflow, and click "Run workflow".
2.  **Specify Image Tag**: You will be prompted to enter the `image_tag` you want to deploy. This should be a tag that was previously built and pushed to the registry (either a commit SHA or a Git tag).
3.  **ArgoCD Sync**: The workflow updates the image tag in the Kubernetes manifest repository. ArgoCD will detect the change and automatically sync the application, deploying the new version.

### Required Secrets

The following secrets must be configured in the repository's `Settings > Secrets and variables > Actions`:

- `GCP_SERVICE_ACCOUNT`: A JSON key for a Google Cloud service account with the "Artifact Registry Writer" role.
- `GCP_PROJECT_ID`: Your Google Cloud Project ID.
- `GCP_LOCATION`: The location of your Artifact Registry repository (e.g., `us-central1`).
- `MANIFEST_REPO`: The repository containing the Kubernetes manifests (e.g., `your-org/your-manifests-repo`).
- `MANIFEST_REPO_PAT`: A Personal Access Token (PAT) with write access to the manifest repository.
