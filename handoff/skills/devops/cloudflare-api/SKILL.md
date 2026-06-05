---
name: cloudflare-api
description: Cloudflare API v4 — DNS, Pages, Workers, SSL, and Zone management via REST/GraphQL. Authenticate with API tokens (preferred) or API keys.
version: 1.1.0
last_updated: 2026-05-13
metadata:
  hermes:
    tags: [cloudflare, dns, pages, workers, ssl, api, infrastructure]
  cloudflare:
    docs: https://developers.cloudflare.com/api/
    api_base: https://api.cloudflare.com/client/v4
---

# Cloudflare API v4 — Complete Reference

## Authentication

Two methods — **API Keys** (global, `cfk_` prefix) and **API Tokens** (scoped, recommended).

### API Key (Global — what this account uses)

A **global API key** uses `X-Auth-Key` + `X-Auth-Email` headers (NOT Bearer):

```bash
export CF_API_KEY="cfk_your_global_key_here"
export CF_EMAIL="your-cloudflare-account-email@example.com"

curl -s -H "X-Auth-Key: $CF_API_KEY" \
     -H "X-Auth-Email: $CF_EMAIL" \
     -H "Content-Type: application/json" \
     "https://api.cloudflare.com/client/v4/zones"
```

### API Token (Scoped, Safer — for CI/CD)

Created in Cloudflare Dashboard → Profile → API Tokens. Use **Bearer** auth:

```bash
export CF_API_TOKEN="your_scoped_token_here"

curl -s -H "Authorization: Bearer $CF_API_TOKEN" \
     -H "Content-Type: application/json" \
     "https://api.cloudflare.com/client/v4/zones"
```

**Token format in env:** `CLOUDFLARE_<ZONE>_DNS_TOKEN=...` (zone-scoped, preferred for scripts).
If a scoped token returns `9109 Invalid access token`, regenerate at dash.cloudflare.com/profile/api-tokens using the **"Edit zone DNS"** template.

### Quick Test
```bash
curl -s "https://api.cloudflare.com/client/v4/zones" \
  -H "X-Auth-Key: $CF_API_KEY" \
  -H "X-Auth-Email: $CF_EMAIL" \
  -H "Content-Type: application/json" | python3 -m json.tool | head -20
```

---

## Base URL & Headers

```bash
BASE="https://api.cloudflare.com/client/v4"

# API key auth (cfk_ prefix)
-H "X-Auth-Key: $CF_API_KEY"
-H "X-Auth-Email: $CF_EMAIL"

# OR token auth (Bearer — for scoped tokens)
-H "Authorization: Bearer $CF_API_TOKEN"

# Always needed
-H "Content-Type: application/json"
```

All responses are JSON. Successful responses have `"success": true`. Errors include `"errors": [...]` with `code` and `message`.

---

## Zones (Domain Management)

A **Zone** = one domain (e.g., `example.com`). Zone ID is the unique identifier for all DNS/Pages/SSL operations on that domain.

### List All Zones
```bash
curl -s -H "Authorization: Bearer $CF_API_TOKEN" \
     "https://api.cloudflare.com/client/v4/zones"
```

### Get One Zone by Name
```bash
curl -s -H "Authorization: Bearer $CF_API_TOKEN" \
     "https://api.cloudflare.com/client/v4/zones?name=example.com"
```

**Response:**
```json
{
  "result": [{
    "id": "your_zone_id_here",
    "name": "example.com",
    "status": "active",
    "paused": false,
    "type": "full"
  }]
}
```

### Zone Settings
```bash
# Get all zone settings
curl -s -H "Authorization: Bearer $CF_API_TOKEN" \
     "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings"
```

---

## DNS Records

### List DNS Records
```bash
ZONE_ID="your_zone_id_here"
curl -s -H "Authorization: Bearer $CF_API_TOKEN" \
     "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records"
```

### Create DNS Record
```bash
curl -s -X POST \
     -H "Authorization: Bearer $CF_API_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "type": "A",
       "name": "subdomain",
       "content": "192.0.2.1",
       "ttl": 3600,
       "proxied": true
     }' \
     "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records"
```

### Update DNS Record
```bash
# Get the record ID first
curl -s -H "Authorization: Bearer $CF_API_TOKEN" \
     "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records?name=subdomain.example.com"

# Update using the record ID
curl -s -X PUT \
     -H "Authorization: Bearer $CF_API_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "type": "A",
       "name": "subdomain",
       "content": "192.0.2.2",
       "ttl": 3600,
       "proxied": true
     }' \
     "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/RECORD_ID"
```

