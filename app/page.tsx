"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import Image from "next/image"
import { Play, Pause } from "lucide-react"

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const [showAdultPhoto, setShowAdultPhoto] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleOpen = () => {
    setIsOpen(true)
    if (audioRef.current) {
      audioRef.current.volume = 0.5
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((e) => {
          console.error(
            "Erro ao tocar áudio (pode estar ausente ou bloqueado):",
            e,
          )
        })
    }
  }

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true)
          })
          .catch((e) => {
            console.error("Erro ao tocar áudio:", e)
            alert(
              "O arquivo de áudio não foi encontrado ou não é suportado. Certifique-se de adicionar 'irmao.mp3' na pasta 'public/audio/'.",
            )
          })
      }
    }
  }

  useEffect(() => {
    if (isOpen) {
      // 5 seconds after opening, change the photo from child to adult
      const timer = setTimeout(() => {
        setShowAdultPhoto(true)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[radial-gradient(circle_at_top_left,#fffdfa_0%,#f7f3ed_100%)] text-[#2d2a26]">
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
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex min-h-[100dvh] flex-col items-center justify-center space-y-12"
          >
            <div className="space-y-4 text-center">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
                Homenagem Especial
              </span>
              <h1 className="font-playfair text-center text-6xl leading-tight text-[#8b4513] italic sm:text-7xl md:text-8xl">
                Lilo
              </h1>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
                Cê foi melhor do que eu pedi <br />
                Quem te mandou foi Deus
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              className="rounded-lg bg-[#8b4513] px-8 py-4 text-xs font-bold tracking-[0.2em] text-white uppercase shadow-2xl transition-colors hover:bg-[#6b3510]"
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
            className="relative z-10 mx-auto flex min-h-screen w-full max-w-3xl flex-col overflow-hidden bg-white md:my-8 md:min-h-0 md:rounded-2xl md:shadow-2xl"
          >
            {/* Header Details (Top) */}
            <div className="z-20 flex w-full flex-col items-center border-b-0 border-[#e8e2d8] bg-[radial-gradient(circle_at_top_left,#fffdfa_0%,#f7f3ed_100%)] p-6 pb-0 text-center md:border-b md:p-12 md:pb-8">
              <div className="mt-4 mb-8 space-y-1">
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
                  Homenagem Especial
                </span>
                <h1 className="font-playfair mt-2 text-6xl leading-none text-[#8b4513] italic md:text-7xl">
                  Lilo
                </h1>
                <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed opacity-60 md:mt-6 md:text-[15px]">
                  É tipo um elo que não quebra, uma fonte que não seca{" "}
                  <br className="hidden md:block" />
                  Um amigo que não deixa a gente desistir{" "}
                  <br className="hidden md:block" />
                  Você é a paz em meio à guerra, um conselho na hora certa{" "}
                  <br className="hidden md:block" />
                  Minha sorte é você existir
                </p>
              </div>

              {/* Photos */}
              <div className="relative flex w-full items-center justify-center pt-2 pb-6 md:py-8">
                <div className="relative z-10 h-72 w-60 rotate-3 border border-[#e5e0d8] bg-white p-2.5 shadow-xl transition-transform duration-300 hover:scale-[1.02] md:h-[350px] md:w-72">
                  <div className="relative h-full w-full overflow-hidden bg-[#dcd7ce]">
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
              <div className="mt-6 mb-6 flex w-full max-w-md items-center justify-between rounded-2xl border border-[#e8e2d8] bg-white/90 p-4 shadow-sm backdrop-blur-md md:mt-8 md:mb-0 md:p-5">
                <div className="flex items-center gap-4">
                  <button
                    onClick={toggleAudio}
                    className="z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#8b4513] text-white shadow-inner transition-transform hover:scale-105 active:scale-95"
                    aria-label={isPlaying ? "Pausar música" : "Tocar música"}
                  >
                    {isPlaying ? (
                      <Pause size={18} className="fill-current" />
                    ) : (
                      <Play size={18} className="ml-1 fill-current" />
                    )}
                  </button>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-bold tracking-[0.2em] text-[#2d2a26] uppercase md:text-[15px]">
                      Irmão
                    </span>
                    <span className="text-[11px] text-[#2d2a26] opacity-60 md:text-xs">
                      Henrique e Juliano
                    </span>
                  </div>
                </div>
                <div className="flex h-6 items-end gap-1.5 pr-2 md:h-7">
                  <motion.div
                    animate={
                      isPlaying
                        ? { height: ["40%", "100%", "60%", "100%", "40%"] }
                        : { height: "10%" }
                    }
                    transition={
                      isPlaying
                        ? { repeat: Infinity, duration: 1.2 }
                        : { duration: 0.3 }
                    }
                    className="w-1.5 rounded-full bg-[#8b4513]/40"
                  ></motion.div>
                  <motion.div
                    animate={
                      isPlaying
                        ? { height: ["80%", "40%", "100%", "60%", "80%"] }
                        : { height: "20%" }
                    }
                    transition={
                      isPlaying
                        ? { repeat: Infinity, duration: 1.5 }
                        : { duration: 0.3 }
                    }
                    className="w-1.5 rounded-full bg-[#8b4513]"
                  ></motion.div>
                  <motion.div
                    animate={
                      isPlaying
                        ? { height: ["100%", "60%", "80%", "40%", "100%"] }
                        : { height: "15%" }
                    }
                    transition={
                      isPlaying
                        ? { repeat: Infinity, duration: 1.1 }
                        : { duration: 0.3 }
                    }
                    className="w-1.5 rounded-full bg-[#8b4513]/60"
                  ></motion.div>
                  <motion.div
                    animate={
                      isPlaying
                        ? { height: ["60%", "100%", "40%", "80%", "60%"] }
                        : { height: "25%" }
                    }
                    transition={
                      isPlaying
                        ? { repeat: Infinity, duration: 1.3 }
                        : { duration: 0.3 }
                    }
                    className="w-1.5 rounded-full bg-[#8b4513]/80"
                  ></motion.div>
                </div>
              </div>
            </div>

            {/* Letter Content Section */}
            <div className="relative z-10 flex-1 overflow-hidden bg-white">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                className="relative z-10 mx-auto flex h-full max-w-4xl flex-col px-6 py-12 md:px-12 md:py-16"
              >
                <div className="flex-1">
                  <h2 className="font-playfair mb-8 text-2xl font-bold text-[#8b4513] italic md:mb-12 md:text-3xl">
                    Lilo, meu irmão,
                  </h2>

                  <div className="font-playfair space-y-6 text-justify text-[16px] leading-[1.8] text-[#4a453e] md:text-[18px]">
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

                <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-[#f0ede8] pt-8 pb-12 sm:flex-row sm:items-end sm:gap-0 lg:pb-0">
                  <div className="font-playfair max-w-[280px] text-xl leading-snug font-medium text-[#8b4513] italic opacity-80">
                    Feliz aniversário e tamo junto sempre!
                  </div>
                  <div className="mt-4 text-left sm:mt-0 sm:text-right">
                    <p className="mb-1 text-[10px] font-bold tracking-widest uppercase opacity-40">
                      Com carinho,
                    </p>
                    <p className="font-playfair text-2xl font-bold text-[#2d2a26] italic">
                      Guilherme
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
