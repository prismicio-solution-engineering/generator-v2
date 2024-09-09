import { extractFirstCodeBlock } from "@/guidelines/extractFirstCodeBlock"
import { generateModel, generateSliceComponent } from "@/guidelines/genComp"
import path from "path";

export const maxDuration = 300;

export async function POST(request: Request) {
  path.resolve("./guidelines")
  const res = await request.json()
  const model = await generateModel(res.prompt, res.component)
  const sliceComponent = await generateSliceComponent(res.prompt, res.component, model)
  return Response.json({ model: extractFirstCodeBlock(model), sliceComponent: extractFirstCodeBlock(sliceComponent) })
}