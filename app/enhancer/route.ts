import { extractFirstCodeBlock } from "@/guidelines/extractFirstCodeBlock"
import { enhanceComponent } from "@/guidelines/genComp"
import path from "path";

export const maxDuration = 300;

export async function POST(request: Request) {
    path.resolve("./guidelines")
    const res = await request.json()
    const componentInMarkdown = "```jsx\n" + res.component + "\n```"
    const component = await enhanceComponent(res.prompt,res.brand,componentInMarkdown,res.enhancement)
    return Response.json({component:extractFirstCodeBlock(component)})
  }