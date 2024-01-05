module.exports = {
    create(context) {
        return {
            JSXElement(node) {
                if (node?.openingElement?.name?.name == 'a') {
                    const clickable = node?.children?.find(
                        (e) =>
                            e?.type === 'JSXElement' &&
                            e?.openingElement?.attributes?.find((e) => e.name?.name === 'onClick')
                    );
                    if (clickable) {
                        context.report({
                            node: clickable,
                            message: 'Cannot add a clickable item inside <a> tag!'
                        });
                    }
                }
            }
        };
    }
};
