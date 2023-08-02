module.exports = (context) => {
  return {
    ImportSpecifier(node) {
      const importName = node.local.name;
      const { tokens } = node.parent.parent;

      if (tokens && tokens.length > 0) {
        const identifiers = tokens.filter(
          (token) =>
            token.type === 'JSXIdentifier' || token.type === 'Identifier'
        );
        const usageArray = identifiers.filter(
          (identifier) => identifier.value === importName
        );
        if (usageArray.length === 1) {
          return context.report(node, node.loc, 'Remove unused import');
        }
      }

      return null;
    },
  };
};
