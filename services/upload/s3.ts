 export async function handleUpload(file: File) {
    try {
      const response = await fetch("http://localhost:8080/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Couldn't upload file");
      
      const data = await response.json();
      const uploadResponse = await fetch(data.url, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });
      if (!uploadResponse.ok) throw new Error("Couldn't upload documents");
      
      return data.url.split("?")[0];
    } catch (err) {
      console.error(err);
      return null;
    }
  }