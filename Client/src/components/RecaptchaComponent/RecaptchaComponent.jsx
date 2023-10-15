import ReCAPTCHA from 'react-google-recaptcha';

const RecaptchaComponent = ({
	valid_token,
	ErrorMsg,
	captchaRef,
	SuccessMsg,
}) => {
	const SITE_KEY = import.meta.env
		.VITE_GOOGLE_RECAPTCHA_SECRET_SITE;

	return (
		<div className="App">
			<header className="App-header">
				<div className="logIn-form">
					{valid_token.length > 0 &&
					valid_token[0].success === true ? (
						<h3 className="textSuccess">{SuccessMsg}</h3>
					) : (
						<h3 className="textError">{ErrorMsg} </h3>
					)}

					<ReCAPTCHA
						className="recaptcha"
						sitekey={SITE_KEY}
						ref={captchaRef}
					/>
				</div>
			</header>
		</div>
	);
};

export default RecaptchaComponent;
