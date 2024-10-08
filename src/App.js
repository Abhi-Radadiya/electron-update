import React, { useEffect, useState } from "react";

function App() {
    const [updateAvailable, setUpdateAvailable] = useState(false);

    useEffect(() => {
        window.api.onUpdateAvailable(() => {
            setUpdateAvailable(true);
        });
        window.api.onUpdateDownloaded(() => {
            setUpdateAvailable("Downloaded");
        });
    }, []);

    return (
        <div>
            <h1>This is Main File</h1>
            {updateAvailable && <p>An update is available! It will be installed soon.</p>}
            {updateAvailable}
        </div>
    );
}

export default App;
