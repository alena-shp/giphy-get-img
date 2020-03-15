import React from "react"

const ImgItem = ({ images, isGrouped, tagGroups, onImageClick, loading }) => {
  return (
    <>
      {isGrouped ? (
        <div className="item-tags-wrapper">
          {Object.keys(tagGroups).map(tag => (
            <div className="item-tags">
              <h3 className="item-title">{tag}</h3>
              <div className="item-row">
                {tagGroups[tag].map(imageUrl => (
                  <div
                    className="item"
                    onClick={() => {
                      onImageClick(tag)
                    }}
                  >
                    <img src={imageUrl} alt="" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="images">
          {images.map(img => (
            <div
              className="item"
              key={img.id}
              onClick={() => {
                onImageClick(img.tag)
              }}
            >
              <img src={img.url} alt="" />
            </div>
          ))}
          {loading}
        </div>
      )}
    </>
  )
}
export default ImgItem
