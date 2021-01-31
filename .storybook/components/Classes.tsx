import React from "react";
import { ArgTypes, ArgType, ArgsTable } from "@storybook/components";
import { DocsContext } from "@storybook/addon-docs/blocks";
import { EmptyBlock } from "@storybook/components/dist/blocks/EmptyBlock";

const styleRegexp = /\/\*\* (.*) \*\/[\r\n]\s*(\w*)/g;

function getStyleRows(styleFunctionSrc: string): ArgTypes {
  const styleRows: ArgTypes = {};

  styleFunctionSrc.replace(styleRegexp, (_, desc, key) => {
    // Only document classes that have documentation and aren't marked private
    if (desc && desc.length && desc.indexOf("@private") < 0) {
      styleRows[key] = {
        name: key,
        type: null,
        required: false,
        description: desc,
      };
    }
    return "";
  });

  return styleRows;
}

// Hides the "default" column of the <ArgsTable />
// Hides the "type" section of the "description" column of the <ArgsTable />
function hideElementsInArgsTable(ref: HTMLDivElement | null) {
  if (!ref) {
    return;
  }

  const header = ref.querySelectorAll("th");

  if (header && header[2]) {
    header[2].style.setProperty("display", "none");
  }

  const rows = ref.querySelectorAll("tbody > tr") || [];

  rows.forEach((row) => {
    const tds = row.querySelectorAll("td");

    if (tds && tds[2]) {
      tds[2].style.setProperty("display", "none");
    }
    if (tds && tds[1]) {
      const sections = tds[1].querySelectorAll("div") || [];
      if (sections && sections[1]) {
        sections[1].style.setProperty("display", "none");
      }
    }
  });
}

export const Classes: React.FunctionComponent = () => {
  const context = React.useContext(DocsContext);

  console.log(
    "DEBUG ~ file: Classes.tsx ~ line 65 ~ context.parameters.styles",
    context.parameters.styles.toString()
  );

  const styleDocs = context.parameters.styles
    ? getStyleRows(context.parameters.styles.toString())
    : {};

  let body;

  if (Object.keys(styleDocs).length === 0) {
    body = <EmptyBlock>No CSS overrides found for this component</EmptyBlock>;
  } else {
    const rows = Object.keys(styleDocs)
      .map<[string, ArgType]>((key) => [key, styleDocs[key]])
      .sort((a, b) => {
        // Keep "root" at the top
        if (a[1].name === "root") {
          return -1;
        }
        if (b[1].name === "root") {
          return 1;
        }
        return a[1].name?.localeCompare(b[1].name || "") || 0;
      })
      .reduce((acc, [key, argType]) => {
        acc[key] = argType;
        return acc;
      }, {} as ArgTypes);
    body = <ArgsTable rows={rows} />;
  }

  return (
    <div ref={(r) => hideElementsInArgsTable(r)}>
      <p>
        Inputs to the <code>classes</code> prop for overriding the default
        styling of the component.
      </p>
      {body}
    </div>
  );
};
