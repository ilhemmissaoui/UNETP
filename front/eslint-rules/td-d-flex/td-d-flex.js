module.exports = {
    create(context) {
        return {
            JSXElement(node) {
                if (node?.openingElement?.name?.name == 'td') {
                    const classNames = node?.openingElement?.attributes
                        ?.find((e) => e.name?.name === 'className')
                        ?.value?.value?.split(' ');
                    if (classNames?.includes('d-flex')) {
                        context.report({
                            node: node,
                            message: '<td> tag cannot have d-flex className!'
                        });
                    }
                }
            }
        };
    }
};
