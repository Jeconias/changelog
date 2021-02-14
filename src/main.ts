import * as core from "@actions/core";
import fs from "fs";

const actionName = "Changelog Action";
const defaultMatchStart = /^<!-- Version start (?:@@\s(\{\"\w+\":\s?\".*\"\})\s)?-->/gm;
const defaultMatchEnd = /^(\s{0,})<!-- Version end -->/gm;
const defaultPath = "./README.md";

const handleDebug = (str: string) => core.debug(`[${actionName}]::${str}`);

async function run(): Promise<void> {
  const isDebug = core.isDebug();

  const path = core.getInput("path") || defaultPath;
  const matchStart = defaultMatchStart;
  const matchEnd = defaultMatchEnd;

  if (isDebug) {
    handleDebug(`path: ${path}`);
  }

  const content = await fs.readFileSync(path, "utf-8");
  if (!content && isDebug) {
    handleDebug("README.md not found or empty.");
    return core.setOutput("changelog", "");
  }

  const hasStartPattern = matchStart.exec(content);
  const hasEndPattern = matchEnd.exec(content);

  if (isDebug) {
    handleDebug(
      `contentStart: ${hasStartPattern} | index: ${hasStartPattern?.index}`
    );
    handleDebug(
      `contentEnd: ${hasEndPattern} | index: ${hasEndPattern?.index}`
    );
  }

  const latestVersionContent = content.slice(
    hasStartPattern?.index,
    hasEndPattern?.index
  );

  if (hasStartPattern && hasStartPattern?.length > 0 && hasStartPattern[1]) {
    const hasDynamicOutputs = hasStartPattern[1];
    const JSONOutputs = JSON.parse(hasDynamicOutputs);
    Object.keys(JSONOutputs).forEach((el) =>
      core.setOutput(el, JSONOutputs[el] || "")
    );
  }

  if (hasStartPattern && hasEndPattern && latestVersionContent) {
    if (isDebug) handleDebug("Changelog found.");
    core.setOutput("changelog", latestVersionContent);
  } else {
    if (isDebug) handleDebug("Changelog not found.");
    core.setOutput("changelog", "");
  }
}

run().catch((err) => core.setFailed(err.message));
