function FileUpload() {
  function handleFileUpload(event) {
    const file = event.target.files[0];
    console.log(file);
  }

  return (
    <section>
      <h2>Get Started</h2>
      <input
        type="file"
        accept=".pdf, .jpg, .jpeg, .png"
        onChange={handleFileUpload}
      />
    </section>
  );
}
