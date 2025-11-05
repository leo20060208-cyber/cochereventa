"use client";

import React, { useEffect, useRef } from 'react';

const AnimatedCard = () => {
  const topRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const animateBorder = () => {
      const now = Date.now() / 1000;
      const speed = 0.5; // Animation speed
      
      // Calculate positions based on time
      const topX = Math.sin(now * speed) * 100;
      const rightY = Math.cos(now * speed) * 100;
      const bottomX = Math.sin(now * speed + Math.PI) * 100;
      const leftY = Math.cos(now * speed + Math.PI) * 100;
      
      // Apply positions to elements
      if (topRef.current) topRef.current.style.transform = `translateX(${topX}%)`;
      if (rightRef.current) rightRef.current.style.transform = `translateY(${rightY}%)`;
      if (bottomRef.current) bottomRef.current.style.transform = `translateX(${bottomX}%)`;
      if (leftRef.current) leftRef.current.style.transform = `translateY(${leftY}%)`;
      
      requestAnimationFrame(animateBorder);
    };
    
    const animationId = requestAnimationFrame(animateBorder);
    return () => cancelAnimationFrame(animationId);
  }, []);
  
  return (
    <div className="relative w-full max-w-4xl bg-black/20 backdrop-blur-sm rounded-2xl p-4 md:p-6 overflow-hidden border border-white/20">
      {/* Animated border elements */}
      <div className="absolute top-0 left-0 w-full h-0.5 overflow-hidden">
        <div 
          ref={topRef}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
        ></div>
      </div>
      
      <div className="absolute top-0 right-0 w-0.5 h-full overflow-hidden">
        <div 
          ref={rightRef}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"
        ></div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-0.5 overflow-hidden">
        <div 
          ref={bottomRef}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
        ></div>
      </div>
      
      <div className="absolute top-0 left-0 w-0.5 h-full overflow-hidden">
        <div 
          ref={leftRef}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"
        ></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">
          <span className="text-white">¿Por qué</span>{' '}
          <span className="text-blue-400">
            Importar un Coche?
          </span>
        </h1>
        
        <p className="text-white/90 max-w-3xl mx-auto mb-6 text-sm leading-relaxed font-medium">
          Importar un coche significa acceder a vehículos en mercados europeos donde la oferta es mayor, 
          los precios son más bajos y el estado de los coches suele ser mucho mejor que en España. 
          Nosotros nos encargamos de traerlo, homologarlo y legalizarlo para que lo disfrutes sin preocupaciones.
        </p>
        
        {/* Simple Map Visual */}
        <div className="flex items-center justify-center space-x-6 mb-8">
          <div className="text-center">
            <p className="font-semibold text-white text-sm">Alemania</p>
          </div>
          <div className="text-3xl text-blue-400 font-bold">→</div>
          <div className="text-center">
            <p className="font-semibold text-white text-sm">España</p>
          </div>
          <div className="text-3xl text-blue-400 font-bold">→</div>
          <div className="text-center">
            <p className="font-semibold text-white text-sm">Tu casa</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              icon: "€",
              title: "Mejor Precio",
              description: "Audi A4 2020 → Alemania: 18.500€ | España: 23.900€"
            },
            {
              icon: "MANTENIMIENTO",
              title: "Mejor Cuidado",
              description: "Los coches europeos suelen tener menos desgaste y mejor mantenimiento"
            },
            {
              icon: "VARIEDAD",
              title: "Más Variedad",
              description: "Acceso a modelos y configuraciones difíciles de encontrar en España"
            },
            {
              icon: "✓",
              title: "Todo Incluido",
              description: "Revisión, papeles, ITV y entrega en tu casa"
            }
          ].map((item, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-white/20"
            >
              <div className="text-left">
                <h3 className="font-bold text-white text-lg mb-2 tracking-tight">{item.title}</h3>
                <p className="text-xs text-white/80 leading-relaxed font-medium">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-blue-400 animate-pulse"></div>
      <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-blue-400 animate-pulse"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-blue-400/10 blur-xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-blue-400/10 blur-xl"></div>
    </div>
  );
};

export default AnimatedCard;
