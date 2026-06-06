// moglo bi se reći da ova datoteka zapravo simulira bazu podataka

const data = {
    "website": "Oprema za trening",
    "categories": [
        {
            "id": 1,
            "name" : "Utezi",
            "image" : "public/images/kategorije/utezi.jpg",
            "products" : [
                {
                    "name" : "Crvene bučice 2x5kg", "image" : "public/images/kategorija-utezi/utezi(1).jpg", "id" : 11
                },
                {
                    "name" : "Set raznobojnih bučica, 0.5kg-5kg", "image" : "public/images/kategorija-utezi/utezi(2).jpg", "id" : 12
                },
                {
                    "name" : "Zelena medicinka, 4kg", "image" : "public/images/kategorija-utezi/utezi(3).jpg", "id" : 13
                },
                {
                    "name" : "Set bučica 2x10kg", "image" : "public/images/kategorija-utezi/utezi(4).jpg", "id" : 14
                },
                {
                    "name" : "Uteg pločica, 2.5kg", "image" : "public/images/kategorija-utezi/utezi(5).webp", "id" : 15
                }
            ]
        },
        {
            "id": 2,
            "name" : "Šipke",
            "image" : "public/images/kategorije/sipke.jpg",
            "products" : [
                {
                    "name" : "Šipka 20kg + 80kg utega + stalak", "image" : "public/images/kategorija-sipke/sipke(1).jpg", "id" : 21
                },
                {
                    "name" : "Šipka 15kg + 30kg utega", "image" : "public/images/kategorija-sipke/sipke(2).jpg", "id" : 22
                },
                {
                    "name" : "Šipka s gripom 20kg + 20kg utega", "image" : "public/images/kategorija-sipke/sipke(3).jpg", "id" : 23
                },
                {
                    "name" : "Šipka 20kg + 60kg utega", "image" : "public/images/kategorija-sipke/sipke(4).jpg", "id" : 24
                },
                {
                    "name" : "Šipka 20kg s osiguračima + 50kg utega", "image" : "public/images/kategorija-sipke/sipke(5).jpg", "id" : 25
                }
            ]
        },
        {
            "id": 3,
            "name" : "Kardio",
            "image" : "public/images/kategorije/kardio.jpg",
            "products" : [
                {
                    "name" : "Uže za preskakanje, plava boja", "image" : "public/images/kategorija-kardio/kardio(1).jpg", "id" : 31
                },
                {
                    "name" : "Sklopivi sobni bicikl", "image" : "public/images/kategorija-kardio/kardio(2).jpg", "id" : 32
                },
                {
                    "name" : "Traka za trčanje", "image" : "public/images/kategorija-kardio/kardio(3).jpg", "id" : 33
                },
                {
                    "name" : "Ergometar", "image" : "public/images/kategorija-kardio/kardio(4).jpg", "id" : 34
                },
                {
                    "name" : "Orbitrek", "image" : "public/images/kategorija-kardio/kardio(5).webp", "id" : 35
                }
            ]
        },
        {
            "id": 4,
            "name" : "Klupe",
            "image" : "public/images/kategorije/klupe.jpg",
            "products" : [
                {
                    "name" : "Multifunkcionalna klupa", "image" : "public/images/kategorija-klupe/klupe(1).webp", "id" : 41
                },
                {
                    "name" : "Ravna klupa + klupa za biceps", "image" : "public/images/kategorija-klupe/klupe(2).webp", "id" : 42
                },
                {
                    "name" : "Unikatna klupa za bench press", "image" : "public/images/kategorija-klupe/klupe(3).webp", "id" : 43
                },
                {
                    "name" : "Kluba za trbuh", "image" : "public/images/kategorija-klupe/klupe(4).png", "id" : 44
                },
                {
                    "name" : "Klupa za biceps", "image" : "public/images/kategorija-klupe/klupe(5).jpg", "id" : 45
                }
            ]
        },
        {
            "id": 5,
            "name" : "Crossfit",
            "image" : "public/images/kategorije/crossfit.jpg",
            "products" : [
                {
                    "name" : "Roler za trbuh", "image" : "public/images/kategorija-crossfit/crossfit(1).jpeg", "id" : 51
                },
                {
                    "name" : "Crna girja, 10kg", "image" : "public/images/kategorija-crossfit/crossfit(2).jpg", "id" : 52
                },
                {
                    "name" : "Šipka za zgibove, crna", "image" : "public/images/kategorija-crossfit/crossfit(3).jpg", "id" : 53
                },
                {
                    "name" : "Gripovi za sklekove", "image" : "public/images/kategorija-crossfit/crossfit(4).jpg", "id" : 54
                },
                {
                    "name" : "Siva girja, 8kg", "image" : "public/images/kategorija-crossfit/crossfit(5).jpg", "id" : 55
                }
            ]
        },
        {
            "id": 6,
            "name" : "Joga",
            "image" : "public/images/kategorije/joga.jpg",
            "products" : [
                {
                    "name" : "Blokovi za jogu, plavi", "image" : "public/images/kategorija-joga/joga(1).jpg", "id" : 61
                },
                {
                    "name" : "Blok za jogu + prostirka", "image" : "public/images/kategorija-joga/joga(2).jpg", "id" : 62
                },
                {
                    "name" : "Blok za jogu + prostirka + boca", "image" : "public/images/kategorija-joga/joga(3).jpg", "id" : 63
                },
                {
                    "name" : "Prostirka, plava", "image" : "public/images/kategorija-joga/joga(4).webp", "id" : 64
                },
                {
                    "name" : "Tatami, crni", "image" : "public/images/kategorija-joga/joga(5).webp", "id" : 65
                }
            ]
        },
        {
            "id": 7,
            "name" : "Muška odjeća",
            "image" : "public/images/kategorije/muskaodjeca.jpg",
            "products" : [
                {
                    "name" : "Kratke tajice za trčanje", "image" : "public/images/kategorija-muska-odjeca/muskaodjeca(1).jpeg", "id" : 71
                },
                {
                    "name" : "Majica bez rukava, bijela ", "image" : "public/images/kategorija-muska-odjeca/muskaodjeca(2).jpg", "id" : 72
                },
                {
                    "name" : "Kompresijska majica, crna", "image" : "public/images/kategorija-muska-odjeca/muskaodjeca(3).jpg", "id" : 73
                },
                {
                    "name" : "Crna majica + crni šorc", "image" : "public/images/kategorija-muska-odjeca/muskaodjeca(4).webp", "id" : 74
                },
                {
                    "name" : "Crni šorc + siva majica", "image" : "public/images/kategorija-muska-odjeca/muskaodjeca(5).jpg", "id" : 75
                }
            ]
        },
        {
            "id": 8,
            "name" : "Ženska odjeća",
            "image" : "public/images/kategorije/zenskaodjeca.jpg",
            "products" : [
                {
                    "name" : "Sivi sportski set", "image" : "public/images/kategorija-zenska-odjeca/zenskaodjeca(1).jpeg", "id" : 81
                },
                {
                    "name" : "Svijetlo plavi set", "image" : "public/images/kategorija-zenska-odjeca/zenskaodjeca(2).jpeg", "id" : 82
                },
                {
                    "name" : "Crni set", "image" : "public/images/kategorija-zenska-odjeca/zenskaodjeca(3).jpeg", "id" : 83
                },
                {
                    "name" : "Smeđi set", "image" : "public/images/kategorija-zenska-odjeca/zenskaodjeca(4).jpeg", "id" : 84
                },
                {
                    "name" : "Rozi set", "image" : "public/images/kategorija-zenska-odjeca/zenskaodjeca(5).jpg", "id" : 85
                }
            ]
        },
        {
            "id": 9,
            "name" : "Suplementi",
            "image" : "public/images/kategorije/suplementi.jpg",
            "products" : [
                {
                    "name" : "Sportska boca", "image" : "public/images/kategorija-suplementi/suplementi(1).jpg", "id" : 91
                },
                {
                    "name" : "Kreatin, 120 kapsula", "image" : "public/images/kategorija-suplementi/suplementi(2).webp", "id" : 92
                },
                {
                    "name" : "Proteini u prahu, čokolada, 810g", "image" : "public/images/kategorija-suplementi/suplementi(3).webp", "id" : 93
                },
                {
                    "name" : "Superfood protein u prahu, 600g", "image" : "public/images/kategorija-suplementi/suplementi(4).webp", "id" : 94
                },
                {
                    "name" : "Kreatin u prahu, 90g", "image" : "public/images/kategorija-suplementi/suplementi(5).webp", "id" : 95
                }
            ]
        },
        {
            "id": 10,
            "name" : "Uređaji",
            "image" : "public/images/kategorije/uredaji.jpg",
            "products" : [
                {
                    "name" : "Fitness sat, žuti", "image" : "public/images/kategorija-uredaji/uredaji(1).jpg", "id" : 101
                },
                {
                    "name" : "Fitness prsten", "image" : "public/images/kategorija-uredaji/uredaji(2).jpg", "id" : 102
                },
                {
                    "name" : "Narukvica za fitness", "image" : "public/images/kategorija-uredaji/uredaji(3).jpg", "id" : 103
                },
                {
                    "name" : "Štoperica, crna", "image" : "public/images/kategorija-uredaji/uredaji(4).jpg", "id" : 104
                },
                {
                    "name" : "SET - pametni sat + pametna narukvica", "image" : "public/images/kategorija-uredaji/uredaji(5).jpg", "id" : 105
                }
            ]
        }
    ]
}

// exportanje modula
module.exports = data;
