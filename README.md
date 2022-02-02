## Sub community server setup

- Create new Discord server
- Server settings > Roles > Create Role
  - name: member
- Create text channel
  - name: members-only
  - Private Channel: true
  - Roles:
    - member
- Invite bot (using invite url)
- Server settings > Roles > Move bot's role to the top of the list

## Setup

### Verification agent dependencies

```bash
yarn add @veramo/core @veramo/did-resolver did-resolver did-resolver ethr-did-resolver web-did-resolver @veramo/message-handler @veramo/did-jwt @veramo/url-handler @veramo/credential-w3c
```

### Issuance agent dependencies

```bash
yarn add @veramo/did-manager @veramo/did-provider-ethr @veramo/key-manager @veramo/kms-local @veramo/data-store sqlite3 typeorm@0.2.38
```