### Delete DNS Record
```bash
curl -s -X DELETE \
     -H "Authorization: Bearer $CF_API_TOKEN" \
     "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/RECORD_ID"
```

### DNS Record Types
| Type | Use Case | Notes |
|------|----------|-------|
| `A` | IPv4 address | `proxied: true` → goes through Cloudflare proxy (orange cloud) |
| `AAAA` | IPv6 address | Same as A |
| `CNAME` | Alias to another domain | Cannot be `proxied: true` on bare zone root for Cloudflare free tier |
| `MX` | Mail exchange | Priority number + mail server |
| `TXT` | Text records | SPF, DKIM, domain verification |
| `NS` | Nameserver delegation | Read-only |
| `SPF` | Sender policy | Deprecated in favor of TXT with SPF mechanism |

**Proxied vs DNS-Only:**
- `proxied: true` → Cloudflare proxies traffic (hides origin IP, adds CDN/WAF/cache)
- `proxied: false` → Plain DNS (bypasses Cloudflare)

For `CNAME` at zone root on free tier: `proxied: false` is required.

---

## Pages (Static Sites + Deployments)

### List Pages Projects
```bash
curl -s -H "Authorization: Bearer $CF_API_TOKEN" \
     "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects"
```

### Pages Project Deployment via wrangler (Python subprocess)

Wrangler can deploy to Cloudflare Pages without GitHub source using direct upload.
This works even when the Cloudflare GitHub app integration is broken or unconfigured.

**Requirements:**
- `npm install -g wrangler`
- Cloudflare global API key (`cfk_...`) + email + account ID

```python
import subprocess, os

env = os.environ.copy()
env["CLOUDFLARE_API_KEY"] = "cfk_YOUR_KEY"
env["CLOUDFLARE_EMAIL"] = "your-cloudflare-account-email@example.com"
env["CLOUDFLARE_ACCOUNT_ID"] = "YOUR_ACCOUNT_ID"

result = subprocess.run(
    ["wrangler", "pages", "deploy", "/path/to/dist", "--project-name", "my-project", "--commit-message", "Deploy"],
    env=env, capture_output=True, text=True, timeout=120
)
# result.stdout contains "✨ Deployment complete! Take a peek over at https://..."
```

**Key constraint:** Must pass all three vars as environment variables to `subprocess.run(env=)` — NOT via `--env-file` flag or `.env` file. Using explicit `env` dict is what makes it work.

**Create Pages project via wrangler (no GitHub required):**
```python
subprocess.run(
    ["wrangler", "pages", "project", "create", "my-project", "--production-branch", "main"],
    env=env, capture_output=True, text=True, timeout=30
)
```

**Create Pages project via REST API (no GitHub, for direct upload):**
```python
import requests
payload = {
    "name": "my-project",
    "build_config": {"build_command": "npm run build", "destination_dir": "dist"},
    "deployment_configs": {
        "preview": {"compatibility_date": "2024-01-01"},
        "production": {"compatibility_date": "2024-01-01"}
    },
    "production_branch": "main"
}
# Omit "source" field entirely — avoids GitHub integration requirement
requests.post(f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/pages/projects",
    headers={"X-Auth-Key": CF_KEY, "X-Auth-Email": CF_EMAIL, "Content-Type": "application/json"},
    json=payload, timeout=30
)
```

**GitHub source requires valid GitHub app installation** — if the account's Cloudflare GitHub app is broken (internal error), creating projects with `"source": {"type": "github", ...}` fails. Workaround: create without `source` field (direct upload only), then use `wrangler pages deploy` for each push.

### Trigger Deployment (REST — for GitHub-connected projects)
```bash
curl -s -X POST \
     -H "Authorization: Bearer $CF_API_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "branch": "main",
       "skip": false
     }' \
     "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects/PROJECT_NAME/deployments"
```

### Get Deployment Status
```bash
curl -s -H "Authorization: Bearer $CF_API_TOKEN" \
     "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects/PROJECT_NAME/deployments/DEPLOYMENT_ID"
```

### Custom Domain SSL (NOT achievable via DNS-only API token)
**IMPORTANT:** SSL certificate provisioning for custom domains (e.g., `www.example.com`) requires the Cloudflare Dashboard UI — **not achievable via API** with a DNS-only token. The API can manage DNS records but cannot provision the SSL certificate itself.

For custom SSL on a Pages project:
1. Go to Cloudflare Dashboard → Pages → `my-project` → Custom Domains
2. Add `www.example.com` and `example.com`
3. Cloudflare automatically provisions the SSL certificate
4. DNS records pointing to Pages must already exist (`CNAME www` → `my-project.pages.dev`)

