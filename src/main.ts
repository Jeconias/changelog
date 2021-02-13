import core from "@actions/core";
import github from "@actions/github";
import fs from "fs";

const defaultMatchStart = "(?:\\#+\\sChangelog)";
const defaultMatchEnd = "<!-- Version end -->";
const defaultPath = "";

async function run(): Promise<void> {
  const isDebug = core.isDebug();

  const path = core.getInput("path") ?? defaultPath;
  const matchStart = new RegExp(
    core.getInput("matchStart") ?? defaultMatchStart,
    "g"
  );
  const matchEnd = new RegExp(
    core.getInput("matchEnd") ?? defaultMatchEnd,
    "g"
  );

  if (isDebug) {
    core.debug(
      `Inputs -> path:${path} | matchStart:${matchStart} | matchEnd:${matchEnd}`
    );
  }

  const content = await fs.readFileSync(`${path}README.md`, "utf-8");
  if (!content && isDebug) {
    core.debug("README.md not found or empty.");
    return core.setOutput("changelog", "");
  }

  const hasStartPattern = matchStart.exec(content);
  const hasEndPattern = matchEnd.exec(content);

  console.log(content);

  if (isDebug) {
    core.debug(`contentStart: ${hasStartPattern}`);
    core.debug(`contentEnd: ${hasEndPattern}`);
  }

  if (hasStartPattern && hasEndPattern) {
    if (isDebug) core.debug("Changelog found.");
    const latestVersionContent = content.slice(
      hasStartPattern.index,
      hasEndPattern.index
    );
    return core.setOutput("changelog", latestVersionContent);
  }
  if (isDebug) core.debug("Changelog not found.");
  core.setOutput("changelog", "");
}

run().catch((err) => {
  if (core?.setFailed) core.setFailed(err.message);
  console.log(err.message);
});
