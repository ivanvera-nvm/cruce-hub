import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

import { handleMcpRequest } from "@/utils/mcp-handler";

const server = new McpServer({
	name: "cruce-hub-mcp",
	version: "0.1.0",
});

server.registerTool(
	"ping",
	{
		title: "Health check",
		description: "Retorna un estado simple para validar conectividad MCP",
		inputSchema: {
			message: z.string().optional().describe("Mensaje opcional"),
		},
	},
	({ message }) => ({
		content: [
			{
				type: "text",
				text: message ? `pong: ${message}` : "pong",
			},
		],
	}),
);

export const Route = createFileRoute("/mcp")({
	server: {
		handlers: {
			POST: async ({ request }) => handleMcpRequest(request, server),
		},
	},
});
