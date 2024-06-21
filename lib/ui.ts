import boxen from "boxen";
import chalk from "chalk";
import figlet from "figlet";

const asyncFilget = util.promisify(figlet);
import util from "util";

interface BoxenOptions {
  padding?: number;
  margin?: number;
  borderStyle?: any;
  borderColor?: string;
  backgroundColor?: string;
  height?: number;
  align?: "left" | "center" | "right";
  textAlignment?: "left" | "center" | "right";
  float?: "left" | "center" | "right";
  dimBorder?: boolean;
  width?: number;
}

export class Tui {
  static box(content: string) {
    const boxOptions: BoxenOptions = {
      padding: 1,
      width: 70,
      borderStyle: "round",
      align: "center",
      textAlignment: "center",
    };
    const boxedContent = boxen(content, { ...boxOptions });
    console.log(boxedContent);
  }
  static colorize(text: string, color: keyof typeof chalk = "green") {
    if (!chalk[color]) {
      throw new Error(`Invalid color specified:${color}`);
    }
    const colorFn = (chalk as any)[color];
    if (typeof colorFn !== "function") {
      throw new Error(`Invalid color name specified:${color}`);
    }
    return colorFn(text);
  }
  static async headerText(text: string) {
    try {
      const res = await asyncFilget(text);
      return res;
    } catch (err) {
      console.error("Error in figlet:", err);
      throw err; // Optional: propagate the error
    }
  }
}
