import { DustAPI } from "@dust-tt/client";

const dustAPI = new DustAPI(
  {
    url: "https://eu.dust.tt",
  },
  {
    workspaceId: process.env.DUST_WORKSPACE_ID!,
    apiKey: process.env.DUST_API_KEY!,
  },
  console
);


  export async function GET(
    req: Request,
    { params }: { params: { conversationId: string } }
  ) {
    try {
      const result = await dustAPI.getConversation({
        conversationId: params.conversationId,
      });
  
      if (result.isErr()) {
        return new Response(`Error: ${result.error.message}`, { status: 500 });
      }
  
      return new Response(JSON.stringify(result.value), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Failed to get conversation"  }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
