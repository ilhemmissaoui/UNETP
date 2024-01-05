import ContentLoader from 'react-content-loader';
const Loader = ({ rows = 8 }) => {
    return (
        <tbody>
            {new Array(rows).fill(0).map((e, i) => (
                <tr key={i}>
                    <td>
                        <ContentLoader width="120" height="20">
                            <rect x="0" y="0" width="120" height="20" />
                        </ContentLoader>
                    </td>
                    <td>
                        <ContentLoader width="30" height="20">
                            <rect x="0" y="0" width="30" height="20" />
                        </ContentLoader>
                    </td>
                    <td>
                        <ContentLoader width="25" height="20">
                            <rect x="0" y="0" width="25" height="20" />
                        </ContentLoader>
                    </td>
                    <td>
                        <ContentLoader width="25" height="20">
                            <rect x="0" y="0" width="25" height="20" />
                        </ContentLoader>
                    </td>

                    <td className="text-center">
                        <ContentLoader width="70" height="35" className="rounded">
                            <rect x="0" y="0" width="70" height="35" />
                        </ContentLoader>
                    </td>
                </tr>
            ))}
        </tbody>
    );
};

export default Loader;
