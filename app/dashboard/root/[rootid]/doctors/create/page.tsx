"use client";

import CREATE_DOCTOR_MUTATION from "@/services/apollo/mutations/createDoctor";
import { useUserHospitalContext } from "@/services/contexts/userHospitalContext";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { handleUpload } from "@/services/upload/s3";

export default function CreateDoctor() {
  const [createDoctor, { loading, error }] = useMutation(CREATE_DOCTOR_MUTATION, {
    context: {
      requiresAuth: true,
    },
  });
  const { userHospital } = useUserHospitalContext();
  const [uploading, setUploading] = useState(false);

 

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const specialty = formData.get("specialty");
    
    const profilePicFile = formData.get("profilepic") as File;
    const documentFiles = formData.getAll("documents") as File[];
    
    setUploading(true);
    const profilePicUrl = profilePicFile ? await handleUpload(profilePicFile) : "";
    const documentUrls = await Promise.all(documentFiles.map(handleUpload));
    setUploading(false);
    
    if (!profilePicUrl || documentUrls.includes(null)) {
      alert("File upload failed");
      return;
    }

    console.log(userHospital?.id)
    
    createDoctor({
      variables: { name, email, password, specialty, profilePic: profilePicUrl, documents: documentUrls, hospitalId: userHospital?.id },
    })
      .then((res) => {
        console.log("Doctor Created", res.data);
        alert("Doctor created successfully");
        form.reset();
      })
      .catch((err) => console.error("Error creating doctor", err));
  }

  return (
    <Card className="w-full max-w-lg mx-auto mt-10 p-6 border rounded-2xl shadow-lg">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="specialty">Doctor's Specialty</Label>
            <Input type="text" name="specialty" id="specialty" required />
          </div>
          <div>
            <Label htmlFor="name">Doctor's Name</Label>
            <Input type="text" name="name" id="name" required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input type="password" name="password" id="password" required />
          </div>
          <div>
            <Label htmlFor="email">Doctor's Email</Label>
            <Input type="email" name="email" id="email" required />
          </div>
          <div>
            <Label htmlFor="documents">Upload Documents</Label>
            <Input type="file" multiple name="documents" id="documents" required />
          </div>
          <div>
            <Label htmlFor="profilepic">Profile Picture</Label>
            <Input type="file" name="profilepic" id="profilepic" required />
          </div>
          <Button type="submit" disabled={loading || uploading} className="w-full mt-4">
            {loading || uploading ? "Submitting..." : "Submit"}
          </Button>
          {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}
        </form>
      </CardContent>
    </Card>
  );
}