---

## SSL/TLS Certificates

### Get Zone SSL Settings
```bash
curl -s -H "Authorization: Bearer $CF_API_TOKEN" \
     "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/ssl/settings"
```

### Set SSL Mode
```bash
curl -s -X PATCH \
     -H "Authorization: Bearer $CF_API_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"mode": "flexible"}' \
     "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/ssl/settings"
```

| Mode | Description |
|------|-------------|
| `off` | No SSL |
| `flexible` | Client → Cloudflare unencrypted, Cloudflare → origin can be encrypted or not |
| `full` | Client → CF encrypted, CF → origin encrypted (requires origin SSL cert) |
| `strict` | Like `full` but origin must have a valid Cloudflare-issued or CA cert |

---

## Workers & KV

### List Workers
```bash
curl -s -H "Authorization: Bearer $CF_API_TOKEN" \
     "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts"
```

### Deploy Worker
```bash
curl -s -X PUT \
     -H "Authorization: Bearer $CF_API_TOKEN" \
     -H "Content-Type: application/javascript" \
     --data "$(cat worker.js)" \
     "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/WORKER_NAME"
```

---

## Email Routing (Cloudflare)

Cloudflare Email Routing lets you forward email from addresses on your zone to external addresses — no mail server needed.

**API Base:** `https://api.cloudflare.com/client/v4/accounts/{account_id}/email/routing`

### Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/routing-rules` | List all routing rules |
| `POST` | `/routing-rules` | Create a routing rule |
| `DELETE` | `/routing-rules/{rule_id}` | Delete a rule |

### Create a Forwarding Rule
```bash
ACCOUNT_ID="your_account_id"   # Shown in Cloudflare Dashboard URL: dash.cloudflare.com/_accts/{ACCOUNT_ID}
TOKEN="$CF_API_TOKEN"

curl -s -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "info-forward",
    "priority": 1,
    "matchers": [
      {
        "type": "literal",
        "field": "to",
        "value": "info@example.com"
      }
    ],
    "actions": [
      {
        "type": "forward",
        "value": ["external@gmail.com"]
      }
    ]
  }' \
  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email/routing/routing-rules"
```

### Delete All Forwarding Rules (start clean)
```bash
# First list them
curl -s -H "Authorization: Bearer $TOKEN" \
  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email/routing/routing-rules" | \
  jq '.result[] | "Rule: \(.id) — \(.name)"'

# Delete by ID
curl -s -X DELETE \
  -H "Authorization: Bearer $TOKEN" \
  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email/routing/routing-rules/RULE_ID"
```

### Important Constraints
- **MX records must NOT be pointed to external registrars** — Cloudflare Email Routing requires Cloudflare to handle the MX records. Remove any external MX records before activating email routing.
- **Dashboard is simpler** — for most zones, the Cloudflare Dashboard UI at `dash.cloudflare.com → zone → Email → Email Routing` is the fastest path. The API is here for automation/scripted setup.
- **Destination must be verified** — Cloudflare sends a verification email to the destination before activating. Check spam and click the link.
- **Account ID required** — Unlike zone-scoped DNS APIs, Email Routing uses `account_id`, not `zone_id`. Find it in the Dashboard URL or via `GET /accounts` with a valid token.

### Workflow: Set Up Email Forwarding for a New Zone
1. Verify zone-scoped token has `Email Routing Settings: Edit` permission
2. Delete existing MX records pointing to external mail hosts
3. Create routing rule: `info@domain.com` → `external@gmail.com`
4. Cloudflare sends verification email to destination — click the link
5. Rule becomes active after destination verification

---

## Rate Limiting

Cloudflare API limits:
- **Default:** 1200 requests per 5 minutes (~4 req/sec)
- **Authenticated:** Higher limits with API tokens

When rate limited, response is `429 Too Many Requests`:
```json
{
  "success": false,
  "errors": [{
    "code": 10000,
    "message": "Rate limit exceeded"
  }]
}
```

**Handling in scripts:**
```bash
# Check rate limit headers in response
X-RateLimit-Limit: 1200
X-RateLimit-Remaining: 1195
X-RateLimit-Reset: 1640000000
```

---

## Error Handling

**Common Error Codes:**

