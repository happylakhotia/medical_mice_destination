export type Doctor = {
  medical_registration_number: string;
  name: string;
  phone: number;
  specialization: string;
  medical_registration_document: File | null;
  qualifications: Qualification[];
  join_date: Date;
};

export type Qualification = {
  title: string;
  college: string;
  start_year: string;
  end_year: string;
};
