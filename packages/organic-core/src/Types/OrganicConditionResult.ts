type OrganicMessages = {
  log?: string[];
  info?: string[];
  warn?: string[];
  error?: string[];
  [k: string]: any;
};

export type OrganicConditionResult = {
  passed: boolean;
  messages?: OrganicMessages;
};

export default OrganicConditionResult;