| Code | Meaning | Fix |
|------|---------|-----|
| `1000` | Authentication failed | Check API token/key |
| `1001` | DNS record not found | Verify record ID |
| `1002` | Zone not found | Check zone ID |
| `1003` | Invalid DNS record type | Use valid type (A, CNAME, etc.) |
| `1004` | DNS record already exists | Use update (PUT) instead of create |
| `1009` | Wrong API token type | Token needs `Zone:DNS:Edit` permission |
| `1010` | Mismatched SSL certificate | Certificate doesn't match domain |
| `1017` | Zone is paused | Unpause zone in dashboard |

**Always check `"success": true`:**
```bash
result=$(curl -s ...)
if echo "$result" | jq -e '.success' | grep -q true; then
    echo "Success: $(echo "$result" | jq '.result')"
else
    echo "Error: $(echo "$result" | jq '.errors')"
fi
```

---

## GraphQL Analytics

Cloudflare provides a GraphQL API for analytics (not the same as the REST v4 API):

```bash
curl -s -X POST \
     -H "Authorization: Bearer $CF_API_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "query": "query { viewer { zones(filter: {zoneTag: \"ZONE_ID\"}) { httpRequests1dGroups(orderBy: [date_DESC], limit: 5) { date { date }, sum: requests } } } }"
     }' \
     "https://api.cloudflare.com/graphql/gateway"
```

---

## Common Workflows

### Full DNS Setup for a New Subdomain

```bash
ZONE_ID="your_zone_id_here"
TOKEN="$CF_API_TOKEN"

# 1. Verify zone exists
curl -s -H "Authorization: Bearer $TOKEN" \
     "https://api.cloudflare.com/client/v4/zones?name=example.com" | \
     jq '.result[0].id'

# 2. Create A record pointing to an IP
curl -s -X POST \
     -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"type":"A","name":"api","content":"192.0.2.1","ttl":3600,"proxied":false}' \
     "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" | \
     jq '.result.id'

# 3. Verify propagation (check after 5-30 min)
dig +short api.example.com
```

### Update Pages Deployment DNS (CNAME to Pages)

```bash
ZONE_ID="your_zone_id_here"
TOKEN="$CF_API_TOKEN"

# Create or update CNAME for www → pages.dev
# If record exists, must use PUT with record ID
# First check if it exists
curl -s -H "Authorization: Bearer $TOKEN" \
     "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records?type=CNAME&name=www" | \
     jq '.result'
```

### Rotate API Token

Tokens expire or need rotation. To rotate:
1. Cloudflare Dashboard → Profile → API Tokens
2. Create new token with same permissions
3. Update environment variable
4. Verify old token is deleted

---

## Pagination

For endpoints returning lists, Cloudflare uses cursor-based pagination:

```bash
# First page
curl -s -H "Authorization: Bearer $TOKEN" \
     "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records?per_page=100"

# Next page (uses cursor from previous response)
curl -s -H "Authorization: Bearer $TOKEN" \
     "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records?per_page=100&cursor=next_page_cursor"
```

Response includes:
```json
{
  "result_info": {
    "page": 1,
    "per_page": 100,
    "total_pages": 2,
    "count": 100,
    "cursor": "next_cursor",
    "next_cursor": "..."
  }
}
```

---

## Python Pattern (for scripts)

```python
import os
import requests

# API key auth — global key pattern
CF_API_KEY = os.environ.get("CLOUDFLARE_GLOBAL_API", "cfk_your_global_key_here")
CF_EMAIL = os.environ.get("CLOUDFLARE_EMAIL", "your-cloudflare-account-email@example.com")
BASE = "https://api.cloudflare.com/client/v4"
ZONE_ID = "your_zone_id_here"

HEADERS_API_KEY = {
    "X-Auth-Key": CF_API_KEY,
    "X-Auth-Email": CF_EMAIL,
    "Content-Type": "application/json"
}

HEADERS_TOKEN = {
    "Authorization": f"Bearer {os.environ.get('CF_API_TOKEN')}",
    "Content-Type": "application/json"
}

HEADERS = HEADERS_API_KEY  # use this unless using a scoped token


def cf_get(path: str) -> dict:
    resp = requests.get(f"{BASE}{path}", headers=HEADERS, timeout=30)
    data = resp.json()
    if not data.get("success"):
        raise Exception(f"Cloudflare API error: {data.get('errors')}")
    return data.get("result", [])


def cf_post(path: str, payload: dict) -> dict:
    resp = requests.post(f"{BASE}{path}", headers=HEADERS, json=payload, timeout=30)
    data = resp.json()
    if not data.get("success"):
        raise Exception(f"Cloudflare API error: {data.get('errors')}")
    return data.get("result")


def cf_put(path: str, payload: dict) -> dict:
    resp = requests.put(f"{BASE}{path}", headers=HEADERS, json=payload, timeout=30)
    data = resp.json()
    if not data.get("success"):
        raise Exception(f"Cloudflare API error: {data.get('errors')}")
    return data.get("result")


def cf_delete(path: str) -> bool:
    resp = requests.delete(f"{BASE}{path}", headers=HEADERS, timeout=30)
    data = resp.json()
    if not data.get("success"):
        raise Exception(f"Cloudflare API error: {data.get('errors')}")
    return True


# Example: list all DNS records
records = cf_get(f"/zones/{ZONE_ID}/dns_records")
for r in records:
    print(f"[{r['type']}] {r['name']} → {r['content']} (proxied={r['proxied']})")
```

