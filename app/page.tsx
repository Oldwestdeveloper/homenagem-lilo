'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { Play, Pause } from 'lucide-react';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAdultPhoto, setShowAdultPhoto] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleOpen = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.error('Erro ao tocar áudio (pode estar ausente ou bloqueado):', e);
      });
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((e) => {
          console.error('Erro ao tocar áudio:', e);
          alert("O arquivo de áudio não foi encontrado ou não é suportado. Certifique-se de adicionar 'irmao.mp3' na pasta 'public/audio/'.");
        });
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      // 5 seconds after opening, change the photo from child to adult
      const timer = setTimeout(() => {
        setShowAdultPhoto(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <main className="relative min-h-[100dvh] lg:h-screen w-full bg-[radial-gradient(circle_at_top_left,#fffdfa_0%,#f7f3ed_100%)] text-[#2d2a26] overflow-x-hidden lg:overflow-hidden">
      {/* Hidden audio element */}
      <audio 
        ref={audioRef} 
        src="/audio/irmao.mp3" 
        loop 
        onError={(e) => console.warn("Erro ao carregar o arquivo de áudio.", e)}
      />

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center min-h-[100dvh] space-y-12"
          >
            <div className="space-y-4 text-center">
              <span className="text-[10px] tracking-[0.3em] uppercase opacity-40 font-bold">Homenagem Especial</span>
              <h1 className="font-playfair text-6xl sm:text-7xl md:text-8xl text-center text-[#8b4513] italic leading-tight">
                LILO
              </h1>
              <span className="text-[10px] tracking-[0.3em] uppercase opacity-40 font-bold">
                Cê foi melhor do que eu pedi <br />
                Quem te mandou foi Deus
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              className="px-8 py-4 bg-[#8b4513] text-white uppercase tracking-[0.2em] text-xs hover:bg-[#6b3510] transition-colors shadow-2xl rounded-lg font-bold"
            >
              Aqui está o verdadeiro texto!
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full min-h-[100dvh] lg:h-full flex flex-col lg:flex-row relative z-10"
          >
            {/* Left sidebar */}
            <div className="w-full lg:w-[420px] shrink-0 flex flex-col p-8 lg:p-12 justify-between border-b lg:border-b-0 lg:border-r border-[#e8e2d8] z-20 lg:h-full lg:sticky lg:top-0 bg-[radial-gradient(circle_at_top_left,#fffdfa_0%,#f7f3ed_100%)]">
              <div className="space-y-1 text-center lg:text-left mb-12 lg:mb-0">
                <span className="text-[10px] tracking-[0.3em] uppercase opacity-40 font-bold">Homenagem Especial</span>
                <h1 className="text-5xl font-playfair italic text-[#8b4513] leading-none">Lilo</h1>
                <p className="text-sm opacity-60 mt-2">É tipo um elo que não quebra, uma fonte que não seca <br />
                  Um amigo que não deixa a gente desistir <br />
                  Você é a paz em meio à guerra, um conselho na hora certa <br />
                  Minha sorte é você existir</p>
              </div>

              {/* Photos */}
              <div className="relative flex items-center justify-center py-10 my-auto lg:my-0">
                <div className="rotate-3 bg-white p-3 w-64 h-80 border border-[#e5e0d8] shadow-xl relative z-10 transition-transform duration-300 hover:scale-[1.02]">
                  <div className="relative w-full h-full bg-[#dcd7ce] overflow-hidden">
                    <AnimatePresence mode="sync">
                      {!showAdultPhoto && (
                        <motion.div
                          key="childPhoto"
                          initial={{ opacity: 1 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                          className="absolute inset-0 z-10"
                        >
                          <Image
                            src="/images/crianca.jpg"
                            alt="Nós quando crianças"
                            fill
                            className="object-cover"
                            priority
                            referrerPolicy="no-referrer"
                          />
                        </motion.div>
                      )}
                      {showAdultPhoto && (
                        <motion.div
                          key="adultPhoto"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                          className="absolute inset-0 z-10"
                        >
                          <Image
                            src="/images/adultos.jpg"
                            alt="Nós hoje"
                            fill
                            className="object-cover"
                            priority
                            referrerPolicy="no-referrer"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Audio indicator */}
              <div className="bg-white/80 border border-[#e8e2d8] p-4 rounded-2xl flex items-center gap-4 shadow-sm backdrop-blur-md mt-12 lg:mt-0">
                <button 
                  onClick={toggleAudio} 
                  className="w-10 h-10 bg-[#8b4513] rounded-full flex items-center justify-center shadow-inner hover:scale-105 active:scale-95 transition-transform text-white cursor-pointer z-10"
                  aria-label={isPlaying ? "Pausar música" : "Tocar música"}
                >
                  {isPlaying ? (
                    <Pause size={16} className="fill-current" />
                  ) : (
                    <Play size={16} className="fill-current ml-1" />
                  )}
                </button>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#2d2a26]">IRMÃO</span>
                  <span className="text-[10px] opacity-50 text-[#2d2a26]">Henrique e Juliano</span>
                </div>
                <div className="ml-auto flex gap-1 items-end h-5">
                  <motion.div animate={isPlaying ? { height: ["40%", "100%", "60%", "100%", "40%"] } : { height: "10%" }} transition={isPlaying ? { repeat: Infinity, duration: 1.2 } : { duration: 0.3 }} className="w-1 bg-[#8b4513]/40 rounded-full"></motion.div>
                  <motion.div animate={isPlaying ? { height: ["80%", "40%", "100%", "60%", "80%"] } : { height: "20%" }} transition={isPlaying ? { repeat: Infinity, duration: 1.5 } : { duration: 0.3 }} className="w-1 bg-[#8b4513] rounded-full"></motion.div>
                  <motion.div animate={isPlaying ? { height: ["100%", "60%", "80%", "40%", "100%"] } : { height: "15%" }} transition={isPlaying ? { repeat: Infinity, duration: 1.1 } : { duration: 0.3 }} className="w-1 bg-[#8b4513]/60 rounded-full"></motion.div>
                  <motion.div animate={isPlaying ? { height: ["60%", "100%", "40%", "80%", "60%"] } : { height: "25%" }} transition={isPlaying ? { repeat: Infinity, duration: 1.3 } : { duration: 0.3 }} className="w-1 bg-[#8b4513]/80 rounded-full"></motion.div>
                </div>
              </div>
            </div>

            {/* Letter Content Section */}
            <div className="flex-1 bg-white relative lg:shadow-2xl z-10 lg:h-full lg:overflow-y-auto overflow-x-hidden">
              {/* Background L */}
              <div className="fixed lg:absolute top-0 right-0 p-8 lg:p-12 opacity-[0.03] text-[15rem] font-playfair select-none italic pointer-events-none leading-none -mt-8 -mr-4 overflow-hidden">L</div>
              
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                className="h-full flex flex-col px-6 py-12 lg:p-16 relative z-10 max-w-3xl mx-auto xl:mx-0 xl:ml-12"
              >
                <div className="flex-1 lg:pr-4">
                  <h2 className="font-playfair text-2xl lg:text-3xl mb-8 lg:mb-12 text-[#8b4513] italic font-bold">Lilo, meu irmão,</h2>
                  
                  <div className="font-playfair text-[#4a453e] text-[16px] md:text-[18px] leading-[1.8] space-y-6 text-justify">
                    <p>
                      Hoje o dia é todo seu! Mais do que primos, a vida fez da
                      gente a melhor dupla. É aquilo que a gente vive na prática
                      desde sempre: <strong>eu por você e você por mim</strong>,
                      não importa a situação.
                    </p>

                    <p>
                      Nossa parceria vem de longe. Lembro perfeitamente de
                      quando éramos crianças, brincando na sala da tia: você
                      focado nos seus desenhos e eu fazendo meus origamis. Ou de
                      quando o tio colocava Victor e Leo pra tocar e a gente
                      cantava com toda a vontade, imaginando que éramos a
                      própria dupla.
                    </p>

                    <p>
                      O tempo passou, a gente cresceu, mas a sintonia continua a
                      mesma. Só mudou o cenário: das brincadeiras na sala,
                      passamos a cantar alto nos shows reais e a aproveitar cada
                      segundo daquelas nossas viagens em família, que sempre
                      rendem as memórias mais inesquecíveis. Quando paro para
                      pensar nas melhores histórias da minha vida, você está em
                      todas elas.
                    </p>

                    <p>
                      Sou muito grato por você topar viver a energia dos rodeios
                      comigo. E já que estamos falando nisso, saber que você vai
                      estar do meu lado para realizar meus dois maiores sonhos –
                      conhecer o Barretão e assistir ao show de Chitãozinho e
                      Xororó – significa o mundo pra mim. Você vai viver isso ao
                      meu lado, exatamente como sempre estivemos um para o outro
                      a vida toda.
                    </p>

                    <p>
                      Hoje também é dia de te lembrar o quanto você é importante
                      para mim. Admiro demais a pessoa genuína e bondosa que
                      você é, além de ser um cara incrivelmente determinado e um
                      verdadeiro guerreiro na vida.
                    </p>

                    <p>
                      Que a vida continue te dando saúde, sucesso e motivos para
                      comemorar, porque de parceria para as próximas aventuras
                      você já sabe que tá garantido.
                    </p>

                    <p>
                      <strong>Te amo para todo o sempre, meu irmão!</strong>
                    </p>
                  </div>
                </div>

                <div className="mt-16 pt-8 border-t border-[#f0ede8] flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 sm:gap-0 pb-12 lg:pb-0">
                  <div className="font-playfair text-[#8b4513] italic opacity-80 text-xl font-medium max-w-[280px] leading-snug">
                    Feliz aniversário e tamo junto sempre! Te amo meu irmão.
                  </div>
                  <div className="text-left sm:text-right mt-4 sm:mt-0">
                    <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold mb-1">Com carinho,</p>
                    <p className="font-playfair text-2xl font-bold italic text-[#2d2a26]">Guilherme</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}