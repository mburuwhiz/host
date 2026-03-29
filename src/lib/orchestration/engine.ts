/**
 * TWOEM PaaS Orchestration Engine Scaffolding
 *
 * This file outlines the core orchestration logic required to build and deploy
 * applications natively on a host machine using Docker and Cloudflare/Nginx.
 *
 * NOTE: For production execution, the system must either execute shell commands
 * directly via Node's `child_process.exec` (requiring Docker to be installed on the host)
 * or via the Docker Remote API.
 */

import { exec } from "child_process";
import util from "util";

const execAsync = util.promisify(exec);

export type AppConfig = {
    appName: string;
    repoUrl: string;
    branch: string;
    language: "html" | "node" | "docker";
    envVars: Record<string, string>;
};

/**
 * Step 1: Clone the repository
 * This clones the specific branch of the user's repository into a temporary build directory.
 */
export async function cloneRepository(config: AppConfig) {
    const buildPath = `/tmp/twoem_builds/${config.appName}`;
    await execAsync(`rm -rf ${buildPath} && mkdir -p ${buildPath}`);
    await execAsync(`git clone -b ${config.branch} --single-branch ${config.repoUrl} ${buildPath}`);
    return buildPath;
}

/**
 * Step 2: Generate Dockerfile dynamically based on the framework
 */
export async function generateDockerfile(buildPath: string, language: AppConfig["language"]) {
    let dockerfileContent = "";

    if (language === "html") {
        dockerfileContent = `
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
        `;
    } else if (language === "node") {
        dockerfileContent = `
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
        `;
    } else {
        // If 'docker', we assume the repo already has a Dockerfile
        return;
    }

    await execAsync(`echo "${dockerfileContent}" > ${buildPath}/Dockerfile`);
}

/**
 * Step 3: Build the Docker Image
 */
export async function buildImage(config: AppConfig, buildPath: string) {
    const imageName = `twoem-${config.appName}:latest`;
    await execAsync(`docker build -t ${imageName} ${buildPath}`);
    return imageName;
}

/**
 * Step 4: Run the Container & Assign Port
 * In a real scenario, you'd track available ports in the DB (e.g., 8000-9000).
 */
export async function startContainer(config: AppConfig, imageName: string) {
    // Example: Dynamically assign a port, or let Docker do it and extract it
    const assignedPort = Math.floor(Math.random() * (9000 - 8000 + 1) + 8000);

    // Inject environment variables into the docker run command
    const envString = Object.entries(config.envVars)
        .map(([k, v]) => `-e ${k}="${v}"`)
        .join(" ");

    const containerName = `twoem_app_${config.appName}`;

    // Ensure old container is removed
    await execAsync(`docker rm -f ${containerName} || true`);

    // Run new container
    await execAsync(`docker run -d --name ${containerName} -p ${assignedPort}:80 ${envString} ${imageName}`);

    return assignedPort;
}

/**
 * Step 5: Configure Reverse Proxy (Cloudflare / Nginx)
 * Since the user has configured their domain in Cloudflare, we can use `cloudflared` to tunnel
 * the specific localhost port to `appname.whizpoint.app`.
 */
export async function configureRouting(config: AppConfig, localPort: number) {
    const domain = `${config.appName}.whizpoint.app`;

    // Option A: If using a generic NGINX proxy on the host:
    /*
    const nginxConfig = `
    server {
        listen 80;
        server_name ${domain};
        location / {
            proxy_pass http://127.0.0.1:${localPort};
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }`;
    await execAsync(`echo "${nginxConfig}" > /etc/nginx/sites-enabled/${config.appName}`);
    await execAsync(`systemctl reload nginx`);
    */

    // Option B: If using Cloudflare Tunnels (cloudflared ingress rules)
    // You would programmatically add the rule to your `config.yml` or use Cloudflare API
    console.log(`[ORCHESTRATOR] Routing configured for ${domain} -> http://localhost:${localPort}`);
    return domain;
}

/**
 * Step 6: Cascade Teardown
 * When an App or User is deleted, this stops the container, removes the image, and deletes routing.
 */
export async function destroyAppResources(appName: string) {
    try {
        const containerName = `twoem_app_${appName}`;
        const imageName = `twoem-${appName}:latest`;

        await execAsync(`docker rm -f ${containerName}`);
        await execAsync(`docker rmi -f ${imageName}`);

        // Remove Nginx config / Cloudflare rule
        // await execAsync(`rm -f /etc/nginx/sites-enabled/${appName} && systemctl reload nginx`);

        console.log(`[ORCHESTRATOR] Successfully destroyed resources for ${appName}`);
    } catch (e) {
        console.error(`[ORCHESTRATOR] Failed to cleanup resources for ${appName}:`, e);
    }
}
