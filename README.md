# Github Action Changelog

Read your README and copy the last information about changes for the new tag/release.

## How to use

Create the README file on the repository and add the changelog structure. Your struct should seem with:

```
...

## Changelog

\<!-- Version start @@ {"version": "v0.1.1", tagtitle: "..."} --> Start of the last changelog

- ### v0.1.1

  - The Changelog action will capture the text between `<!-- Version start -->` and `<!-- Version end -->`;
  - You can add `@@` and a JSON after to receive it on output;
  - See raw this file for a real example.

\<!-- Version end --> # End of the last changelog

- ### v0.1.0

  - any text

```

Workflow example

```yml
steps:
  - name: Read the README.md
    id: changelog
    uses: ./
    with:
      path: "./README.md" # The path to read a README.md file. (Optional)
  - name: Showing the last changelog
    run: echo "${{steps.ID.outputs.changelog}} | ${{steps.ID.outputs.version}}"
```

## Changelog

<!-- Version start @@ {"version": "v1", "release": "Initial"} -->

- ### v0.1.1

  - Fix imports of main.ts
  - Updated main.yml to use the Changelog Action to reading the README.md and create a release.
  <!-- Version end -->

- ### v0.1.0

  - Initial
