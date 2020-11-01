type OrganicMessages = {
  log?: string[];
  info?: string[];
  warn?: string[];
  error?: string[];
  [k: string]: any;
};

export type OrganicValidatorResult = {
  passed: boolean;
  messages?: OrganicMessages;
};

export default OrganicValidatorResult;
