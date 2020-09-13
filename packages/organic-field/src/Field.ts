type OrganicField = {
  machine: string;
  context: string;
};

const Field = (machine, context): OrganicField => {
  let attributes = {};
  let value = undefined;
  return {
    machine,
    context,
  };
};

export default Field;
