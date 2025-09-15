FROM node:24-slim AS base

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

COPY apps/socket-server/package.json ./apps/socket-server/package.json
COPY packages/*/package.json ./packages/*/

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm db:generate
RUN pnpm build --filter=socket-server

FROM node:24-slim AS production

WORKDIR /app

RUN npm install -g pnpm

COPY --from=base /app/apps/socket-server/dist ./apps/socket-server/dist
COPY --from=base /app/apps/socket-server/package.json ./apps/socket-server/package.json
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/packages ./packages

WORKDIR /app/apps/socket-server

EXPOSE 3002

CMD ["pnpm", "start"]