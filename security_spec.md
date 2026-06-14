# Security Specification for DKM Masjid MAAR3 Firestore

This specification defines the Attribute-Based Access Control (ABAC) and Zero-Trust policies for the DKM Masjid MAAR3 Firestore database.

## 1. Data Invariants

1. **Public Collections (Read-Only to Guests, Write-Only to Admin)**
   - Articles (`/artikel/{id}`), Kegiatan (`/kegiatan/{id}`), Kajian (`/kajian/{id}`), Galeri (`/galeri/{id}`), Pengurus (`/pengurus/{id}`), UMKM (`/umkm/{id}`), and configurations (`/config/{id}`) can be read by anyone (guest/visitor).
   - Only authorized administrators (verified email: `saylhendra@gmail.com`) can create, update, or delete entries in these collections.

2. **Donation Collections (Writable by Guests, under guidelines)**
   - Donors (`/donors/{id}`) can be created by anyone to allow open-participatory virtual infaq simulations.
   - Campaigns (`/campaigns/{id}`) can have their accumulated `raised` fund and `donorsCount` updated by visitors when a donation is successfully processed.

## 2. The "Dirty Dozen" Payloads (Vulnerability Scenarios)

1. **Malicious Article Deletion (Identity Attack)**: Unauthenticated visitor attempts to delete an article.
2. **Ghost Field in Hijriah Calendar (Shadow Update)**: Attacker attempts to update an article with extra fields, e.g. `isAdmin: true`.
3. **Privilege Escalation via UMKM (Privilege Abuse)**: Guest visitor attempts to create a new UMKM listing pretending to be an administrator.
4. **Incorrect Data-Type Injection (Value Poisoning)**: Attacker attempts to set the `likes` of an article to the string `"one million"`.
5. **Denial of Wallet String Poisoning (Resource Exhaustion)**: Injecting a 2MB string into `id` or string fields of a document.
6. **Campaign Zeroing (State Shortcutting)**: Attacker attempts to decrease the `raised` amount of a community project toward zero.
7. **Negative Infaq Values (Financial Fraud)**: Visitor attempts to submit a negative donation amount (`-1,000,000 IDR`).
8. **Impersonating Board Member (Integrity Spoofing)**: Guest attempts to edit the board of directors (`pengurus`) list to insert themselves as Vice Chairman.
9. **Spamming Configurations (Config Hijacking)**: Attacker attempts to redirect the mosque's profile video stream to a phishing link by altering `/config/app`.
10. **Orphaned Donor Insert (Relational Sync)**: Attempt to insert a donor record with a reference to a non-existent campaign ID.
11. **Client-Assigned Timestamp (Temporal Integrity)**: Attacker sets the `date` of a donor transaction to a custom spoofed time in the future.
12. **Blanket Query Scraping (Secure List)**: Guest attempting to query secure system files if created.

## 3. Test Cases (Summary)

All of the above payloads are evaluated against the ruleset with standard Firestore unit tests, ensuring `PERMISSION_DENIED` is triggered for all unauthorized modifications.
