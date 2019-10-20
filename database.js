/**
 * A DATABASE - um global, que deve ser sempre o primeiro arquivo js carregado.
 * É inteligente usar uma variável com um dictionary para simular uma database read-only?
 * Não, mas é uma solução para quando não existe um backend.
 * Assim, essa database é carregada e todo o parsing e processamento é feito por
 * javascript direto no navegador.
 * Uma solução bizarra, estranha e nada perfeita, mas que funciona.
 * 
 * Agora, a explicação:
 * DATABASE é um dictionary que segue as seguintes regras / padrões:
 * | A única key deste dicionário é "cidades", que está associada com um dicionário.
 * || Nesse, as chaves são nomes de cidades, cada um associado com um dicionário.
 * ||| Nesse, a única key é "unidades", que está associada com um dicionário.
 * |||| Nesse, cada key é o nome de uma unidade (PSF), associado com um dicionário.
 * ||||| Nesse, há duas chaves:
 * |||||| "microareas", associada com um dicionário.
 * ||||||| Nesse, cada key é o nome de uma microárea, associada com um dicionário em que há as seguintes keys:
 * ||||||||| "cidade" [string] com o nome da cidade;
 * ||||||||| "unidade" [string] com o nome da unidade;
 * ||||||||| "agua_encanada" [string];
 * ||||||||| "luz_eletrica" [boolean];
 * ||||||||| "esgoto_encanado" [boolean];
 * ||||||||| "lazer" [boolean];
 * ||||||||| "onibus_atende" [boolean];
 * ||||||||| "animais_de_rua" [boolean];
 * ||||||||| "lixeira" [string] (mas normalmente contendo um número);
 * ||||||||| "lixo_na_rua" [boolean];
 * ||||||||| "igrejas" [string] (mas normalmente contendo um número);
 * ||||||||| "bares" [string] (mas normalmente contendo um número);
 * ||||||||| "observacoes" [string];
 * |||||| "ruas", associada com um dicionário.
 * ||||||| Nesse, cada key é o nome de uma rua, associada com um dicionário em que há as seguintes keys:
 * ||||||||| "cidade" [string] com o nome da cidade;
 * ||||||||| "unidade" [string] com o nome da unidade;
 * ||||||||| "microarea" [array<string>] em que cada item é o nome de uma microárea.
 * ||||||||| "agua_encanada" [boolean];
 * ||||||||| "luz_eletrica" [boolean];
 * ||||||||| "esgoto_encanado" [boolean];
 * ||||||||| "entulho" [boolean];
 * ||||||||| "lixo_na_rua" [boolean];
 * ||||||||| "animais_de_rua" [boolean];
 * ||||||||| "caracteristicas" [array<string>] em que cada item é uma característica da rua. As mais comuns são:
 * |||||||||| "Bar";
 * |||||||||| "Creche";
 * |||||||||| "Escola";
 * |||||||||| "Igreja";
 * |||||||||| "Lixeira";
 * |||||||||| "Ponto de ônibus";
 * |||||||||| "Orelhão";
 * |||||||||| "Pequenos comércios";
 * |||||||||| "Rua Sem Saída";
 * ||||||||| "referencia" [string];
 * ||||||||| "adjacentes" [array<string>] em que cada item é o nome de uma rua.
 * ||||||||| "observacoes" [string];
 */
