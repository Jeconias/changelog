import core from "@actions/core";
import github from "@actions/github";
import fs from "fs";

const defaultMatchStart = "(?:\\#+\\sChangelog)";
const defaultMatchEnd = "<!-- Version end -->";
const defaultPath = "";

async function run(): Promise<void> {
  try {
    const path = core.getInput("path") ?? defaultPath;
    const matchStart = new RegExp(
      core.getInput("matchStart") ?? defaultMatchStart,
      "g"
    );
    const matchEnd = new RegExp(
      core.getInput("matchEnd") ?? defaultMatchEnd,
      "g"
    );

    const content = await fs.readFileSync(`${path}README.md`, "utf-8");
    if (!content) {
      core.debug("README.md not found or empty.");
      return core.setOutput("changelog", "");
    }

    const hasStartPattern = matchStart.exec(content);
    const hasEndPattern = matchEnd.exec(content);

    if (hasStartPattern && hasEndPattern) {
      core.debug("Changelog found.");
      const latestVersionContent = content.slice(
        hasStartPattern.index,
        hasEndPattern.index
      );
      return core.setOutput("changelog", latestVersionContent);
    }
    core.debug("Changelog not found.");
    core.setOutput("changelog", "");
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
