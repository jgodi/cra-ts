import {
  Title,
  Subtitle,
  Description,
  Primary,
  Stories,
  DocsContainer,
  PRIMARY_STORY,
  ArgsTable,
  Heading,
} from "@storybook/addon-docs/blocks";

import { Classes } from "./components/Classes";
import { Source } from "./components/Source";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  argTypes: {
    classes: {
      name: "classes",
      description: "Classes to override the default styling",
      table: {
        type: {
          summary: "Refer to Classes section",
        },
      },
      control: {
        type: null,
      },
    },
  },
  docs: {
    container: DocsContainer,
    page: () => (
      <>
        <Title />
        <Subtitle />
        <Description />
        <Source />
        <Primary />
        <Heading>Props</Heading>
        <ArgsTable story={PRIMARY_STORY} />
        <Heading>Classes</Heading>
        <Classes />
        <Stories title="More Examples" />
      </>
    ),
  },
};
