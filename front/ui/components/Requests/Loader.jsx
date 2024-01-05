import ContentLoader from 'react-content-loader';
const Loader = ({ rows = 8 }) => {
    return (
        <tbody>
            {new Array(rows).fill(0).map((e, i) => (
                <tr key={i}>
                    <td>
                        <ContentLoader width="200" height="50">
                            <rect x="60" y="20" width="200" height="15" />
                            <circle cx="25" cy="25" r="25" />
                        </ContentLoader>
                    </td>
                    <td className="text-center">
                        <ContentLoader width="30" height="30">
                            <rect x="0" y="0" width="30" height="30" />
                        </ContentLoader>
                    </td>
                    <td className="text-center">
                        <ContentLoader width="110" height="15">
                            <rect x="0" y="0" width="110" height="15" />
                        </ContentLoader>
                    </td>
                    <td className="text-center">
                        <ContentLoader width="100" height="20" className="rounded">
                            <rect x="0" y="0" width="100" height="20" />
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
