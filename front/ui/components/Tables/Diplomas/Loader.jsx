import ContentLoader from 'react-content-loader';
const Loader = ({ rows = 9 }) => {
    return (
        <tbody>
            {new Array(rows).fill(0).map((e, i) => (
                <tr key={i}>
                    <td>
                        <ContentLoader width="200" height="25">
                            <rect x="0" y="0" width="200" height="25" />
                        </ContentLoader>
                    </td>
                    <td>
                        <ContentLoader width="70" height="20" className="rounded">
                            <rect x="0" y="0" width="70" height="20" />
                        </ContentLoader>
                    </td>
                    <td>
                        <ContentLoader width="50" height="20">
                            <rect x="0" y="0" width="50" height="20" />
                        </ContentLoader>
                    </td>
                    <td>
                        <ContentLoader width="170" height="25">
                            <rect x="0" y="0" width="170" height="25" />
                        </ContentLoader>
                    </td>
                    <td className="text-center">
                        <ContentLoader width="70" height="25">
                            <rect x="0" y="0" width="70" height="25" />
                        </ContentLoader>
                    </td>
                    <td>
                        <ContentLoader width="200" height="50">
                            <rect x="0" y="0" width="200" height="50" />
                        </ContentLoader>
                    </td>
                    <td>
                        <ContentLoader width="70" height="30">
                            <rect x="0" y="0" width="70" height="30" />
                        </ContentLoader>
                    </td>
                    <td>
                        <ContentLoader width="70" height="20">
                            <rect x="0" y="0" width="70" height="20" />
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
