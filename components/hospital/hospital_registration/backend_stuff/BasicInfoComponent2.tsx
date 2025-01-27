import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export default function BasicInfoComponent2() {
  return (
    <section>
      <h1>Basic Information</h1>
      <form action="">
        <section>
          <div>Hospital Details</div>
          <div>
            <div>
              <Label htmlFor="hospital_name">Hospital Name</Label>
              <Input
                type="text"
                name="hospital_name"
                id="hospital_name"
                placeholder="abadaba"
              />
            </div>
          </div>
        </section>
      </form>
    </section>
  )
}
