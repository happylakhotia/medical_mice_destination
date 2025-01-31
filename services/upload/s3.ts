import { gql } from "@apollo/client";
import createApolloClient from "../apollo/client";


export async function UploadFile(e:React.ChangeEvent<HTMLInputElement>) { 
  const file = e.target.files?.[0]

  if (!file) return

  try {
    
  } catch {}
}