FROM node:24-slim AS base

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

COPY apps/server/package.json ./apps/server/package.json
COPY packages/*/package.json ./packages/*/

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm db:generate
RUN pnpm build --filter=server

FROM node:24-slim AS production

WORKDIR /app

RUN npm install -g pnpm

COPY --from=base /app/apps/server/dist ./apps/server/dist
COPY --from=base /app/apps/server/package.json ./apps/server/package.json
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/packages ./packages

WORKDIR /app/apps/server

EXPOSE 3001

CMD ["pnpm", "start"]