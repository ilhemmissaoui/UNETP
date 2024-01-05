import NextLink from 'next/link';
import React from 'react';
const LinkWithRef = React.forwardRef(({ children, href, passHref, ...props }, ref) => (
    <NextLink href={href} passHref={passHref}>
        <a ref={ref} {...props}>
            {children}
        </a>
    </NextLink>
));

export default LinkWithRef;
