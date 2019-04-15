DATABASE = {
    "cidade" : "petropolis",
    "unidade" : "boavista",

    "microareas" : {
        "1" : {
            "agua_encanada" : "-",
            "luz_eletrica" : "-",
            "esgoto_encanado" : "-",
            "lazer" : "-",
            "onibus_atende" : "-",
            "animais_de_rua" : "-",

            "lixeira" : "-",
            "lixo_na_rua" : "-",

            "igrejas" : "-",            
            "bares" : "-",

            "observacoes" : "-"
        },
        "2" : {
            "agua_encanada" : "-",
            "luz_eletrica" : "-",
            "esgoto_encanado" : "-",
            "lazer" : "-",
            "onibus_atende" : "-",
            "animais_de_rua" : "-",

            "lixeira" : "-",
            "lixo_na_rua" : "-",

            "igrejas" : "-",            
            "bares" : "-",

            "observacoes" : "-"
        },
        "3" : {
            "agua_encanada" : true,
            "luz_eletrica" : true,
            "esgoto_encanado" : true,
            "lazer" : false,
            "onibus_atende" : true,
            "animais_de_rua" : true,

            "lixeira" : 1,
            "lixo_na_rua" : false,

            "igrejas" : "2",            
            "bares" : "1",

            "observacoes" : "A microárea 3 sofre com o manancial contaminado por metais pesados e coliformes fecais, poucas lixeiras na região."
        },
        "4" : {
            "agua_encanada" : true,
            "luz_eletrica" : true,
            "esgoto_encanado" : true,
            "lazer" : false,
            "onibus_atende" : true,
            "animais_de_rua" : true,

            "lixeira" : 2,
            "lixo_na_rua" : true,

            "igrejas" : 2,            
            "bares" : 3,

            "observacoes" : "A microárea 4 possui um relevo acentuado e alguns pequenos comércios. Diversos moradores deixam os cachorros soltos na rua, que reviram o lixo e sujam as ruas."
        },
        "5" : {
            "agua_encanada" : true,
            "luz_eletrica" : true,
            "esgoto_encanado" : true,
            "lazer" : false,
            "onibus_atende" : true,
            "animais_de_rua" : true,
            
            "lixeira" : false,
            "lixo_na_rua" : false,
        
            "igrejas" : "1",
            "bares" : "1",

            "observacoes" : "O relevo da microárea 5 é um dos fatores que dificulta o acesso."
        }
    },

    "ruas" : {
        "Rua Cândido Borsato" : {
            "microarea" : "3",
            "agua_encanada" : true,
            "luz_eletrica" : true,
            "esgoto_encanado" : true,
            "entulho" : true,
            "lixo_na_rua" : true,
            "animais_de_rua" : true,
            "caracteristicas" : [
                "Bar",
                "Igreja",
                "Lixeira",
                "Pequenos comércios",
                "Ponto de ônibus",
            ],
            "referencia" : "",
            "adjacentes" : [
                "Rua Boa Vista",
                "Rua Valentino Osório da Silva",
            ],
            "observacoes" : "",
        },
    }
}