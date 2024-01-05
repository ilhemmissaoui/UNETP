import ContentLoader from 'react-content-loader';
const Loader = ({ rows = 8 }) => {
    return (
        <tbody>
            {new Array(rows).fill(0).map((e, i) => (
                <tr key={i}>
                    <td>
                        <ContentLoader width="90" height="25" className="rounded">
                            <rect x="0" y="0" width="90" height="25" />
                        </ContentLoader>
                    </td>
                    <td>
                        <ContentLoader width="90" height="120">
                            <rect x="0" y="0" width="90" height="120" />
                        </ContentLoader>
                    </td>
                    <td>
                        <ContentLoader width="90" height="120">
                            <rect x="0" y="0" width="90" height="120" />
                        </ContentLoader>
                    </td>
                    <td>
                        <ContentLoader width="60" height="25">
                            <rect x="0" y="0" width="60" height="25" />
                        </ContentLoader>
                    </td>
                    <td>
                        <ContentLoader width="60" height="25">
                            <rect x="0" y="0" width="60" height="25" />
                        </ContentLoader>
                    </td>
                    <td>
                        <ContentLoader width="60" height="25">
                            <rect x="0" y="0" width="60" height="25" />
                        </ContentLoader>
                    </td>
                    <td>
                        <ContentLoader width="60" height="25">
                            <rect x="0" y="0" width="60" height="25" />
                        </ContentLoader>
                    </td>
                    <td>
                        <ContentLoader width="60" height="25">
                            <rect x="0" y="0" width="60" height="25" />
                        </ContentLoader>
                    </td>
                    <td>
                        <ContentLoader width="60" height="25">
                            <rect x="0" y="0" width="60" height="25" />
                        </ContentLoader>
                    </td>
                    <td>
                        <ContentLoader width="60" height="25">
                            <rect x="0" y="0" width="60" height="25" />
                        </ContentLoader>
                    </td>
                    <td>
                        <ContentLoader width="60" height="25">
                            <rect x="0" y="0" width="60" height="25" />
                        </ContentLoader>
                    </td>

                    <td className="text-center">
                        <ContentLoader width="35" height="35" className="rounded">
                            <rect x="0" y="0" width="35" height="35" />
                        </ContentLoader>
                    </td>
                </tr>
            ))}
        </tbody>
    );
};

export default Loader;
