
# TWOEM PaaS Engine: Comprehensive Backend & Orchestration Specification

This document serves as the absolute source of truth for the TWOEM PaaS Engine backend implementation. It covers data structures, security protocols, orchestration workflows, and communication logic.

---

## 1. Authentication & Identity Management

### 1.1 User Architecture (`/users/{uid}`)
- **Security Standard**: Argon2id hashing for email/password.
- **Provider Support**: GitHub OAuth (primary), Google OAuth (secondary).
- **Core Properties**:
    - `uid`: Unique identifier from Firebase Auth.
    - `role`: `SuperAdmin` (God Mode) or `StandardUser`.
    - `primaryLanguage`: User's preferred dev language (for AI hints).
    - `complianceAccepted`: Boolean (legal requirement).
    - `phone`: Kenya-formatted (+254).

### 1.2 Password Recovery Logic
- **Forgot Password**: Trigger encrypted token generation sent via SendGrid/Mailgun.
- **Reset Token**: 1-hour TTL, stored in `/resetTokens/{tokenId}` with associated user email.
- **Email UI**: Must use TWOEM Brand Template (Emerald header, high-contrast CTA button, monospace signature).

---

## 2. Team & Organization Logic (`/teams/{teamId}`)

### 2.1 Multi-Tenancy
- **RBAC Roles**: 
    - `Owner`: Billing access, team deletion, role reassignment.
    - `Developer`: Full app management (build/deploy/config).
    - `Viewer`: Read-only metrics and logs.
- **Audit Logs**: Every mutation recorded in `/teams/{teamId}/auditLogs`.

### 2.2 Billing & Quotas
- **Infrastructure**: Tied to Stripe Customer ID.
- **Partition Logic**: Each team is allocated a logical slice of the 2.5TB NVMe storage pool.
- **Enforcement**: Build processes fail if the team's byte-count exceeds the reserved quota.

---

## 3. Application Orchestration (`/apps/{appId}`)

### 3.1 The "Triple-Save" Environment System
1. **The Vault**: Encrypted variables stored in Firestore using AES-256 (Master-Key held in ephemeral builder memory).
2. **Graceful Reload**: Non-system vars (e.g. `LOG_LEVEL`) trigger a `SIGHUP` to the running container.
3. **Atomic Rebuild**: Core vars (e.g. `BASE_URL`) trigger a full Blue-Green swap to ensure environment consistency.

### 3.2 Blue-Green Deployment Strategy
1. **Build Node**: Spin up ephemeral Ubuntu container.
2. **Isolation**: Cgroups limits (RAM/CPU) enforced at instantiation.
3. **Health Check**: Service must return 200 OK on designated path before swap.
4. **Traffic Transition**: Traefik dynamic config updated; old container remains for 60s cooldown before pruning.

### 3.3 Web Terminal (Secure TTY)
- **Architecture**: Xterm.js front-end connected to a secure WebSocket proxy.
- **Audit**: All keystrokes recorded for L5 Security compliance.

---

## 4. Networking & Edge Routing

### 4.1 Custom Domains
- **Verification**: User adds CNAME to `ingress.twoem.app`.
- **SSL Lifecycle**: Automated Let's Encrypt `tlsChallenge` via Traefik.
- **HSTS**: Enforced platform-wide for all production endpoints.

---

## 5. Support & FAQ System

### 5.1 Ticket Lifecycle
- **Submission**: User posts via `/faq` or Dashboard.
- **ID Generation**: `T-{RANDOM_8_HEX}`.
- **Admin Reply**: Admin responds via `/admin/support`. 
- **Notification Logic**:
    - If the question was previously answered: Automated link to Knowledge Base sent.
    - If new: Human response triggers a dual update (Firestore & Email).
- **Email UI**: Monospace ticket ID in the subject line; "Architect Response" branding.

---

## 6. Admin "God Mode" Global Controls

### 6.1 Infrastructure Dashboard
- **Node Monitoring**: Real-time heartbeat from physical nodes (01-04).
- **Global Storage Audit**: Pruning logic for orphaned build caches.
- **Impersonation**: SuperAdmins can generate a temporary JWT to view a user's dashboard for support (Audit logged).

### 6.2 Platform Governance
- **Kill Switch**: Ability to pause all builds globally during cluster maintenance.
- **Rate Limits**: Global API threshold adjustments.
