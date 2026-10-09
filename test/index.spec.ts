import { env, SELF } from "cloudflare:test";
import { beforeAll, describe, expect, it } from "vitest";
import schemaSql from "../schema.sql?raw";

const publicPages = [
	["/", "Suraj Dhere — Software Engineer &amp; AI Developer"],
	["/admin", "Suraj Dhere — Software Engineer &amp; AI Developer"],
	["/portfolio", "Portfolio — Suraj"],
	["/personal", "Personal — Suraj"],
	["/instagram", "Instagram — Suraj"],
	["/vneuron", "V-NEURON - Multimodal Routing Console"],
	["/projects/vneuron", "V-NEURON - Multimodal Routing Console"],
];

describe("public page routes", () => {
	it.each(publicPages)("serves %s", async (path, title) => {
		const response = await SELF.fetch(`http://example.com${path}`);

		expect(response.status).toBe(200);
		expect(response.headers.get("content-type")).toContain("text/html");
		expect(await response.text()).toContain(`<title>${title}</title>`);
	});
});

describe("API route guards", () => {
	it("returns 404 for an unknown route", async () => {
		const response = await SELF.fetch("http://example.com/not-a-page");

		expect(response.status).toBe(404);
	});

	it("rejects unauthenticated project mutations", async () => {
		const response = await SELF.fetch("http://example.com/api/projects", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name: "Test", status: "Active" }),
		});

		expect(response.status).toBe(401);
	});

	it("rejects unauthenticated profile changes", async () => {
		const response = await SELF.fetch("http://example.com/api/settings", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ display_name: "Test" }),
		});

		expect(response.status).toBe(401);
	});

	it("rejects unauthenticated admin stats requests", async () => {
		const response = await SELF.fetch("http://example.com/api/admin/stats");

		expect(response.status).toBe(401);
	});

	it("supports API CORS preflight", async () => {
		const response = await SELF.fetch("http://example.com/api/projects", {
			method: "OPTIONS",
		});

		expect(response.status).toBe(200);
		expect(response.headers.get("Access-Control-Allow-Methods")).toContain("POST");
	});
});

describe("API data and authentication", () => {
	beforeAll(async () => {
		// Clean SQL comments and split by semicolon
		const cleanSql = schemaSql.replace(/--.*$/gm, "");
		const statements = cleanSql
			.split(";")
			.map((s) => s.trim())
			.filter((s) => s.length > 0);

		for (const statement of statements) {
			await env.SUNDB.prepare(statement).run();
		}
	});

	it("authenticates valid ADMIN_KEY and rejects invalid", async () => {
		const validRes = await SELF.fetch("http://example.com/api/auth", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ password: "test-secret-key" }),
		});
		expect(validRes.status).toBe(200);
		const validData = (await validRes.json()) as { authenticated: boolean };
		expect(validData.authenticated).toBe(true);

		const invalidRes = await SELF.fetch("http://example.com/api/auth", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ password: "wrong-password" }),
		});
		expect(invalidRes.status).toBe(401);
	});

	it("serves site settings with defaults", async () => {
		const res = await SELF.fetch("http://example.com/api/settings");
		expect(res.status).toBe(200);
		const data = (await res.json()) as Record<string, string>;
		expect(data.display_name).toBeDefined();
		expect(data.role).toBeDefined();
		expect(data.intro).toBeDefined();
		expect(data.location).toBeDefined();
	});

	it("serves projects list", async () => {
		const res = await SELF.fetch("http://example.com/api/projects");
		expect(res.status).toBe(200);
		const data = (await res.json()) as Array<{ id: number; name: string }>;
		expect(Array.isArray(data)).toBe(true);
	});

	it("serves admin stats when authenticated", async () => {
		const res = await SELF.fetch("http://example.com/api/admin/stats", {
			headers: { Authorization: "Bearer test-secret-key" },
		});
		expect(res.status).toBe(200);
		const data = (await res.json()) as { projects: number; posts: number; links: number };
		expect(data.projects).toBeDefined();
		expect(data.posts).toBeDefined();
		expect(data.links).toBeDefined();
	});

	it("allows authenticated profile updates and persists them", async () => {
		const updateRes = await SELF.fetch("http://example.com/api/settings", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer test-secret-key",
			},
			body: JSON.stringify({
				display_name: "Suraj Dhere Updated",
				role: "Staff AI Engineer",
				curiosities: "Edge computing, LLM Runtimes",
			}),
		});
		expect(updateRes.status).toBe(200);

		const getRes = await SELF.fetch("http://example.com/api/settings");
		const data = (await getRes.json()) as Record<string, string>;
		expect(data.display_name).toBe("Suraj Dhere Updated");
		expect(data.role).toBe("Staff AI Engineer");
		expect(data.curiosities).toBe("Edge computing, LLM Runtimes");
	});

	it("allows authenticated project creation with full metadata", async () => {
		const createRes = await SELF.fetch("http://example.com/api/projects", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer test-secret-key",
			},
			body: JSON.stringify({
				name: "V-Agent Studio",
				status: "Active",
				category: "AUTONOMOUS AGENTS",
				summary: "An autonomous agent orchestrator running on Cloudflare Workers.",
				tech_tags: "TypeScript,Workers,Agents",
				live_url: "https://github.com/Suraj-8300/v-agent",
				action_label: "Launch Studio",
				action_url: "https://v-agent.pages.dev",
				pinned: 1,
			}),
		});
		expect(createRes.status).toBe(201);

		const getRes = await SELF.fetch("http://example.com/api/projects");
		const projects = (await getRes.json()) as Array<{ name: string; category: string; summary: string }>;
		const created = projects.find((p) => p.name === "V-Agent Studio");
		expect(created).toBeDefined();
		expect(created?.category).toBe("AUTONOMOUS AGENTS");
		expect(created?.summary).toBe("An autonomous agent orchestrator running on Cloudflare Workers.");
	});
});