import React, { useState, useRef } from 'react';
import { Eye, EyeOff, Shield, Smartphone, Copy, CheckCircle } from 'lucide-react';
import QRCode from 'qrcode';
import { TOTP, Secret } from 'otpauth';
import ReCAPTCHA from 'react-google-recaptcha';

interface AuthFormProps {
  activeTab: 'signin' | 'signup';
  setActiveTab: (tab: 'signin' | 'signup') => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ activeTab, setActiveTab }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    companyName: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState<'form' | '2fa-setup' | '2fa-verify'>('form');
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [secretCopied, setSecretCopied] = useState(false);
  
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const setup2FA = async () => {
    const totp = new TOTP({
      issuer: 'Riskify',
      label: formData.email,
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
      secret: Secret.fromBase32(Secret.fromLatin1(Math.random().toString(36)).base32)
    });

    const qrCodeUrl = totp.toString();
    const qrCodeDataUrl = await QRCode.toDataURL(qrCodeUrl);
    
    setQrCode(qrCodeDataUrl);
    setSecret(totp.secret.base32);
    setStep('2fa-setup');
  };

  const verify2FA = () => {
    // In a real app, you would verify the code on the server
    if (verificationCode.length === 6) {
      // Simulate successful verification
      setStep('form');
      alert('Account created successfully with 2FA enabled!');
      // Reset form
      setFormData({
        email: '',
        password: '',
        fullName: '',
        companyName: '',
        confirmPassword: ''
      });
      setVerificationCode('');
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recaptchaToken) {
      alert('Please complete the reCAPTCHA verification');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (activeTab === 'signup') {
      await setup2FA();
    } else {
      // For sign in, simulate successful login
      alert('Sign in successful!');
    }
    
    setIsLoading(false);
  };

  const copySecret = () => {
    navigator.clipboard.writeText(secret);
    setSecretCopied(true);
    setTimeout(() => setSecretCopied(false), 2000);
  };

  if (step === '2fa-setup') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Set up Two-Factor Authentication</h2>
          <p className="text-gray-600">Secure your account with 2FA using your mobile device</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Step 1: Scan QR Code</h3>
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <img src={qrCode} alt="QR Code" className="w-48 h-48" />
            </div>
            <p className="text-sm text-gray-600 text-center">
              Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Step 2: Manual Entry (Optional)</h3>
          <p className="text-sm text-gray-600 mb-3">
            If you can't scan the QR code, enter this secret key manually:
          </p>
          <div className="flex items-center space-x-2">
            <code className="flex-1 bg-white px-3 py-2 rounded border text-sm font-mono">
              {secret}
            </code>
            <button
              onClick={copySecret}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {secretCopied ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <button
          onClick={() => setStep('2fa-verify')}
          className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
        >
          Continue to Verification
        </button>
      </div>
    );
  }

  if (step === '2fa-verify') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
            <Smartphone className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Device</h2>
          <p className="text-gray-600">Enter the 6-digit code from your authenticator app</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Verification Code
            </label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-center text-2xl font-mono tracking-widest"
              placeholder="000000"
              maxLength={6}
            />
          </div>

          <button
            onClick={verify2FA}
            disabled={verificationCode.length !== 6}
            className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Verify and Complete Setup
          </button>

          <button
            onClick={() => setStep('2fa-setup')}
            className="w-full text-gray-600 hover:text-gray-800 transition-colors"
          >
            Back to QR Code
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Riskify</h1>
        <p className="text-gray-600">Professional safety solutions for high-level stakeholders</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('signin')}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === 'signin'
                ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === 'signup'
                ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Sign Up
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Get Started</h2>
            <p className="text-gray-600">
              {activeTab === 'signin' 
                ? 'Sign in to your account to start building professional limited documents'
                : 'Sign up to your account to start building professional limited documents'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'signup' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="John Smith"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="ABC Construction Pte Ltd"
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email or Mobile Number
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="user@example.com or 04xxxxxxxx"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {activeTab === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'signup' && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Privacy Tools</h3>
                <p className="text-sm text-gray-600">
                  Read our privacy policy to understand how we protect your data
                </p>
              </div>
            )}

            <div className="flex justify-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Test key
                onChange={setRecaptchaToken}
                theme="light"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !recaptchaToken}
              className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Processing...' : (activeTab === 'signin' ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            By signing up, you agree to our{' '}
            <a href="#" className="text-emerald-600 hover:text-emerald-700">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-emerald-600 hover:text-emerald-700">Privacy Policy</a>
          </div>
        </div>
      </div>

      <div className="text-center space-y-2">
        <div className="flex justify-center space-x-6 text-sm">
          <a href="#" className="text-gray-500 hover:text-gray-700">Terms & Conditions</a>
          <a href="#" className="text-gray-500 hover:text-gray-700">Security Guidelines</a>
          <a href="#" className="text-gray-500 hover:text-gray-700">Professional Guide</a>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;