const DATABASE = {

    "cidades" : {

        "Petrópolis" : {

            "unidades" : {

                "Boa Vista" : {

                    "microareas" : {
                        "1" : {
                            "cidade" : "Petrópolis",
                            "unidade" : "Boa Vista",
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
                            "cidade" : "Petrópolis",
                            "unidade" : "Boa Vista",
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
                            "cidade" : "Petrópolis",
                            "unidade" : "Boa Vista",
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
                            "cidade" : "Petrópolis",
                            "unidade" : "Boa Vista",
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
                            "cidade" : "Petrópolis",
                            "unidade" : "Boa Vista",
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
                            "cidade" : "Petrópolis",
                            "unidade" : "Boa Vista",
                            "microarea" : [
                                "1",
                                "2",
                                "5"
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
                                "Rua Henrique João da Cruz"
                            ],
                            "observacoes" : "Parte usa o nome Servidão Cornélio de Azevedo Ramos"
                        },
                        "Rua Caminho do Ladeira" : {
                            "cidade" : "Petrópolis",
                            "unidade" : "Boa Vista",
                            "microarea" : [
                                "4"
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
                                "Rua Sem Saída"
                            ],
                            "referencia" : "",
                            "adjacentes" : [
                                "Rua Henrique João da Cruz",
                                "Servidão Cornélio de Azevedo Ramos"
                            ],
                            "observacoes" : "Alguns ratos."
                        },
                        "Rua Cecília Milanês" : {
                            "cidade" : "Petrópolis",
                            "unidade" : "Boa Vista",
                            "microarea" : [
                                "2"
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
                                "Rua Sem Saída"
                            ],
                            "referencia" : "",
                            "adjacentes" : [
                                "Rua Valentin Osório da Silva",
                                "Servidão Maria Leocadia de Jesus Gonçalves"
                            ],
                            "observacoes" : ""
                        },
                        "Rua Cândido Borsato" : {
                            "cidade" : "Petrópolis",
                            "unidade" : "Boa Vista",
                            "microarea" : [
                                "2",
                                "3"
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
                                "Ponto de ônibus"
                            ],
                            "referencia" : "",
                            "adjacentes" : [
                                "Rua Boa Vista",
                                "Rua Valentin Osório da Silva"
                            ],
                            "observacoes" : ""
                        },
                        "Rua Henrique João da Cruz" : {
                            "cidade" : "Petrópolis",
                            "unidade" : "Boa Vista",
                            "microarea" : [
                                "1",
                                "2"
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
                                "Ponto de ônibus"
                            ],
                            "referencia" : "Localização do Posto de Saúde da Família, dispensa de carros batidos.",
                            "adjacentes" : [
                                "Rua Boa Vista",
                                "Rua Caminho do Ladeira",
                                "Rua Francisco Jacinto do Amaral",
                                "Servidão José Cândido da Silva Maripá",
                                "Servidão Maria Leocadia de Jesus Gonçalves"
                            ],
                            "observacoes" : ""
                        },
                        "Rua Luiz Pelegrini" : {
                            "cidade" : "Petrópolis",
                            "unidade" : "Boa Vista",
                            "microarea" : [
                                "5"
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
                                "Rua Sem Saída"
                            ],
                            "referencia" : "LBV - legião da boa vontade, pertence ao Machado Fagundes",
                            "adjacentes" : [
                                "Rua Silvio Pimentel França",
                                "Servidão Daniel Balbino"
                            ],
                            "observacoes" : ""
                        },
                        "Rua Silvio Pimentel França" : {
                            "cidade" : "Petrópolis",
                            "unidade" : "Boa Vista",
                            "microarea" : [
                                "5"
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
                                "Rua Sem Saída"
                            ],
                            "referencia" : "",
                            "adjacentes" : [
                                "Rua Luiz Pelegrini",
                                "Servidão José da Silva",
                                "Servidão Pedro Lanzoni",
                                "Servidão Daniel Balbino"
                            ],
                            "observacoes" : ""
                        },
                        "Rua Valentin Osório da Silva" : {
                            "cidade" : "Petrópolis",
                            "unidade" : "Boa Vista",
                            "microarea" : [
                                "2"
                            ],
                            "agua_encanada" : true,
                            "luz_eletrica" : true,
                            "esgoto_encanado" : true,
                            "entulho" : false,
                            "lixo_na_rua" : true,
                            "animais_de_rua" : true,
                            "caracteristicas" : [
                                "Pequenos comércios"
                            ],
                            "referencia" : "",
                            "adjacentes" : [
                                "Rua Cecília Milanês",
                                "Rua Cândido Borsato",
                                "Rua da Represa",
                                "Servidão José Cândido da Silva Maripá"
                            ],
                            "observacoes" : "2 confecções de roupa"
                        },
                        "Rua da Represa" : {
                            "cidade" : "Petrópolis",
                            "unidade" : "Boa Vista",
                            "microarea" : [
                                "2"
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
                                "Rua Valentin Osório da Silva"
                            ],
                            "observacoes" : ""
                        },
                        "Servidão Cornélio de Azevedo Ramos" : {
                            "cidade" : "Petrópolis",
                            "unidade" : "Boa Vista",
                            "microarea" : [
                                "5"
                            ],
                            "agua_encanada" : true,
                            "luz_eletrica" : true,
                            "esgoto_encanado" : true,
                            "entulho" : true,
                            "lixo_na_rua" : true,
                            "animais_de_rua" : true,
                            "caracteristicas" : [
                                "Rua Sem Saída"
                            ],
                            "referencia" : "",
                            "adjacentes" : [
                                "Rua Caminho do Ladeira"
                            ],
                            "observacoes" : ""
                        },
                        "Servidão José Cândido da Silva Maripá" : {
                            "cidade" : "Petrópolis",
                            "unidade" : "Boa Vista",
                            "microarea" : [
                                "2"
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
                                "Rua Valentin Osório da Silva"
                            ],
                            "observacoes" : "Nenhuma Casa, só passagem."
                        },
                        "Servidão José da Silva" : {
                            "cidade" : "Petrópolis",
                            "unidade" : "Boa Vista",
                            "microarea" : [
                                "5"
                            ],
                            "agua_encanada" : true,
                            "luz_eletrica" : true,
                            "esgoto_encanado" : true,
                            "entulho" : false,
                            "lixo_na_rua" : true,
                            "animais_de_rua" : true,
                            "caracteristicas" : [
                                "Rua Sem Saída"
                            ],
                            "referencia" : "",
                            "adjacentes" : [
                                "Rua Silvio Pimentel França"
                            ],
                            "observacoes" : ""
                        },
                        "Servidão João França" : {
                            "cidade" : "Petrópolis",
                            "unidade" : "Boa Vista",
                            "microarea" : [
                                "5"
                            ],
                            "agua_encanada" : true,
                            "luz_eletrica" : true,
                            "esgoto_encanado" : true,
                            "entulho" : false,
                            "lixo_na_rua" : true,
                            "animais_de_rua" : true,
                            "caracteristicas" : [
                                "Rua Sem Saída"
                            ],
                            "referencia" : "",
                            "adjacentes" : [
                                "Servidão Vicente de Oliveira"
                            ],
                            "observacoes" : "Ratos na rua."
                        },
                        "Servidão Maria Leocadia de Jesus Gonçalves" : {
                            "cidade" : "Petrópolis",
                            "unidade" : "Boa Vista",
                            "microarea" : [
                                "2"
                            ],
                            "agua_encanada" : true,
                            "luz_eletrica" : true,
                            "esgoto_encanado" : true,
                            "entulho" : false,
                            "lixo_na_rua" : true,
                            "animais_de_rua" : true,
                            "caracteristicas" : [
                                "Rua Sem Saída"
                            ],
                            "referencia" : "",
                            "adjacentes" : [
                                "Rua Cecília Milanês",
                                "Rua Henrique João da Cruz"
                            ],
                            "observacoes" : ""
                        },
                        "Servidão Vicente de Oliveira" : {
                            "cidade" : "Petrópolis",
                            "unidade" : "Boa Vista",
                            "microarea" : [
                                "5"
                            ],
                            "agua_encanada" : true,
                            "luz_eletrica" : true,
                            "esgoto_encanado" : true,
                            "entulho" : false,
                            "lixo_na_rua" : true,
                            "animais_de_rua" : true,
                            "caracteristicas" : [
                                "Rua Sem Saída"
                            ],
                            "referencia" : "",
                            "adjacentes" : [
                                "Servidão João França",
                                "Servidão Pedro Lanzoni"
                            ],
                            "observacoes" : ""
                        },
                        "Estrada do Cascatinha" : {
                            "cidade" : "Petrópolis",
                            "unidade" : "Boa Vista",
                            "microarea" : [
                                "1"
                            ],
                            "agua_encanada" : true,
                            "luz_eletrica" : true,
                            "esgoto_encanado" : true,
                            "entulho" : true,
                            "lixo_na_rua" : true,
                            "animais_de_rua" : true,
                            "caracteristicas" : [
                                "Pequenos comércios",
                                "Ponto de ônibus"
                            ],
                            "referencia" : "Depois da ponte da entrada do Carangola",
                            "adjacentes" : [
                                "Rua Ana Nery",
                                "Rua Loio Gallucci",
                                "Rua da Represa"
                            ],
                            "observacoes" : ""
                        },
                        "Rua Ana Nery" : {
                            "cidade" : "Petrópolis",
                            "unidade" : "Boa Vista",
                            "microarea" : [
                                "1"
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
                                "Ponto de ônibus"
                            ],
                            "referencia" : "",
                            "adjacentes" : [
                                "Estrada do Cascatinha",
                                "Rua Bernardo Vasconcelos",
                                "Rua Guilherme Dalmas Nunes"
                            ],
                            "observacoes" : ""
                        },
                        "Rua Francisco Jacinto do Amaral" : {
                            "cidade" : "Petrópolis",
                            "unidade" : "Boa Vista",
                            "microarea" : [
                                "1"
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
                                "Rua Sem Saída"
                            ],
                            "referencia" : "",
                            "adjacentes" : [
                                "Rua Henrique João da Cruz"
                            ],
                            "observacoes" : ""
                        },
                        "Rua Guilherme Dalmas Nunes" : {
                            "cidade" : "Petrópolis",
                            "unidade" : "Boa Vista",
                            "microarea" : [
                                "1"
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
                                "Ponto de ônibus"
                            ],
                            "referencia" : "",
                            "adjacentes" : [
                                "Rua Ana Nery",
                                "Rua Machado Fagundes"
                            ],
                            "observacoes" : ""
                        },
                        "Rua Loio Gallucci" : {
                            "cidade" : "Petrópolis",
                            "unidade" : "Boa Vista",
                            "microarea" : [
                                "1"
                            ],
                            "agua_encanada" : true,
                            "luz_eletrica" : true,
                            "esgoto_encanado" : true,
                            "entulho" : true,
                            "lixo_na_rua" : true,
                            "animais_de_rua" : true,
                            "caracteristicas" : [
                                "Lixeira",
                                "Rua Sem Saída"
                            ],
                            "referencia" : "",
                            "adjacentes" : [
                                "Estrada do Cascatinha",
                                "Rua da Represa"
                            ],
                            "observacoes" : ""
                        },
                        "Servidão Pedro Lanzoni" : {
                            "cidade" : "Petrópolis",
                            "unidade" : "Boa Vista",
                            "microarea" : [
                                "5"
                            ],
                            "agua_encanada" : true,
                            "luz_eletrica" : true,
                            "esgoto_encanado" : false,
                            "entulho" : true,
                            "lixo_na_rua" : false,
                            "animais_de_rua" : false,
                            "caracteristicas" : [
                                "Rua Sem Saída"
                            ],
                            "referencia" : "",
                            "adjacentes" : [
                                "Rua Silvio Pimentel França",
                                "Servidão Vicente de Oliveira"
                            ],
                            "observacoes" : "Esgoto exposto"
                        },
                        "Servidão Daniel Balbino" : {
                            "cidade" : "Petrópolis",
                            "unidade" : "Boa Vista",
                            "microarea" : [
                                "5"
                            ],
                            "agua_encanada" : true,
                            "luz_eletrica" : true,
                            "esgoto_encanado" : true,
                            "entulho" : true,
                            "lixo_na_rua" : true,
                            "animais_de_rua" : false,
                            "caracteristicas" : [
                                "Rua Sem Saída"
                            ],
                            "referencia" : "",
                            "adjacentes" : [
                                "Rua Luiz Pelegrini",
                                "Rua Silvio Pimentel França"
                            ],
                            "observacoes" : ""
                        }
                    }
                }
            }
        }
    }
}
