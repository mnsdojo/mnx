import boxen from "boxen";
import chalk from "chalk";

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
  static colorize(text: string) {
    return chalk.green(text);
  }
}
