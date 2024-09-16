import React from 'react';

function AITools() {
  return (
    <section className="ai-tools">
      <h2>Read, Write, Listen and Generate using free AI</h2>
      <p>
        KFZ is pleased to announce the availability of complimentary AI tools
        designed to enhance Read, Write, and Listen content. These innovative
        resources aim to support users in improving their literacy and
        comprehension skills through interactive and engaging experiences. By
        leveraging advanced artificial intelligence, KFZ enables individuals to
        access personalized content that fosters learning and creativity, making it
        easier than ever to engage with a variety of materials.
      </p>
      <div className="ai-buttons">
        <button>Read with AI</button>
        <button>Write with AI</button>
        <button>Listen with AI</button>
        <button>Generate with AI</button>
      </div>
      <button className="generate-stories">Generate Bed Time Stories</button>
    </section>
  );
}

export default AITools;