import { SELF } from "cloudflare:test";
import { describe, expect, it } from "vitest";

const publicPages = [
	["/", "Suraj Dhere — Software Engineer &amp; AI Developer"],
	["/portfolio", "Portfolio — Suraj"],
	["/personal", "Personal — Suraj"],
	["/instagram", "Instagram — Suraj"],
	["/vneuron", "V-NEURON - Multimodal Routing Console"],
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

	it("supports API CORS preflight", async () => {
		const response = await SELF.fetch("http://example.com/api/projects", {
			method: "OPTIONS",
		});

		expect(response.status).toBe(200);
		expect(response.headers.get("Access-Control-Allow-Methods")).toContain("POST");
	});
});