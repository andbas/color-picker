import * as fs from "fs";
import { OpenAI } from "openai";
import ntcColors from "color-namer/lib/colors/ntc";

if (!process.env.OPENAI_API_KEY)
  throw new Error("OPENAI_API_KEY should be setup thought ENV variables");

const FOLDER_PATH = "public/colors";

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to generate color description
async function generateColorDescription(colorName: string, colorHex: string) {
  const prompt =
    `You are an expert color analyst tasked with providing detailed information about a specific color ` +
    `from the NTC (Name That Color) palette. Your goal is to create a comprehensive, well-structured JSON ` +
    `response that covers various aspects of the color. Include the following fields: description, originOfName, ` +
    `usageInDesign (with subsections interiorDesign, fashion, graphicDesign), and visualCharacteristics ` +
    `(with subsections mood, complementaryColors).` +
    `The color you will analyze is:` +
    `<colorName>${colorName}</colorName>` +
    `Ensure that each description or definition you provide is 3-5 sentences long and well-structured. ` +
    `Avoid oversimplified responses and strive to include specific examples, cultural references, or design principles where appropriate.` +
    `The output should be in JSON format.`;

  try {
    const runner = await openai.beta.chat.completions.runTools({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      tools: [
        {
          type: "function",
          function: {
            function: saveColorDescriptionFn(colorName, colorHex),
            parse: JSON.parse,
            name: "saveColorDescription",
            description: "Save the color description to a JSON file",
            parameters: {
              type: "object",
              properties: {
                name: { type: "string", description: "Name of the color" },
                description: {
                  type: "string",
                  description: "Description of the color",
                },
                originOfName: {
                  type: "string",
                  description:
                    "Origin of the color name, including the etymology, any interesting facts about its naming or historical context.",
                },
                usageInDesign: {
                  type: "object",
                  properties: {
                    interiorDesign: {
                      type: "string",
                      description:
                        "Usage of the color in interior design, including specific applications or design styles, including popular room choices and complementary decor.",
                    },
                    fashion: {
                      type: "string",
                      description:
                        "Usage of the color in fashion, including specific clothing items or design styles, including seasonal trends and typical garment types.",
                    },
                    graphicDesign: {
                      type: "string",
                      description:
                        "Usage of the color in graphic design, including specific applications or design styles,  including its effectiveness in logos, websites, or print media.",
                    },
                  },
                },
                visualCharacteristics: {
                  type: "object",
                  properties: {
                    mood: {
                      type: "string",
                      description:
                        "The emotional and psychological effects of the color, including common associations and feelings it may evoke.",
                    },
                    complementaryColors: {
                      type: "string",
                      description:
                        "Colors that complement the analyzed color, including their names and the reasons for their complementarity.",
                    },
                  },
                },
              },
              required: [
                "colorName",
                "description",
                "originOfName",
                "usageInDesign",
                "visualCharacteristics",
              ],
            },
          },
        },
      ],
      // This stop communication with the model after calling the function
      tool_choice: {
        type: "function",
        function: { name: "saveColorDescription" },
      },
    });

    await runner.finalContent();
  } catch (error) {
    console.error(`Error generating description for ${colorName}:`, error);
    return null;
  }
}

// tool cals for save colors into JSON
function saveColorDescriptionFn(colorName: string, colorHex: string) {
  return async (color) => {
    if (colorName !== color.name) {
      console.log(
        `Inconsistent color name: original - ${colorName} vs gpt result - ${color.name}`
      );
    }
    color.hex = colorHex;

    const fileName = `${colorNameToFileName(colorName)}`;

    fs.writeFileSync(
      `${FOLDER_PATH}/${fileName}`,
      JSON.stringify(color, null, 2)
    );
  };
}

function colorNameToFileName(colorName: string) {
  return `${colorName.toLowerCase().replace("/", "").replace(/ /g, "_")}.json`;
}

function getProcessedColors(): Set<string> {
  const files = fs.readdirSync(FOLDER_PATH);
  return new Set(files);
}

// Main function to process all colors
async function processColors() {
  const processedColors = getProcessedColors();

  const results = [];

  for (let i = 0; i < ntcColors.length; i++) {
    const color = ntcColors[i];
    const fileName = colorNameToFileName(color.name);
    results.push({
      name: color.name,
      hex: color.hex,
      json: fileName,
    });

    if (processedColors.has(fileName)) {
      console.log(`Skipping ${color.name} as it is already processed`);
      continue;
    }

    console.log(
      `${String(i + 1).padStart(4, "0")} / ${
        ntcColors.length
      } Processing color ${color.name}`
    );
    await generateColorDescription(color.name, color.hex);

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  fs.writeFileSync(
    `${FOLDER_PATH}/colors.json`,
    JSON.stringify(results, null, 2)
  );
}

processColors();
