import ContentLoader from 'react-content-loader';
const Loader = ({ rows = 8 }) => {
    return (
        <tbody>
            {new Array(rows).fill(0).map((e, i) => (
                <tr key={i}>
                    <td>
                        <ContentLoader width="170" height="25">
                            <rect x="0" y="0" width="170" height="25" />
                        </ContentLoader>
                    </td>
                    <td>
                        <ContentLoader width="100" height="20">
                            <rect x="0" y="0" width="100" height="20" />
                        </ContentLoader>
                    </td>
                    <td>
                        <ContentLoader width="150" height="25">
                            <rect x="0" y="0" width="150" height="25" />
                        </ContentLoader>
                    </td>
                    <td>
                        <ContentLoader width="150" height="25">
                            <rect x="0" y="0" width="150" height="25" />
                        </ContentLoader>
                    </td>
                    <td>
                        <ContentLoader width="150" height="25">
                            <rect x="0" y="0" width="150" height="25" />
                        </ContentLoader>
                    </td>

                    <td>
                        <ContentLoader width="35" height="20" className="rounded">
                            <rect x="0" y="0" width="35" height="20" />
                        </ContentLoader>
                    </td>
                    <td className="text-center">
                        <ContentLoader width="105" height="35" className="rounded">
                            <rect x="0" y="0" width="105" height="35" />
                        </ContentLoader>
                    </td>
                </tr>
            ))}
        </tbody>
    );
};

export default Loader;