**Auth summary:** `cfk_` prefix keys use `X-Auth-Key` + `X-Auth-Email`. Scoped tokens use `Authorization: Bearer`. Never mix them.

---

## Key Pitfalls

1. **Global key vs scoped token** — `CLOUDFLARE_GLOBAL_API` (cfk_...) is a full global key and works for all endpoints (DNS, Pages, Workers, Email Routing). Scoped tokens (from dashboard) are permission-limited — if you get `1009 Wrong API token type`, the scoped token lacks that permission. For full access, use the global key.

2. **Wrangler `pages deploy` env dict pattern** — when calling `wrangler pages deploy` via Python `subprocess.run()`, pass all three credentials via explicit `env=os.environ.copy()` with `CLOUDFLARE_API_KEY` (the global `cfk_...` key), `CLOUDFLARE_EMAIL`, and `CLOUDFLARE_ACCOUNT_ID` set. Wrangler v4 (tested with 4.95.0) reads these from the env dict, NOT from `.env` files or `--env-file` flags. Without passing all three in the env dict, wrangler returns `Not logged in`. The `--yes` flag does NOT bypass auth.

   ```python
   env = os.environ.copy()
   env["CLOUDFLARE_API_KEY"] = "cfk_YOUR_KEY"
   env["CLOUDFLARE_EMAIL"] = "your-cloudflare-account-email@example.com"
   env["CLOUDFLARE_ACCOUNT_ID"] = "YOUR_ACCOUNT_ID"
   subprocess.run(
       ["npx", "wrangler", "pages", "deploy", dist, "--project-name", project, "--commit-message", "msg"],
       env=env, capture_output=True, text=True, timeout=120
   )
   ```

3. **Astro image path mismatch breaks images silently** — if `<img src="/images/foo.jpg">` but the file is at `public/foo.jpg` (no `/images/` subdir), Astro copies nothing to `dist/` and the browser gets a 404. See `references/astro-multi-site-qa.md` for the full diagnosis and fix patterns.

4. **Unsplash hotlinks fail in deployed frontmatter** — URLs like `https://images.unsplash.com/photo-...?w=600` embedded in Astro JS frontmatter variables work in dev but 404 in production if the photo is removed or hotlink blocking triggers. Always download and serve locally.

5. **Email Routing needs Account ID, not Zone ID** — All Email Routing endpoints are under `/accounts/{account_id}/email/routing`, not `/zones/{zone_id}/`. Find the account ID in the Cloudflare Dashboard URL (`dash.cloudflare.com/_accts/{ACCOUNT_ID}`) or call `GET /accounts` with a valid token.

6. **MX records from external registrars conflict with Cloudflare Email Routing** — If the domain is registered elsewhere and has MX records pointing to external forwarding servers, Cloudflare Email Routing cannot activate. Delete those MX records first via the DNS API.

7. **CNAME at zone root** — Cannot proxied on free tier. Must use `proxied: false` for zone-root CNAME records.

8. **SSL for custom domains** — Cannot be done via API. Must use Dashboard UI to add custom domains to Pages.

9. **Token permissions** — If you get `1009: Wrong API token type`, the token doesn't have the required permission for that endpoint. Re-create the token with the correct permission template.

10. **TTL 1 = auto** — Setting `"ttl": 1` means "auto" (Cloudflare manages TTL). Setting a number is the TTL in seconds.

11. **Proxied hides origin IP** — With `proxied: true`, your origin server IP is hidden. With `proxied: false`, the actual IP is visible in DNS lookups.

12. **Token expiry** — A global key (format `cfk_...`) is a legacy key, not a scoped token. It does not expire unless manually revoked at dash.cloudflare.com/profile/api-tokens. If API calls return `9103 Unknown X-Auth-Key or X-Auth-Email`, the email address is wrong — verify it matches the Cloudflare account email.
