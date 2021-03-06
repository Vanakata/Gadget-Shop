import React from "react"
import ReactPlayer from "react-player"


const styles = {
    trailer: {
        width: "640px",
        height: "360px",
    },
    innerTrailer: {
        width: "100%",
        height: "100%"
    }
}
function Trailer({ product }) {

    let containsEmbed = product.trailer.indexOf("/embed") > 0;

    return (
        <span>
            <div className="trailer" style={styles.trailer}>
                <div style={styles.innerTrailer}>
                    {
                        containsEmbed ?
                            <iframe
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                title="YouTube video player"
                                width="100%"
                                height="100%"
                                src={product}
                                id={product._id}>
                            </iframe>
                            :
                            <ReactPlayer controls={true} url={product.trailer} playing />
                    }
                </div>
            </div>
        </span>
    )
}
export default Trailer;