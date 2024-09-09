export const extractFirstCodeBlock = (text: string): string => {
    const regex = /```(?:[a-zA-Z0-9-]+)?\s*([\s\S]*?)```/;
    const match = text!.match(regex);
    return match ? match[1].trim() : "";
  };