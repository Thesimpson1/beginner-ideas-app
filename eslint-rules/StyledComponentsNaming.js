module.exports = (context) => {
  return {
    VariableDeclarator(node) {
      const variableName = node.id.name;
      function handleReport() {
        if (!variableName.startsWith('Styled')) {
          return context.report(
            node,
            node.loc,
            'All styled component names should be started with prefix Styled'
          );
        }
        return null;
      }

      if (!node.init) {
        return null;
      }

      const isTemplateExpression =
        node.init.type === 'TaggedTemplateExpression';

      if (isTemplateExpression) {
        if (!node.init.tag) {
          return null;
        }

        const isCreatingStyledComponentWithoutFunction =
          node.init.tag.object && node.init.tag.object.name === 'styled';
        const isCreatingStyledComponentWithAttrs =
          node.init.tag.callee &&
          node.init.tag.callee.property &&
          node.init.tag.callee.property.name === 'attrs';

        const isCreatingStyledComponentWithFunction =
          node.init.tag.callee && node.init.tag.callee.name === 'styled';

        if (
          isCreatingStyledComponentWithoutFunction ||
          isCreatingStyledComponentWithFunction ||
          isCreatingStyledComponentWithAttrs
        ) {
          return handleReport();
        }
      }

      return null;
    },
  };
};
