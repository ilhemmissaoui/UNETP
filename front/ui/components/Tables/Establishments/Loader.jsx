import ContentLoader from 'react-content-loader';
const Loader = ({ rows = 10 }) => {
    return (
        <tbody>
            {new Array(rows).fill(0).map((e, i) => (
                <tr key={i}>
                    <td>
                        <ContentLoader width="70" height="23" className="rounded">
                            <rect x="0" y="0" width="70" height="23" />
                        </ContentLoader>
                    </td>
                    <td>
                        <ContentLoader width="80" height="20">
                            <rect x="0" y="0" width="80" height="20" />
                        </ContentLoader>
                    </td>
                    <td>
                        <ContentLoader width="80" height="20">
                            <rect x="0" y="0" width="80" height="20" />
                        </ContentLoader>
                    </td>
                    <td>
                        <ContentLoader width="130" height="23">
                            <rect x="0" y="0" width="130" height="23" />
                        </ContentLoader>
                    </td>
                    <td>
                        <ContentLoader width="90" height="23" className="rounded">
                            <rect x="0" y="0" width="90" height="23" />
                        </ContentLoader>
                    </td>
                    <td className="text-center">
                        <ContentLoader width="12" height="12" className="rounded">
                            <circle cx="5" cy="6" r="6" />
                        </ContentLoader>
                    </td>
                    <td className="text-center">
                        <ContentLoader width="100" height="35" className="rounded">
                            <rect x="0" y="0" width="100" height="35" />
                        </ContentLoader>
                    </td>
                </tr>
            ))}
        </tbody>
    );
};

export default Loader;
