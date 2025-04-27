const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center space-y-6">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-72 h-auto mx-auto rounded-2xl shadow-lg"
        >
          <source src="/chat-animation.mp4" type="video/mp4" />
          <source src="/chat-animation.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
