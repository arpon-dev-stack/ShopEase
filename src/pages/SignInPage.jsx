import { useState } from "react"

function SignInPage() {
    const [form, setForm] = useState({email: '', password: ''});

    const handleSignform = (e) => {
        e.preventDefault()
        console.log(form)
    }

  return (
    <div className='w-full min-h-96 max-h-screen flex justify-center items-center'>
        <form onSubmit={handleSignform} className="max-w-72 min-w-52 p-2 bg-blue-400 flex flex-col gap-2">
            <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
            <input type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} />
            <button type='submit'>Sign In</button>
        </form>
    </div>
  )
}

export default SignInPage