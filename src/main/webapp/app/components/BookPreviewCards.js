import React from 'react';

function BookPreviewCard({ imageUrl, likes, stars, description }) {
  return (
    <div className="book-preview-card">
      <img src={imageUrl} alt="Book preview" />
      <div className="card-stats">
        <span>{likes} ❤️</span>
        <span>{stars} ⭐</span>
      </div>
      <p>{description}</p>
      <div className="card-actions">
        <button className="preview-button">Preview Book</button>
        <button className="add-to-cart-button">Add To Cart</button>
      </div>
    </div>
  );
}

function BookPreviewCards() {
  const books = [
    {
      imageUrl: "/path-to-image1.png",
      likes: 2344,
      stars: 9134,
      description: "The game in Shirpur was amazing and I want to share some photos"
    },
    // Add more book objects here
  ];

  return (
    <section className="book-preview-cards">
      {books.map((book, index) => (
        <BookPreviewCard key={index} {...book} />
      ))}
    </section>
  );
}

export default BookPreviewCards;