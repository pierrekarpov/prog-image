# Pencil Policy Server [![Build Status](https://bob.trypencil.com/buildStatus/icon?job=policy-server)](https://bob.trypencil.com/job/policy-server/)

### App Structure

```bash
/src
  /controllers
  /db # db anddata models
  /enums
  /tmp # to store files locally
  /utils # helper functions
/test
  /unit # unit tests
app.js # express app
index.js # server entry point
```

### Migrations

- sequelize-cli is used to manage db schema migrations
- Apply migrations `env-cmd -f ./.env npx sequelize db:migrate `
- Rollback `env-cmd -f ./.env npx sequelize db:migrate:undo`
- Creating migration `env-cmd -f ./.env npx sequelize migration:generate --name xxxxx`

### Development

- Install dependencies `yarn`
- Duplicate `.env.example` as `.env`
- run `npm install -g env-cmd`
- Update env vars in `.env`
- Start services `env-cmd -f ./.env yarn dev `


### Testing
- Start services `env-cmd -f ./.env yarn test `


### API Diagram

```mermaid
sequenceDiagram
participant FE as Frontend
participant BE as Backend
participant CL as Cloud Provider

Note left of FE: Upload images
Note left of FE: POST /api/image/uplaod
Note left of FE: params:<br>{images: [{"data": "...", "type": "url"/"base64", "format_type": "png"}]}
FE->>BE: POST /api/image/upload
BE->>BE: create media
BE->>FE: 200: success: {"images": [{"id": 289}]}
BE->>CL: upload
BE->>BE: generate other formats 
BE->>BE: mark media as ready


Note left of FE: Get image
Note left of FE: Get /api/image/1?ext=png
FE->>BE: /api/image/1?ext=png
BE->>BE: Get media based on id
alt no ext query
    BE->>FE: 200: return media
else
BE->>BE: Get media media set
BE->>BE: Get media in media set with correct extention
BE->>FE: 200: return media
end

```
