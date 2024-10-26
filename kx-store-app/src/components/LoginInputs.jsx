function LoginInputs() {
  return (
    <div className="w-96">
      <p>Email</p>
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full bg-transparent border-2 border-slate-400 focus:outline-none focus:border-slate-600 p-1 pl-2 rounded-xl text-slate-950 mb-3"
      />
      <p>Password</p>
      <input
        type="password"
        placeholder="Enter your password"
        className="w-full bg-transparent border-2 border-slate-400 focus:outline-none focus:border-slate-600 p-1 pl-2 rounded-xl text-slate-950"
      />
    </div>
  );
}

export default LoginInputs;
