module.exports = {
    create(context) {
        return {
            JSXElement(node) {
                if (node?.openingElement?.name?.name == 'Link') {
                    const tag = node?.children?.find(
                        (e) => e?.type === 'JSXElement' && e?.openingElement?.name?.name !== 'a'
                    );
                    if (tag) {
                        context.report({
                            node: tag,
                            message: 'Only <a> tag should be inside link component!'
                        });
                    }
                }
            }
        };
    }
};
