import { OpenAI } from "openai";
import { readFileSynchronously } from "./fileUtils";
import 'dotenv/config'

const openai = new OpenAI({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});


//const brandGuidelines = readFileSynchronously("./guidelines/brandGuidelines.txt")
const formattingGuidelines = readFileSynchronously(process.cwd() + "/guidelines/formattingGuidelines.txt")
const task = readFileSynchronously(process.cwd() + "/guidelines/task.txt")
const enhancementTask = readFileSynchronously(process.cwd() + "/guidelines/enhancementTask.txt")
const taskModel = readFileSynchronously(process.cwd() + "/guidelines/taskModel.txt")
const formattingGuidelinesModel = readFileSynchronously(process.cwd() + "/guidelines/formattingGuidelinesModel.txt")
const taskSliceComponent = readFileSynchronously(process.cwd() + "/guidelines/taskSliceComponent.txt")
const formattingGuidelinesSliceComponent = readFileSynchronously(process.cwd() + "/guidelines/formattingGuidelinesSliceComponent.txt")

export async function generateComponent(prompt: { name: string, description: string }, brand: { websiteDescription: string, font: string, colors: string, additionalDetails: string }) {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: task + formattingGuidelines},
      { role: "user", content: "Website Description: \n" + brand.websiteDescription + "Brand guidelines: \n" + "colors: " + brand.colors + "\nfont : " + brand.font + "\n" + brand.additionalDetails + prompt.description }
    ],
    model: "gpt-4-1106-preview",
  });

  return completion.choices[0].message.content!;
}


export async function generateModel(prompt: { name: string, description: string }, component: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: taskModel + formattingGuidelinesModel },
      { role: "user", content: "this is the component for the " + prompt.name + " : " + component + "and that is the description of that component: " + prompt.description }
    ],
    model: "gpt-4-1106-preview",
  });

  return completion.choices[0].message.content!;
}

export async function generateSliceComponent(prompt: { name: string, description: string }, model: string, component: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: taskSliceComponent + formattingGuidelinesSliceComponent },
      { role: "user", content: "this is the model for the " + prompt.name + " : " + model + " and this is the component : " + component + "and that is the description of that component: " + prompt.description }
    ],
    model: "gpt-4-1106-preview",
  });

  return completion.choices[0].message.content!;
}

export async function enhanceComponent(prompt: { name: string, description: string }, brand: { websiteDescription: string, font: string, colors: string, additionalDetails: string }, component: string, enhancement: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: task + formattingGuidelines  + "\n" + enhancementTask},
      { role: "user", content: "Website Description: \n" + brand.websiteDescription + "Brand guidelines: \n" + "colors: " + brand.colors + "\nfont : " + brand.font + "\n" + brand.additionalDetails + prompt.description },
      { role: "assistant", content: component },
      { role: "user", content: "Starting from the component you just shared can you : " + enhancement }
    ],
    model: "gpt-4-1106-preview",
  });

  return completion.choices[0].message.content!;
}
