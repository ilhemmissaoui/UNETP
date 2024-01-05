import ContentLoader from 'react-content-loader';
const Loader = ({ rows = 9 }) => {
    return (
        <tbody>
            {new Array(rows).fill(0).map((e, i) => (
                <tr key={i}>
                    <td>
                        <ContentLoader width="150" height="13">
                            <rect x="0" y="0" width="150" height="13" />
                        </ContentLoader>
                    </td>
                    <td>
                        <ContentLoader width="100" height="13">
                            <rect x="0" y="0" width="100" height="13" />
                        </ContentLoader>
                    </td>
                    <td>
                        <ContentLoader width="50" height="13">
                            <rect x="0" y="0" width="50" height="13" />
                        </ContentLoader>
                    </td>
                    <td className="text-center">
                        <ContentLoader width="130" height="13">
                            <rect x="0" y="0" width="130" height="13" />
                        </ContentLoader>
                    </td>
                    <td className="text-center">
                        <ContentLoader width="70" height="13">
                            <rect x="0" y="0" width="70" height="13" />
                        </ContentLoader>
                    </td>
                    <td className="text-center">
                        <ContentLoader width="100" height="13">
                            <rect x="0" y="0" width="100" height="13" />
                        </ContentLoader>
                    </td>
                    <td className="text-center">
                        <ContentLoader width="70" height="13">
                            <rect x="0" y="0" width="70" height="13" />
                        </ContentLoader>
                    </td>
                    <td className="text-center">
                        <ContentLoader width="70" height="13">
                            <rect x="0" y="0" width="70" height="13" />
                        </ContentLoader>
                    </td>
                    <td className="text-center">
                        <ContentLoader width="80" height="28" className="rounded">
                            <rect x="0" y="0" width="80" height="28" />
                        </ContentLoader>
                    </td>
                </tr>
            ))}
        </tbody>
    );
};

export default Loader;
