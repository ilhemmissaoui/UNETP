module.exports = {
    create(context) {
        return {
            JSXElement(node) {
                const classNameAttribute = node?.openingElement?.attributes?.find(
                    (e) => e.name?.name === 'className'
                );
                if (
                    classNameAttribute &&
                    classNameAttribute?.value?.value?.split(' ')?.includes('card-body')
                ) {
                    const cardFooter = node?.children?.find(
                        (e) =>
                            e?.type === 'JSXElement' &&
                            e?.openingElement?.attributes
                                ?.find((e) => e.name?.name === 'className')
                                ?.value?.value?.é(' ')
                                ?.includes('card-footer')
                    );
                    if (cardFooter) {
                        context.report({
                            node: cardFooter,
                            message: 'card-footer cannot be inside card-body'
                        });
                    }
                }
            }
        };
    }
};
