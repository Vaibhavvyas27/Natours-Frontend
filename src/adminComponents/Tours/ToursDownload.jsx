import React from 'react'

const ToursDownload = ({ tours }) => {
    const downloadTours = () => {
        try {
            // Convert the JSON data to a string
            const dataStr = JSON.stringify(tours);

            // Create a Blob from the data
            const blob = new Blob([dataStr], { type: 'application/json' });

            // Create a link element
            const link = document.createElement('a');

            // Set the URL of the link to the Blob URL
            link.href = URL.createObjectURL(blob);

            // Set the download attribute to specify the filename
            link.download = 'tours.json';

            // Append the link to the body (necessary for Firefox)
            document.body.appendChild(link);

            // Programmatically click the link to trigger the download
            link.click();

            // Remove the link from the document
            document.body.removeChild(link);

            
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <button onClick={downloadTours} className="btn btn-dark py-2"><i className="bi bi-file-earmark-arrow-down-fill"></i> Download</button>
        </>
    )
}

export default ToursDownload
