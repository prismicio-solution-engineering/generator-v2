import { extractFirstCodeBlock } from "@/guidelines/extractFirstCodeBlock"
import { generateComponent } from "@/guidelines/genComp"
import path from "path";

export const maxDuration = 300;

export async function POST(request: Request) {
    path.resolve("./guidelines")
    const res = await request.json()
    const component = await generateComponent(res.prompt,res.brand)
    return Response.json({component:extractFirstCodeBlock(component)})
  }