export type AboutItem = {
    year: string;
    title: string;
    secondTitle?: string;
    text: string[];
    secondText?: string[];
    thirdTitle?: string;
    thirdText?: string[];
    images: {
        src: string;
        alt: string;
    }[];
    videos?: {
        src: string;
        title: string;
    }[];
}

export const about: AboutItem[] = [
    {
        year: "1900–1949",
        title: "The early years",
        text: [
            "Every great story has a beginning. This one starts in a small town in Bavaria, Germany. After starting out in his mother’s laundry room, Adi Dassler and his brother register the ‘Gebrüder Dassler Schuhfabrik’ in 1924 and Adi embarks on his mission to provide athletes with the best possible equipment. Gold medals in Amsterdam(1928), Los Angeles (1932) and Berlin(1936) are the first rewards and milestones – and only the start of our story."
        ],
        images: [
            {
                src: "/history/1900_01.webp",
                alt:
                    "Adi Dassler, founder of adidas, in the Gebrüder Dassler Schuhfabrik.",
            },
            {
                src: "/history/1900_02.webp",
                alt: "Lina Radke wearing Gebrüder Dassler shoes.",
            },
            {
                src: "/history/1900_03.webp",
                alt: "Adi Dassler gathering feedback from athletes.",
            },
            {
                src: "/history/1900_04.webp",
                alt: "Adi Dassler talking to athletes.",
            },
        ]
    },
    {
        year: "1949",
        title: "Founding Father",
        text: [
            "On August 18, 1949, Adi Dassler starts a new chapter at the age of 49, registering the ‘Adolf Dassler adidas Sportschuhfabrik’ and setting to work with 47 employees in the small town of Herzogenaurach. In the same year, he registers a shoe that features the soon- to - become - famous adidas 3 - Stripes. From humble beginnings to a global success story – accelerated by a miracle(but more on that later)..."
        ],
        images: [
            {
                src: "/history/1949_01.webp",
                alt: "Adi Dassler in Herzogenaurach",
            },
            {
                src: "/history/1949_02.webp",
                alt: "Dassler logo seal",
            }
        ]
    },
    {
        year: "1950",
        title: "A Football Boot with a Stylish Future",
        text: [
            "Weighing in at 357 grams, the first Samba looks very different to the streetwear icon we know and love today.Launched in 1950, the shoe is originally created as a football boot for icy and snowy pitches. Fast forward to today and the shoe has gone through quite the transformation, becoming one of the coolest kicks off the pitch."
        ],
        images: [
            {
                src: "/history/1950_01.webp",
                alt: "1950 Samba boot"
            }
        ]
    },
    {
        year: "1954",
        title: "A Miracle in Bern",
        text: [
            "Who would have thought that screw-in studs on lightweight football boots would help write history? When the German national football team face the unbeatable Hungarians in the 1954 World Cup final, they win so much more than just a trophy.Their unbelievable victory would be heard around the world for decades to come; and it makes adidas and its founder a household name on football pitches everywhere."
        ],
        images: [
            {
                src: "/history/1954_01.webp",
                alt: "Newspaper about the Miracle in Bern"
            },
            {
                src: "/history/1954_02.webp",
                alt: "German national football team 1954"
            }
        ]
    },
    {
        year: "1959",
        title: "Bonjour adidas France",
        secondTitle: "Production on Home Soil",
        text: [
            "Adi Dassler’s son, Horst, is tasked with opening a new production facility in France, with the goal of using the established shoe- making industry in the country, to make shoes at a more competitive price. Horst is just 23 - years old at the time, but he’s eager to step up to the plate.In doing so, he lays the groundwork for adidas France.",
        ],
        secondText: [
            "In the same year, the adidas Scheinfeld factory opens in Germany, close to the adidas HQ in Herzogenaurach. The factory is still in operation today and continues to produce shoe models, including the Copa Mundial."
        ],
        images: [
            {
                src: "/history/1959_01.webp",
                alt: "adidas France factory opening"
            },
            {
                src: "/history/1959_02.webp",
                alt: "Scheinfeld factory in Germany"
            }
        ]
    },
    {
        year: "1967",
        title: "The First Tracksuit",
        text: [
            "What’s in a name? Everything, especially when you name it after a “Kaiser”. When the Franz Beckenbauer tracksuit model celebrates its debut, it becomes the first piece of apparel for adidas and opens a whole new business to a company that, so far, is famous for shoes. Since 1967, the adidas tracksuit has seen many iterations and interpretations, but has often returned to the original influences of the Franz Beckenbauer."
        ],
        images: [
            {
                src: "/history/1967_01.webp",
                alt: "Franz Beckenbauer wearing the first adidas tracksuit"
            },
            {
                src: "/history/1967_02.webp",
                alt: "The first adidas tracksuit jacket"
            }
        ]
    },
    {
        year: "1968–1970",
        title: "Only the Best for the Athlete",
        text: [
            "How do you consistently earn the trust of world-class athletes through the decades? Produce innovative products that make them even better. Adi Dassler’s secret to success has an additional personal ingredient: He meets with athletes, listens carefully to what they say, and constantly observes what can be improved or even invented to support their needs.The best of the best trust adidas and its founder from the beginning — and this does not change throughout the decades to come."
        ],
        images: [
            {
                src: "/history/1968_01.webp",
                alt: "Bob Beamon long jump world record"
            },
            {
                src: "/history/1968_02.webp",
                alt: "Dick Fosbury high jump technique"
            },
            {
                src: "/history/1968_03.webp",
                alt: "Rod Laver winning Grand Slams in adidas shoes"
            }
        ]
    },
    {
        year: "1970",
        title: "One Ball for All",
        text: [
            "Footwear for gold medal winners? Check. Now, how about something to kick around during the world’s biggest tournament? Consider it done. In 1970, adidas delivers the official ball, TELSTAR, for the 1970 FIFA World Cup™ for the first time. As the name TELSTAR already indicates, the ball is designed to improve visibility on black and white television. It signifies the beginning of a wonderful partnership, with adidas providing the official match ball for every FIFA World Cup™. Since 1970, each adidas World Cup match ball showcases significant refinements to its predecessor – both technically and aesthetically."
        ],
        images: [
            {
                src: "/history/1970_01.webp",
                alt: "Telstar football"
            }
        ]
    },
    {
        year: "1972",
        title: "The Trefoil is Born",
        secondTitle: "Becoming a True Multi-Sports Specialist",
        text: [
            "In 1972, adidas presents a new logo that was here to stay: the Trefoil. Then, symbolizing performance. Today, the adidas Originals collection stands for lifestyle and streetwear inspired by sport and the culture born from it. Times may change, but the trefoiled quality will always remain.",
        ],
        secondText: [
            "From Herzogenaurach to the rest of the world: the 3-Stripes keep expanding to more and more sports throughout the years. This is reflected in the broad range of athletes who trust adidas to make them better. Besides the usual suspects, such as the world’s best football players – like the Argentinean national team – gymnast Nadia Comaneci scores a perfect 10, repeatedly."
        ],
        images: [
            {
                src: "/history/1972_01.svg",
                alt: "The Trefoil logo"
            },
            {
                src: "/history/1972_02.webp",
                alt: "Argentinean football team wearing adidas"
            },
            {
                src: "/history/1972_03.webp",
                alt: "Nadia Comaneci in competition"
            },
            {
                src: "/history/1972_04.webp",
                alt: "adidas multi-sport gear 1970s"
            }
        ]
    },
    {
        year: "1973",
        title: "“People Think I’m a Shoe”",
        text: [
            "Close your eyes and think of a classic white sneaker. For many people, it looks something like this: A sleek, timeless, lace-up design with an off-white sole and a pop of green shading on the heel cap and tongue. Synonymous with classic style, an everyday staple of footwear history, the Stan Smith shoe, which launched in 1973, is a true sportswear icon, but did you know it started life as a tennis shoe, named after one of the sport’s biggest stars.",
            "The Stan Smith is originally developed with a French player in the mid-60s. In 1973, the first shoes featuring Stan’s name are released and by the 1980s, the shoe’s popularity was taking off beyond the tennis court. By 1989, adidas and Stan Smith make their way into the Guinness Book of Records after selling a staggering 22 million pairs."
        ],
        images: [
            {
                src: "/history/1973_02.webp",
                alt: "Stan Smith white-green original"
            },
            {
                src: "/history/1973_03.webp",
                alt: "Stan Smith blue leather edition"
            },
            {
                src: "/history/1973_04.webp",
                alt: "Stan Smith artist edition"
            },
            {
                src: "/history/1973_05.webp",
                alt: "Stan Smith black edition"
            },
            {
                src: "/history/1973_06.webp",
                alt: "Stan Smith pride edition"
            },
            {
                src: "/history/1973_07.webp",
                alt: "Stan Smith Mylo edition"
            }
        ]
    },
    {
        year: "1978",
        title: "Death of a Shoemaker",
        text: [
            "Adi Dassler dies on September 6, shortly before his 78th birthday. The man who almost single-handedly redefined the sporting goods industry and lifted the benchmark by a mile, leaves behind a flourishing company. Yet, the end of one Dassler era became the start of another: Adi’s wife, Käthe, with support from her son Horst, takes over."
        ],
        images: [
            {
                src: "/history/1978_01.webp",
                alt: "Adi Dassler in remembrance"
            }
        ]
    },
    {
        year: "1982",
        title: "A Football Boot for the World",
        text: [
            "Designed for the 1982 FIFA World Cup™ in Spain, the Copa Mundial (Spanish for ‘World Cup’) goes on to become adidas’ most-produced football boot of all time. Made in Germany, the shoe is still produced at the Scheinfeld factory, which is close to the adidas HQ. The shoe’s timeless design makes it a beloved boot for amateurs and professionals alike. Formfitting and with a soleplate durable enough to endure multiple seasons, the Copa Mundial has seen many iterations since the ‘80s, each paying tribute to the original classic."
        ],
        images: [
            {
                src: "/history/1982_01.webp",
                alt: "adidas Copa Mundial football boot"
            }
        ]
    },
    {
        year: "1984",
        title: "A Computer for Your Feet",
        text: [
            "It sounds quite common today, but back in the ‘80s, a computer did not belong, much less fit, in your shoe; that didn’t stop adidas from putting one in there. An innovation ahead of its time, the Micropacer, features a system that provides performance statistics to athletes."
        ],
        images: [
            {
                src: "/history/1984_01.webp",
                alt: "adidas Micropacer running shoe"
            }
        ]
    },
    {
        year: "1986",
        title: "When Street Culture Meets Sports Culture",
        secondTitle: "The Birth of a Street Icon",
        thirdTitle: "Evolution of an Icon",
        text: [
            "When US-based hip-hop group Run-D.M.C. released “My Adidas,” it set the record straight about youth culture, their passions, and pure enthusiasm about their sneakers. adidas itself only finds out about this love story when the band hold up the 3-Stripes shoes during a concert in front of 40,000 fans – one of these concertgoers is an adidas employee. The song becomes a hit and Run-D.M.C. and adidas unexpectedly find themselves in a unique partnership. This moment signifies the birth of non-athletic promotions in the sporting goods industry.",
        ],
        secondText: [
            "And the shoe that started it all? Well, that was the Superstar. Originally launched in 1970, it wasn’t until Run-D.M.C removed the laces and penned their famous song, that the Superstar name was cemented in history as an icon on the streets.",
            "Did you know the Supergrip was the predecessor to the Superstar? First developed in the 1960s, it is the first low-top leather basketball shoe. By the 1970s, the Superstar arrives on the scene with its iconic feature: the shell toe."
        ],
        thirdText: [
            "From the court to the streets, the Superstar transformed into countless variations, each telling its own story."
        ],
        images: [
            {
                src: "/history/1986_01.webp",
                alt: "Run D.M.C. concert crowd with adidas shoes"
            },
            {
                src: "/history/1986_02.webp",
                alt: "adidas Superstar white-black classic"
            },
            {
                src: "/history/1986_03.webp",
                alt: "adidas Superstar black-white"
            },
            {
                src: "/history/1986_04.webp",
                alt: "adidas Superstar red-white"
            },
            {
                src: "/history/1986_05.webp",
                alt: "adidas Superstar blue edition"
            },
            {
                src: "/history/1986_06.webp",
                alt: "adidas Superstar signed Run D.M.C. edition"
            }
        ]
    },
    {
        year: "1989",
        title: "adidas Becomes a Stock Corporation",
        secondTitle: "A Systematic Shift for Running",
        text: [
            "Horst Dassler’s sudden death in 1987, three years after his mother, Käthe, passed away, means troubled waters for adidas. In 1989, adidas becomes a stock corporation and Adi Dassler's daughters sell their shares in 1990. After Adi Dassler’s daughters exit the company, the change in leadership and questionable strategic decisions cause a record loss in 1992 and bring the company close to bankruptcy. But who doesn’t love a comeback story?",
        ],
        secondText: [
            "adidas introduces the Torsion System, and in doing so, takes running innovation to the next level by allowing for more natural foot movement. Offering greater stability and a strong push-off during an athlete’s foot stride, the Torsion Bar at the midfoot prevents the shoe from bending under the arch of the foot.",
            "The Torsion System was first featured in the ZX franchise in the late ‘80s. The system continued to evolve, and an updated version of it was later incorporated in the first Boost shoe in 2013 – once again becoming an integral part of the overall shoe design."
        ],
        images: [
            {
                src: "/history/1989_01.webp",
                alt: "Adidas stock corporation 1989"
            },
            {
                src: "/history/1989_02.webp",
                alt: "Torsion System running shoe"
            }
        ]
    },
    {
        year: "1991",
        title: "The Essentials of Performance",
        text: [
            "The adidas EQT (Equipment) franchise launches in 1991. The intent is to design a shoe solely to meet the needs of athletes by offering only the essentials of performance, protection, and comfort, while stripping away everything that was not necessary. In the early ‘90s, the minimal style is truly disruptive."
        ],
        images: [
            {
                src: "/history/1991_01.webp",
                alt: "adidas EQT Equipment 1991"
            }
        ]
    },
    {
        year: "1993",
        title: "A New Leader, a New Chapter",
        text: [
            "In 1993 Robert Louis-Dreyfus becomes CEO. He takes over during a challenging point in adidas history. Together with Christian Tourres, he understands that the almost bankrupt adidas did not need to be reinvented, it simply needed a new direction. He turns the sleeping giant from a sales-driven to a marketing-driven company, steering adidas back on the path of growth. In 1995, six years after becoming a stock corporation, adidas goes public and its new marketing slogan could not sum it up better: “We knew then, we know now”.",
            "Since 1987, only a handful of people have been trusted to lead adidas. René C Jäggi (1987 – 1992), Gilberte Beaux (interim 1992 – 1993), Robert Louis-Dreyfus (1993 – 2001), Herbert Hainer (2001 – 2016), Kasper Rorsted (2016 – 2022), and our current CEO Bjørn Gulden (2023 – present), have each played an important part in shaping the company."
        ],
        images: [
            {
                src: "/history/1993_01.webp",
                alt: "From Vice President of Marketing to CEO. In 1987 René C Jäggi becomes the company's first CEO after Horst Dassler."
            },
            {
                src: "/history/1993_02.webp",
                alt: "Gilberte Beaux is the first female CEO, albeit interim, after adidas' transition to a stock corporation. She leads the company during the period before Robert Louis-Dreyfus."
            },
            {
                src: "/history/1993_03.webp",
                alt: "Robert Louis-Dreyfus was CEO from 1993 to 2001, orchestrating a successful turnaround with a clear focus on marketing and international expansion."
            },
            {
                src: "/history/1993_04.webp",
                alt: "Herbert Hainer is the company's longest-serving CEO, taking the reigns from 2001 to 2016. He leads the company into new area of growth based on great innovations including Climacool (2002), adizero (2004), Boost (2013)."
            },
            {
                src: "/history/1993_05.webp",
                alt: "Kasper Rorsted begins to steer adidas towards a digital era, after leading the German consumer goods company Henkel for eight years."
            },
            {
                src: "/history/1993_06.webp",
                alt: "In 2023 Bjørn Gulden becomes CEO. A true sports Romantic, Bjørn has almost 30 years of experience in the Sports industry. Bjørn started his career at adidas in the 1990s and returns to the 3 Stripes to take the company into a new era."
            }
        ]
    },
    {
        year: "1994",
        title: "A Football Legend is Born",
        text: [
            "Since 1994, the Predator football boot has been worn by the world’s top players; its distinctive look and iconic tongue—featured in some versions—has graced the pitch for many of football’s most momentous matches. The secret to the shoe’s success? That lies in the rippled rubber fins that provide increased power, swerve, and ball control."
        ],
        images: [
            {
                src: "/history/1994_01.webp",
                alt: "Predator Liga"
            },
            {
                src: "/history/1994_02.webp",
                alt: "Predator Accelerator SG"
            },
            {
                src: "/history/1994_03.webp",
                alt: "Predator Absolute SG"
            },
            {
                src: "/history/1994_04.webp",
                alt: "Predator Powerswerve"
            },
            {
                src: "/history/1994_05.webp",
                alt: "Predator Primeknit"
            },
            {
                src: "/history/1994_06.webp",
                alt: "Predator Elite"
            }
        ]
    },
    {
        year: "1997",
        title: "Salomon Joins as New Team Member",
        text: [
            "adidas adds a new member to its team. With the acquisition of the Salomon Group and its brands Salomon, TaylorMade, Mavic, and Bonfire, the company changes its name to adidas-Salomon AG."
        ],
        images: [
            {
                src: "/history/1997_01.webp",
                alt: "adidas-Salomon AG logo"
            }
        ]
    },
    {
        year: "1999",
        title: "An Icon for Women’s Football",
        text: [
            "Released in 1999, Icon is the first official match ball that adidas designs specifically for the FIFA Women’s World Cup™. The ball’s colorful design showcases the landmarks of the different host cities of the U.S. Each official match ball since 1999 is totally unique to the tournament it was designed for. The 2023 official match ball of the FIFA Women’s World Cup™, held in Australia and New Zealand, is inspired by the vast mountains of New Zealand and Australia’s connection with the Indian Ocean."
        ],
        images: [
            {
                src: "/history/1999_01.webp",
                alt: "Icon (1999)"
            },
            {
                src: "/history/1999_02.webp",
                alt: "Fevernova (2002)"
            },
            {
                src: "/history/1999_03.webp",
                alt: "Teamgeist (2006)"
            },
            {
                src: "/history/1999_04.webp",
                alt: "Jabulani (2010)"
            },
            {
                src: "/history/1999_05.webp",
                alt: "Conext15 (2015)"
            },
            {
                src: "/history/1999_06.webp",
                alt: "Conext19 (2019)"
            },
            {
                src: "/history/1999_07.webp",
                alt: "Oceaunz (2023)"
            }
        ]
    },
    {
        year: "2000",
        title: "New Century, New Divisions",
        text: [
            "As the new century starts, adidas reinvents the game again. In addition to its sport performance offering, adidas is the first in the industry to introduce a new lifestyle segment, focusing on sports-inspired streetwear. In the years to come, new partnerships with Yohji Yamamoto (2001) Stella McCartney (2002), and Pharrell Williams (2014) are born along with exciting labels, such as Y-3 (2003)."
        ],
        images: [
            {
                src: "/history/2000_01.webp",
                alt: "Yohji Yamamoto – floral dress design for adidas"
            },
            {
                src: "/history/2000_02.webp",
                alt: "Stella McCartney – gold sneaker design for adidas"
            },
            {
                src: "/history/2000_03.webp",
                alt: "Pharrell Williams – blue sneaker design for adidas"
            }
        ]
    },
    {
        year: "2004",
        title: "Impossible? Just a Big Word",
        text: [
            "In one of its most memorable marketing campaigns, adidas shows its biggest athletes, including David Beckham and Haile Gebrselassie, facing their fears, defeats, and challenges head-on only to prove that, indeed, ‘Impossible is Nothing.’ The slogan becomes synonymous with reaching your goals."
        ],
        images: [
            {
                src: "/history/2004_01.webp",
                alt: "adidas Impossible is Nothing campaign featuring David Beckham"
            },
            {
                src: "/history/2004_02.webp",
                alt: "adidas Impossible is Nothing campaign featuring Muhammad Ali"
            },
            {
                src: "/history/2004_03.webp",
                alt: "adidas Impossible is Nothing campaign featuring Laila Ali"
            }
        ]
    },
    {
        year: "2006",
        title: "Salomon Leaves the Team, Reebok Joins the Family",
        text: [
            "One year after adidas and Salomon go their separate ways — when the latter and its brands (excluding TaylorMade) are sold — adidas acquires Reebok, including the brands Rockport and Reebok-CCM Hockey. This brings together two of the world’s most respected and best-known companies in the sporting goods industry."
        ],
        images: [
            {
                src: "/history/2006_01.webp",
                alt: "adidas and Reebok join forces after Salomon leaves the group"
            }
        ]
    },
    {
        year: "2011",
        title: "What Belongs Together Comes Together",
        secondTitle: "adidas Acquires Five Ten",
        text: [
            "From the court to the catwalk, from the stadium to the streets. The adidas brand offers apparel and footwear for every sport, every sense of fashion, and every style, whether you are an athlete or fashionista. In 2011, adidas brings together sport, life on the streets, and style for the first time in one campaign to tell the world what it means to go all in, heart over head, and choose inclusion over your ego. The 'adidas is All In' campaign features the likes of Lionel Messi, David Beckham, and Derrick Rose; the campaign grew from the idea that whatever your goals or challenges may be, you have to go all in for the ultimate success.",
        ],
        secondText: [
            "When you are already great, how do you become even better? You keep on training or you join forces with someone who complements you and your strengths. In 2011, adidas acquires Five Ten, a leading brand in the technical outdoor market and within the outdoor action sport community.",
        ],
        images: [
            {
                src: "/history/2011_01.webp",
                alt: "Five Ten logo",
            },
            {
                src: "/history/2011_02.webp",
                alt: "adidas Acquires Five Ten 2011",
            },
        ],
    },
    {
        year: "2013",
        title: "Endless Innovation",
        text: [
            "Running has changed forever. Those are big words and history will tell us if it is true. adidas introduces the Energy Boost running shoe, which features a completely new cushioning material. Created in cooperation with the German chemical company BASF, the material combines a soft and responsive cushioning, which runners previously thought of as a contradiction of benefits; the result turns out to be a running experience unlike any other."
        ],
        images: [
            {
                src: "/history/2013_01.webp",
                alt: "Energy Boost - phase 1"
            },
            {
                src: "/history/2013_02.webp",
                alt: "Energy Boost - phase 2"
            },
            {
                src: "/history/2013_03.webp",
                alt: "Energy Boost - phase 3"
            },
            {
                src: "/history/2013_04.webp",
                alt: "Energy Boost - phase 4"
            }
        ]
    },
    {
        year: "2015",
        title: "Runtastic News",
        text: [
            "Driven by their commitment to inspire and enable athletes of all levels to harness the power of sport in their lives, adidas acquires the fitness app Runtastic in 2015. The addition of Runtastic to the adidas portfolio, is an investment into the convergence of sport, digital and data in an always connected world."
        ],
        images: [
            {
                src: "/history/2015_01.webp",
                alt: "Runtastic app on phone next to adidas shoe"
            },
            {
                src: "/history/2015_02.webp",
                alt: "adidas Running and Training app UI by Runtastic"
            },
            {
                src: "/history/2015_03.webp",
                alt: "Runner training, adidas x Runtastic era"
            }
        ]
    },
    {
        year: "2017",
        title: "Taking Innovation to the Fourth Dimension",
        text: [
            "adidas unveils Futurecraft 4D, the world’s first high performance piece of footwear, featuring midsoles crafted with light and oxygen using Digital Light Synthesis—a technology pioneered by Carbon. The process of Digital Light Synthesis enables adidas to bring the most personalized performance products into reality by precisely addressing the needs of each athlete, with respect to movement, cushioning, stability, and comfort."
        ],
        images: [
            {
                src: "/history/2017_01.webp",
                alt: "Futurecraft 4D"
            }
        ]
    },
    {
        year: "2019",
        title: "Home sweet home",
        text: [
            "adidas celebrates the opening of its new office building called Arena, finalizing the expansion of the company’s headquarters from the “World of Sports” in Herzogenaurach, Germany. Now, for the first time ever, all Herzo-based employees are located on one campus in an environment that fully embraces the company’s unique company culture."
        ],
        images: [
            {
                src: "/history/2019_01.webp",
                alt: "campus-1"
            },
            {
                src: "/history/2019_02.webp",
                alt: "campus-2"
            },
            {
                src: "/history/2019_03.webp",
                alt: "campus-3"
            },
            {
                src: "/history/2019_04.webp",
                alt: "campus-4"
            },
            {
                src: "/history/2019_05.webp",
                alt: "campus-5"
            },
            {
                src: "/history/2019_06.webp",
                alt: "campus-6"
            },
        ]
    },
    {
        year: "2021",
        title: "Seeing Possibilities (Again)",
        secondTitle: "Reebok Divestiture",
        thirdTitle: "Driven by Athlete Data",
        text: [
            "Rember that famous campaign which launched in 2004, something about impossible and nothing…? Well, in 2021, adidas chooses to see possibilities again, relaunching the iconic brand campaign ‘Impossible is Nothing.’ Told in the documentary style of home footage, the campaign provides a previously unseen side to some of the most documented individuals in the world. The campaign is carried out via a powerful narrative as told by friends or fellow athletes and animated via resurfaced footage from the archives."
        ],
        secondText: [
            "After careful consideration and an understanding that both Reebok and adidas would better realize their growth potential independently of one another, the decision is made to begin the formal process aimed at divesting Reebok."
        ],
        thirdText: [
            "First incorporated in the Futurecraft Strung shoe in 2021, the innovation Strung, is unique to adidas and is the first textile technology that transforms athlete data into dynamic performance material. By using precise thread placement based on athlete date, the technology aims to maximize performance by seamlessly combining support flexibility and breathability. Since 2021, the Strung technology has been applied to running and football products."
        ],
        images: [
            {
                src: "/history/2021_01.webp",
                alt: "Futurecraft Strung"
            },
        ]
    },
    {
        year: "2022",
        title: "adidas x Gucci",
        text: [
            "Building on the legacy of previous premium athleisure collaborations, in 2022 a new partnership makes waves for the adidas brand. Gucci and adidas Originals confirm that they are joining forces in a new collaboration – adidas x Gucci – that combines the heritage and the creative codes of both brands. The first collection debuts on the runway, featuring a kaleidoscope of color and merging the iconic trefoil and Gucci emblems."
        ],
        images: [
            {
                src: "/history/2022_01.webp",
                alt: "adidas x Gucci Gazelle"
            },
        ]
    },
    {
        year: "2023",
        title: "Racing at its Lightest",
        secondTitle: "Samba. Shoe of the Year",
        text: [
            "adidas unveils the Adizero Adios Pro Evo 1 and its lightest ever running shoe. Weighing in at 138 grams, the shoe is 40% lighter than any other shoe adidas has ever created and is industry defining. The shoe helps multiple athletes set new personal bests and break records.",
            "On September 24, 2023, Tigist Assefa smashes the world record for a women’s marathon in a time of 2:11:53 at the BMW Berlin Marathon. Her shoe of choice is the groundbreaking Adizero Adios Pro Evo 1. The achievement will remain a proud moment in the adidas history."
        ],
        secondText: [
            "On November 29, 2023, the adidas Samba is named Shoe of the Year by Footwear News. The shoe, which was first released in 1950 as a football boot, has come a long way. In 2023, the Samba find a new lease of life as the hottest streetwear shoe on the market.",
            "“It is so cool to see that a shoe that I used to play indoor soccer with in the ’80s is now the Shoe of the Year in 2023. The Samba is an icon that we at Adidas are very proud of.“ / Bjørn Gulden, CEO of adidas /"
        ],
        images: [
            {
                src: "/history/2023_01.webp",
                alt: "Adidas Samba 1"
            },
            {
                src: "/history/2023_02.webp",
                alt: "Adidas Samba 2"
            },
        ]
    },
    {
        year: "2024",
        title: "Under Pressure? You Got This",
        secondTitle: "Big Birthday Celebrations",
        text: [
            "Dedicated to the next generation of athletes, the ‘You Got This’ campaign launches. Bringing together world-class athletes to create a positive rallying cry to help everyday athletes believe they can overcome pressure and achieve their possibilities in sport."
        ],
        secondText: [
            "In 2024, adidas marks an important milestone: its 75-year anniversary. With a storied history, countless innovations, a proven track record of creating only the best for the athlete, the brand continues to embrace Adi Dassler’s legacy. Its enduring success is rooted in the adidas employees, the people behind the scenes whose continued dedication and passion allows the brand to keep pursuing its purpose: 'Through sport, we have the power to change lives.'",
            "In the same year, adidas celebrates 100 years since Adi Dassler and his brother registered the ‘Gebrüder Dassler Schuhfabrik’, the foundation for what will become two of the biggest sports companies in the world today."
        ],
        images: [],
        videos: [
            {
                src: "https://youtu.be/FzaS0V_FCrI?list=TLGG7quKFgkRQMYxNjEwMjAyNQ",
                title: "You Got This | adidas"
            },
            {
                src: "https://youtu.be/SMl5UoSspbE?list=TLGGWcLyGD66VZ4xNjEwMjAyNQ",
                title: "Behind the Scenes at the Three Stripes Festival"
            }
        ]
    }
]