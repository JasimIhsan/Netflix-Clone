import { useState } from 'react'
import logo from '../../assets/logo.png'
import { login, signup } from '../../controllers/controllers';
import './Login.css'

const Login = () => {

	const [ signState, setsignState ] = useState<string>("SignIn")
	const [ name, setName ] = useState<string>('');
	const [ email, setEmail ] = useState<string>('');
	const [ password, setPassword ] = useState<string>('')
	const [ error, setError ] = useState<string | null>(null);

	const use_auth = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log("signState : ", signState);

		try {
			if (signState === 'SignIn') {
				await login(email, password);
			} else {
				await signup(name, email, password)
			}
		} catch (error: any) {
			if (error && error.message) {
				setError(error.message);
			} else {
				setError("An unknown error occured")
			}
		}
	}

	return (
		<div className='login'>
			<img src={logo} alt="Netflix logo" className='login-logo' />
			<div className="login-form">
				<h1>{signState}</h1>
				{error && <div className="error-message">{error}</div>}
				<form onSubmit={use_auth}>
					{
						signState === "SignUp" ?
							<input type="text" placeholder='Enter your Name' value={name} onChange={(e) => setName(e.target.value)} /> :
							<></>
					}
					<input type="email" placeholder='Enter your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
					<input type="password" placeholder='Enter your Password' value={password} onChange={(e) => setPassword(e.target.value)} />
					<button type='submit'>{signState}</button>
					<div className="form-help">
						<div className="remember">
							<input type="checkbox" name="" id="" />
							<label htmlFor="">Remember Me</label>
						</div>
						<p>Need Help?</p>
					</div>
				</form>
				<div className="form-switch">
					{
						signState === "Sign In" ?
							<p>New to Netflix? <span onClick={() => setsignState('SignUp')}>Sign Up Now</span></p> :
							<p>Already have account? <span onClick={() => setsignState('SignIn')}>Sign In Now</span></p>
					}
				</div>
			</div>
		</div>
	)
}

export default Login
