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
				"Rua Valentim Osório da Silva",
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
				"Servidão Daniel Balbino",
				"Rua Silvio Pimenta França",
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
				"Servidão Pedro Lansoni",
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
				"Rua Pedro Lansoni",
			],
			"observacoes" : "",
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
				"Rua Caminho do Ladeiro",
			],
			"observacoes" : "",
		},
		"Rua Boa Vista" : {
			"microarea" : [
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
				"",
			],
			"referencia" : "",
			"adjacentes" : [
				"Rua Henrique João da Cruz",
			],
			"observacoes" : "Parte usa o nome Servidão Cornélio de Azevedo Ramos, possui 4 bares.",
		},
		"Rua Henrique João da Cruz" : {
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
				"Lixeira",
				"Pequenos comércios",
				"Ponto de ônibus",
			],
			"referencia" : "Localização do Posto de Saúde da Família, dispensa de carros batidos.",
			"adjacentes" : [
				"Rua Boa Vista",
				"Servidão José Cândido da Silva Maripá",
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
				"",
			],
			"referencia" : "",
			"adjacentes" : [
				"Rua Henrique João da Cruz",
				"Rua Valentim Osório da Silva",
			],
			"observacoes" : "Nenhuma Casa, só passagem.",
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
				"Rua Valentim Osório da Silva",
			],
			"observacoes" : "",
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
				"",
			],
			"referencia" : "",
			"adjacentes" : [
				"Estrada do Cascatinha",
				"Rua Valentim Osório da Silva",
			],
			"observacoes" : "",
		},
		"Rua Valentim Osório da Silva" : {
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
				"Rua Cândido Borsato",
				"Rua da Repreza",
			],
			"observacoes" : "2 confecções de roupa",
		},
    }
}