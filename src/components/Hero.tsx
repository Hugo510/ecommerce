import React from 'react';

function Hero() {
  return (
    <div className="relative bg-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 py-40 sm:py-52">
        <div className="text-center">
          <div className="inline-block">
            <p className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full text-white text-sm font-medium tracking-wider uppercase mb-12">
              Premium Musical Instruments
            </p>
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl mb-8">
            <span className="block font-light bg-gradient-to-r from-white via-white to-white/70 text-transparent bg-clip-text">Discover Your</span>
            <span className="block mt-3">Perfect Sound</span>
          </h1>
          <p className="mt-8 max-w-md mx-auto text-lg text-zinc-400 sm:max-w-xl">
            Curated collection of premium instruments and audio equipment for musicians who demand excellence.
          </p>
          <div className="mt-16 flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="#shop"
              className="group relative px-8 py-4 bg-white text-black rounded-2xl text-sm font-medium overflow-hidden"
            >
              <div className="absolute inset-0 bg-black/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative">Shop Collection</span>
            </a>
            <a
              href="#virtual"
              className="group px-8 py-4 bg-white/10 backdrop-blur-xl text-white rounded-2xl text-sm font-medium border border-white/10 hover:bg-white/[0.15] transition-colors duration-300"
            >
              Virtual Tour
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;