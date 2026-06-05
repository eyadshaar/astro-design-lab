# Cloudflare Pages: Deploy Without GitHub Integration

## The Problem

The Cloudflare Pages GitHub integration can fail with:
- `"There is an internal issue with your Cloudflare Pages Git installation"` — the CF GitHub app is broken on the account
- `"The project is linked to a repository that no longer exists"` — CF can't verify the GitHub repo

This blocks both the REST API (creating projects with `"source": {"type": "github", ...}`) and wrangler's normal OAuth flow.

## The Workaround: Direct Upload via wrangler

**Step 1: Create the Pages project (no GitHub) via REST API**

```python
import requests

CF_KEY = "cfk_..."  # global key
CF_EMAIL = "adam@odntsolutions.com"
ACCOUNT_ID = "c2bdd2ecef03ecf633253ef3a573221c"

payload = {
    "name": "my-project",
    "build_config": {"build_command": "npm run build", "destination_dir": "dist"},
    "deployment_configs": {
        "preview": {"compatibility_date": "2024-01-01"},
        "production": {"compatibility_date": "2024-01-01"}
    },
    "production_branch": "main"
    # NOTE: omit "source" entirely — avoids GitHub requirement
}

resp = requests.post(
    f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/pages/projects",
    headers={
        "X-Auth-Key": CF_KEY,
        "X-Auth-Email": CF_EMAIL,
        "Content-Type": "application/json"
    },
    json=payload, timeout=30
)
data = resp.json()
assert data["success"], data["errors"]
print(f"Created: {data['result']['name']}.pages.dev")
```

**Step 2: Deploy via wrangler subprocess (direct upload)**

```python
**Wrangler deploy with explicit env dict:**
```python
env = os.environ.copy()
env["CLOUDFLARE_API_KEY"] = CF_KEY      # cfk_... global key
env["CLOUDFLARE_EMAIL"] = CF_EMAIL       # adam@odntsolutions.com
env["CLOUDFLARE_ACCOUNT_ID"] = ACCOUNT_ID

subprocess.run(
    ["wrangler", "pages", "deploy", dist_path,
     "--project-name", project_name,
     "--commit-message", "Deploy"],
    env=env, capture_output=True, text=True, timeout=120
)
```

**Multi-site deploy (6 sites in sequence):**
```python
sites = [
    ("astro-design-lab-portfolio", "/path/to/portfolio/dist"),
    ("canopy-house",              "/path/to/boutique-hotel/dist"),
    ("meridian-security",         "/path/to/ai-automation-agency/dist"),
    ("fieldstone-it",             "/path/to/local-it-cybersecurity/dist"),
    ("copper-kitchen",            "/path/to/food-truck-platform/dist"),
    ("solace-wellness",           "/path/to/wellness-brand/dist"),
]
for name, dist in sites:
    subprocess.run(
        ["wrangler", "pages", "deploy", dist, "--project-name", name, "--commit-message", "Deploy"],
        env=env, capture_output=True, text=True, timeout=120
    )
    # Solace may timeout — retry once if needed
```

**Verify after deploy:**
```bash
npx wrangler pages project list
# Check "Last Modified" timestamp to confirm the deploy actually landed
```
assert result.returncode == 0, result.stderr
```

## Why subprocess.run with explicit env dict

Wrangler normally uses OAuth. The global API key (`cfk_...`) is NOT OAuth — it's a legacy key. Wrangler reads `CLOUDFLARE_API_KEY`, `CLOUDFLARE_EMAIL`, and `CLOUDFLARE_ACCOUNT_ID` from env vars. But when invoked from Python subprocess, it doesn't inherit the parent process's environment properly unless you pass `env=env` explicitly.

## Verification

```python
# List projects
result = subprocess.run(
    ["wrangler", "pages", "project", "list"],
    env=env, capture_output=True, text=True, timeout=30
)
print(result.stdout)
```

## CI/CD Alternative: GitHub Actions with wrangler

```yaml
# .github/workflows/deploy.yml
- name: Deploy to Cloudflare Pages
  uses: cloudflare/wrangler-action@v3
  with:
    apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
    accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
    command: pages deploy dist --project-name=my-project
```

Note: Wrangler Action uses its own auth — the `CLOUDFLARE_API_TOKEN` must be a scoped token with `Cloudflare Pages:Edit` permission, not the global key.
