import React from "react";

type urlObject = {
  status: string;
  url: string;
};

export async function UploadOnS3(
  e: React.FormEvent<HTMLFormElement>,
  urlSetter: (url: string) => void,
  errorSetter: (msg: string) => void,
  name: string,
) {
  e.preventDefault();
  const form = e.currentTarget as HTMLFormElement;
  const formData = new FormData(form);
  const data: any = Object.fromEntries(formData.entries());
  console.log(data);

  const url: urlObject = await getPreSignedUrl(
    `${process.env.NEXT_PUBLIC_API_URL}/upload/s3url`,
    errorSetter,
  );
  try {
    await makePutRequestToS3(url.url, errorSetter, data[name]);
    urlSetter(url.url.split("?")[0]);
		return url.url.split("?")[0]
  } catch (err) {
    console.log("Error");
    return;
  }
}

// this can be any function that sets the error state of a component

async function makePutRequestToS3(
  url: string,
  errorSetter: (msg: string) => void,
  file: File,
) {
  try {
    console.log(url);
    console.log(file);
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });
    if (!response.ok) {
      console.log("error while making a put request to s3");
      errorSetter("Error Whiie Uploading files");
      throw Error("Error while uploading files to s3");
    }
    console.log(response.status);
    console.log("file uploaded sucessfully...");
  } catch (err) {
    console.log(err);
    errorSetter("Error while Uploading File To S3");
  }
}

async function getPreSignedUrl(
  url: string,
  errorSetter: (msg: string) => void,
) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log("something happened");
      errorSetter("Error In Uploading Files");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("An Error Occured", err);
  }
}
