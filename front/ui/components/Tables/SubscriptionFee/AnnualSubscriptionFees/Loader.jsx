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
                        <ContentLoader width="70" height="13">
                            <rect x="0" y="0" width="70" height="13" />
                        </ContentLoader>
                    </td>
                    <td>
                        <ContentLoader width="70" height="13">
                            <rect x="0" y="0" width="70" height="13" />
                        </ContentLoader>
                    </td>
                    <td>
                        <ContentLoader width="70" height="13">
                            <rect x="0" y="0" width="70" height="13" />
                        </ContentLoader>
                    </td>
                    <td>
                        <ContentLoader width="70" height="13">
                            <rect x="0" y="0" width="70" height="13" />
                        </ContentLoader>
                    </td>
                    <td>
                        <ContentLoader width="70" height="13">
                            <rect x="0" y="0" width="70" height="13" />
                        </ContentLoader>
                    </td>
                    <td>
                        <ContentLoader width="70" height="13">
                            <rect x="0" y="0" width="70" height="13" />
                        </ContentLoader>
                    </td>
                    <td>
                        <ContentLoader width="70" height="13">
                            <rect x="0" y="0" width="70" height="13" />
                        </ContentLoader>
                    </td>
                    <td>
                        <ContentLoader width="70" height="20" className="rounded">
                            <rect x="0" y="0" width="70" height="20" />
                        </ContentLoader>
                    </td>
                    <td>
                        <ContentLoader width="70" height="13">
                            <rect x="0" y="0" width="70" height="13" />
                        </ContentLoader>
                    </td>
                </tr>
            ))}
        </tbody>
    );
};

export default Loader;
