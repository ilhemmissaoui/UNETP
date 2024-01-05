module.exports = {
    create(context) {
        return {
            JSXElement(node) {
                if (
                    !['Link', 'NextLink']?.includes(node?.parent?.openingElement?.name?.name) &&
                    node?.openingElement?.name?.name == 'a' &&
                    !node?.openingElement?.attributes?.find((e) => e.name?.name === 'href')
                ) {
                    context.report({
                        node: node,
                        message: '<a> tag must have href attribute !'
                    });
                }
            }
        };
    }
};
