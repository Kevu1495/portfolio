import { createServer } from 'vite';
const server = await createServer({
  configFile: false,
  server: { middlewareMode: true },
  optimizeDeps: { noDiscovery: true },
  logLevel: 'error',
});
try {
  const { identity, experiences, education, credentials, skillGroups, projects } =
    await server.ssrLoadModule('/src/content/portfolio.ts');
  process.stdout.write(
    JSON.stringify({
      identity,
      experiences,
      education,
      credentials,
      skillGroups,
      medleaf: projects.find((project) => project.slug === 'medleaf'),
    }),
  );
} finally {
  await server.close();
}
