import { HStack } from "@chakra-ui/react";
import { ActionBlock } from "./ActionBlock";
import { DecisionBlock } from "./DecisionBlock";
import { SequenceBlock } from "./SequenceBlock";

export interface BlockProps {
  _id: number;
  _type:
    | "SequenceBlock"
    | "DecisionBlock"
    | "ActionBlock"
    | "BaseBlock"
    | string;
  childrens?: BlockProps[];
  method?: string;
  debug?: any;
  children?: JSX.Element | JSX.Element | string | string[];
}

export function Block(props: BlockProps) {
  switch (props._type) {
    case "ActionBlock":
      return <ActionBlock {...props} />;
    case "DecisionBlock":
      return <DecisionBlock {...props} />;
    case "SequenceBlock":
      return <SequenceBlock {...props} />;
    default:
      return <div>UnknownType!</div>;
  }
}
