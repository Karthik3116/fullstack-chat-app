import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="flex flex-col justify-center items-center min-h-screen bg-base-200 text-base-content px-4">
    <div className="flex flex-col items-center text-center space-y-4">
      <h1 className="text-6xl font-bold text-error animate-bounce">404</h1>
      <p className="text-xl h-10">
        <span className="typing-text border-r-2 border-base-content pr-1">
          Oops! The page you're looking for doesn't exist or has been moved.
        </span>
      </p>
      <Link to="/" className="btn btn-primary btn-wide animate-pulse mt-4">
        Go Home
      </Link>
    </div>

    {/* Smooth typing animation style */}
    <style>{`
      .typing-text {
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        width: 0ch;
        animation: typing 4s steps(60, end) forwards, blink 0.75s step-end infinite;
      }

      @keyframes typing {
        from { width: 0ch; }
        to { width: 60ch; }
      }

      @keyframes blink {
        50% { border-color: transparent; }
      }
    `}</style>
  </div>
);

export default NotFoundPage;
