FROM node:24-slim AS base

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-workspace.yaml turbo.json ./

COPY apps/socket-server/package.json ./apps/socket-server/package.json
COPY packages/common-zod/package.json ./packages/common-zod/package.json
COPY packages/eslint-config/package.json ./packages/eslint-config/package.json
COPY packages/postgres-db/package.json ./packages/postgres-db/package.json
COPY packages/tailwind-config/package.json ./packages/tailwind-config/package.json
COPY packages/typescript-config/package.json ./packages/typescript-config/package.json
COPY packages/ui/package.json ./packages/ui/package.json

COPY pnpm-lock.yaml* ./

RUN pnpm install

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