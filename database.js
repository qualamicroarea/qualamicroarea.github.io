const DATABASE = {

    "cidades" : {

        "Petrópolis" : {

            "unidades" : {

                "Boa Vista" : {

                    "microareas" : {
                        "1" : {
                            "agua_encanada" : "Parcial",
                            "luz_eletrica" : true,
                            "esgoto_encanado" : true,
                            "lazer" : true,
                            "onibus_atende" : true,
                            "animais_de_rua" : true,

                            "lixeira" : "5",
                            "lixo_na_rua" : true,

                            "igrejas" : "5",
                            "bares" : "3",

                            "observacoes" : "A microárea 1 está sem agente comunitário há varios anos. O revelo da microárea é mais plano que nas demais. A associação de moradores fica na microárea 1."
                        },
                        "2" : {
                            "agua_encanada" : true,
                            "luz_eletrica" : true,
                            "esgoto_encanado" : "Parcial",
                            "lazer" : false,
                            "onibus_atende" : true,
                            "animais_de_rua" : true,

                            "lixeira" : "2",
                            "lixo_na_rua" : true,

                            "igrejas" : "2",
                            "bares" : "4",

                            "observacoes" : "Relevo acentuado, boa adesão ao programa do posto. Muitos animais de rua."
                        },
                        "3" : {
                            "agua_encanada" : true,
                            "luz_eletrica" : true,
                            "esgoto_encanado" : true,
                            "lazer" : false,
                            "onibus_atende" : true,
                            "animais_de_rua" : true,

                            "lixeira" : "1",
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
                        "Rua Boa Vista" : {
                            "microarea" : [
                                "1",
                                "2",
                                "5",
                            ],
                            "agua_encanada" : true,
                            "luz_eletrica" : true,
                            "esgoto_encanado" : true,
                            "entulho" : false,
                            "lixo_na_rua" : true,
                            "animais_de_rua" : true,
                            "caracteristicas" : [
                            ],
                            "referencia" : "",
                            "adjacentes" : [
                                "Rua Cândido Borsato",
                                "Rua Henrique João da Cruz",
                            ],
                            "observacoes" : "Parte usa o nome Servidão Cornélio de Azevedo Ramos",
                        },
                        "Rua Caminho do Ladeira" : {
                            "microarea" : [
                                "4",
                            ],
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
                                "Rua Sem Saída",
                            ],
                            "referencia" : "",
                            "adjacentes" : [
                                "Rua Henrique João da Cruz",
                                "Servidão Cornélio de Azevedo Ramos",
                            ],
                            "observacoes" : "Alguns ratos.",
                        },
                        "Rua Cecília Milanês" : {
                            "microarea" : [
                                "2",
                            ],
                            "agua_encanada" : true,
                            "luz_eletrica" : true,
                            "esgoto_encanado" : true,
                            "entulho" : false,
                            "lixo_na_rua" : true,
                            "animais_de_rua" : true,
                            "caracteristicas" : [
                                "Igreja",
                                "Pequenos comércios",
                                "Rua Sem Saída",
                            ],
                            "referencia" : "",
                            "adjacentes" : [
                                "Rua Valentin Osório da Silva",
                                "Servidão Maria Leocadia de Jesus Gonçalves",
                            ],
                            "observacoes" : "",
                        },
                        "Rua Cândido Borsato" : {
                            "microarea" : [
                                "2",
                                "3",
                            ],
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
                                "Rua Valentin Osório da Silva",
                            ],
                            "observacoes" : "",
                        },
                        "Rua Henrique João da Cruz" : {
                            "microarea" : [
                                "1",
                                "2",
                            ],
                            "agua_encanada" : true,
                            "luz_eletrica" : true,
                            "esgoto_encanado" : true,
                            "entulho" : false,
                            "lixo_na_rua" : true,
                            "animais_de_rua" : true,
                            "caracteristicas" : [
                                "Igreja",
                                "Lixeira",
                                "Pequenos comércios",
                                "Ponto de ônibus",
                            ],
                            "referencia" : "Localização do Posto de Saúde da Família, dispensa de carros batidos.",
                            "adjacentes" : [
                                "Rua Boa Vista",
                                "Rua Caminho do Ladeira",
                                "Rua Francisco Jacinto do Amaral",
                                "Servidão José Cândido da Silva Maripá",
                                "Servidão Maria Leocadia de Jesus Gonçalves",
                            ],
                            "observacoes" : "",
                        },
                        "Rua Luiz Pelegrini " : {
                            "microarea" : [
                                "5",
                            ],
                            "agua_encanada" : true,
                            "luz_eletrica" : true,
                            "esgoto_encanado" : true,
                            "entulho" : true,
                            "lixo_na_rua" : true,
                            "animais_de_rua" : true,
                            "caracteristicas" : [
                                "Igreja",
                                "Pequenos comércios",
                                "Rua Sem Saída",
                            ],
                            "referencia" : "LBV - legião da boa vontade, pertence ao Machado Fagundes",
                            "adjacentes" : [
                                "Rua Silvio Pimentel França",
                                "Servidão Daniel Balbino",
                            ],
                            "observacoes" : "",
                        },
                        "Rua Silvio Pimentel França" : {
                            "microarea" : [
                                "5",
                            ],
                            "agua_encanada" : true,
                            "luz_eletrica" : true,
                            "esgoto_encanado" : true,
                            "entulho" : false,
                            "lixo_na_rua" : true,
                            "animais_de_rua" : true,
                            "caracteristicas" : [
                                "Bar",
                                "Pequenos comércios",
                                "Ponto de ônibus",
                                "Rua Sem Saída",
                            ],
                            "referencia" : "",
                            "adjacentes" : [
                                "Rua Luiz Pelegrini ",
                                "Servidão José da Silva",
                                "Servidão Pedro Lanzoni",
                            ],
                            "observacoes" : "",
                        },
                        "Rua Valentin Osório da Silva" : {
                            "microarea" : [
                                "2",
                            ],
                            "agua_encanada" : true,
                            "luz_eletrica" : true,
                            "esgoto_encanado" : true,
                            "entulho" : false,
                            "lixo_na_rua" : true,
                            "animais_de_rua" : true,
                            "caracteristicas" : [
                                "Pequenos comércios",
                            ],
                            "referencia" : "",
                            "adjacentes" : [
                                "Rua Cecília Milanês",
                                "Rua Cândido Borsato",
                                "Rua da Represa",
                                "Servidão José Cândido da Silva Maripá",
                            ],
                            "observacoes" : "2 confecções de roupa",
                        },
                        "Rua da Represa" : {
                            "microarea" : [
                                "2",
                            ],
                            "agua_encanada" : true,
                            "luz_eletrica" : true,
                            "esgoto_encanado" : false,
                            "entulho" : true,
                            "lixo_na_rua" : true,
                            "animais_de_rua" : true,
                            "caracteristicas" : [
                            ],
                            "referencia" : "",
                            "adjacentes" : [
                                "Estrada do Cascatinha",
                                "Rua Loio Gallucci",
                                "Rua Valentin Osório da Silva",
                            ],
                            "observacoes" : "",
                        },
                        "Servidão Cornélio de Azevedo Ramos" : {
                            "microarea" : [
                                "5",
                            ],
                            "agua_encanada" : true,
                            "luz_eletrica" : true,
                            "esgoto_encanado" : true,
                            "entulho" : true,
                            "lixo_na_rua" : true,
                            "animais_de_rua" : true,
                            "caracteristicas" : [
                                "Rua Sem Saída",
                            ],
                            "referencia" : "",
                            "adjacentes" : [
                                "Rua Caminho do Ladeira",
                            ],
                            "observacoes" : "",
                        },
                        "Servidão José Cândido da Silva Maripá" : {
                            "microarea" : [
                                "2",
                            ],
                            "agua_encanada" : true,
                            "luz_eletrica" : true,
                            "esgoto_encanado" : true,
                            "entulho" : false,
                            "lixo_na_rua" : true,
                            "animais_de_rua" : true,
                            "caracteristicas" : [
                            ],
                            "referencia" : "",
                            "adjacentes" : [
                                "Rua Henrique João da Cruz",
                                "Rua Valentin Osório da Silva",
                            ],
                            "observacoes" : "Nenhuma Casa, só passagem.",
                        },
                        "Servidão José da Silva" : {
                            "microarea" : [
                                "5",
                            ],
                            "agua_encanada" : true,
                            "luz_eletrica" : true,
                            "esgoto_encanado" : true,
                            "entulho" : false,
                            "lixo_na_rua" : true,
                            "animais_de_rua" : true,
                            "caracteristicas" : [
                                "Rua Sem Saída",
                            ],
                            "referencia" : "",
                            "adjacentes" : [
                                "Rua Silvio Pimentel França",
                            ],
                            "observacoes" : "",
                        },
                        "Servidão João França" : {
                            "microarea" : [
                                "5",
                            ],
                            "agua_encanada" : true,
                            "luz_eletrica" : true,
                            "esgoto_encanado" : true,
                            "entulho" : false,
                            "lixo_na_rua" : true,
                            "animais_de_rua" : true,
                            "caracteristicas" : [
                                "Rua Sem Saída",
                            ],
                            "referencia" : "",
                            "adjacentes" : [
                                "Servidão Vicente de Oliveira",
                            ],
                            "observacoes" : "Ratos na rua.",
                        },
                        "Servidão Maria Leocadia de Jesus Gonçalves" : {
                            "microarea" : [
                                "2",
                            ],
                            "agua_encanada" : true,
                            "luz_eletrica" : true,
                            "esgoto_encanado" : true,
                            "entulho" : false,
                            "lixo_na_rua" : true,
                            "animais_de_rua" : true,
                            "caracteristicas" : [
                                "Rua Sem Saída",
                            ],
                            "referencia" : "",
                            "adjacentes" : [
                                "Rua Cecília Milanês",
                                "Rua Henrique João da Cruz",
                            ],
                            "observacoes" : "",
                        },
                        "Servidão Vicente de Oliveira" : {
                            "microarea" : [
                                "5",
                            ],
                            "agua_encanada" : true,
                            "luz_eletrica" : true,
                            "esgoto_encanado" : true,
                            "entulho" : false,
                            "lixo_na_rua" : true,
                            "animais_de_rua" : true,
                            "caracteristicas" : [
                                "Rua Sem Saída",
                            ],
                            "referencia" : "",
                            "adjacentes" : [
                                "Servidão João França",
                                "Servidão Pedro Lanzoni",
                            ],
                            "observacoes" : "",
                        },
                        "Estrada do Cascatinha" : {
                            "microarea" : [
                                "1",
                            ],
                            "agua_encanada" : true,
                            "luz_eletrica" : true,
                            "esgoto_encanado" : true,
                            "entulho" : true,
                            "lixo_na_rua" : true,
                            "animais_de_rua" : true,
                            "caracteristicas" : [
                                "Pequenos comércios",
                                "Ponto de ônibus",
                            ],
                            "referencia" : "Depois da ponte da entrada do Carangola",
                            "adjacentes" : [
                                "Rua Ana Nery",
                                "Rua Loio Gallucci",
                                "Rua da Represa",
                            ],
                            "observacoes" : "",
                        },
                        "Rua Ana Nery" : {
                            "microarea" : [
                                "1",
                            ],
                            "agua_encanada" : true,
                            "luz_eletrica" : true,
                            "esgoto_encanado" : true,
                            "entulho" : false,
                            "lixo_na_rua" : true,
                            "animais_de_rua" : true,
                            "caracteristicas" : [
                                "Bar",
                                "Lixeira",
                                "Orelhão",
                                "Ponto de ônibus",
                            ],
                            "referencia" : "",
                            "adjacentes" : [
                                "Estrada do Cascatinha",
                                "Rua Bernardo Vasconcelos",
                                "Rua Guilherme Dalmas Nunes",
                            ],
                            "observacoes" : "",
                        },
                        "Rua Francisco Jacinto do Amaral" : {
                            "microarea" : [
                                "1",
                            ],
                            "agua_encanada" : true,
                            "luz_eletrica" : true,
                            "esgoto_encanado" : true,
                            "entulho" : true,
                            "lixo_na_rua" : true,
                            "animais_de_rua" : true,
                            "caracteristicas" : [
                                "Bar",
                                "Igreja",
                                "Pequenos comércios",
                                "Rua Sem Saída",
                            ],
                            "referencia" : "",
                            "adjacentes" : [
                                "Rua Henrique João da Cruz",
                            ],
                            "observacoes" : "",
                        },
                        "Rua Guilherme Dalmas Nunes" : {
                            "microarea" : [
                                "1",
                            ],
                            "agua_encanada" : true,
                            "luz_eletrica" : true,
                            "esgoto_encanado" : true,
                            "entulho" : true,
                            "lixo_na_rua" : true,
                            "animais_de_rua" : true,
                            "caracteristicas" : [
                                "Bar",
                                "Igreja",
                                "Pequenos comércios",
                                "Ponto de ônibus",
                            ],
                            "referencia" : "",
                            "adjacentes" : [
                                "Rua Ana Nery",
                                "Rua Machado Fagundes",
                            ],
                            "observacoes" : "",
                        },
                        "Rua Loio Gallucci" : {
                            "microarea" : [
                                "1",
                            ],
                            "agua_encanada" : true,
                            "luz_eletrica" : true,
                            "esgoto_encanado" : true,
                            "entulho" : true,
                            "lixo_na_rua" : true,
                            "animais_de_rua" : true,
                            "caracteristicas" : [
                                "Lixeira",
                                "Rua Sem Saída",
                            ],
                            "referencia" : "",
                            "adjacentes" : [
                                "Estrada do Cascatinha",
                                "Rua da Represa",
                            ],
                            "observacoes" : "",
                        },
                        "Servidão Pedro Lanzoni" : {
                            "microarea" : [
                                "5",
                            ],
                            "agua_encanada" : true,
                            "luz_eletrica" : true,
                            "esgoto_encanado" : false,
                            "entulho" : true,
                            "lixo_na_rua" : false,
                            "animais_de_rua" : false,
                            "caracteristicas" : [
                                "Rua Sem Saída",
                            ],
                            "referencia" : "",
                            "adjacentes" : [
                                "Rua Silvio Pimentel França",
                                "Servidão Vicente de Oliveira",
                            ],
                            "observacoes" : "Esgoto exposto",
                        },
                    },
                },
            },
        },
    },
}
