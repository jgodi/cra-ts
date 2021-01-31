import React from "react";
import {
  Source as SourceBlock,
  DocsContext,
} from "@storybook/addon-docs/blocks";

export const Source: React.FunctionComponent<{}> = () => {
  const context = React.useContext(DocsContext);

  if (!context.parameters.import) {
    return <></>;
  }

  return (
    <SourceBlock
      language="typescript"
      code={`import { ${context.parameters.import.name} } from "${context.parameters.import.package}"`}
    />
  );
};
