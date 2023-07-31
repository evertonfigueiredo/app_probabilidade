from random import randint

def calcular_probabilidade(jogos_anteriores):
    vitorias_time_Maca = jogos_anteriores.count('Maca')
    vitorias_time_Tomate = jogos_anteriores.count('Tomate')
    empates = jogos_anteriores.count('Uva')

    total_jogos = len(jogos_anteriores) + 2  # Somamos 2 para incluir os pesos dos empates e times A e B.

    probabilidade_time_Maca = (vitorias_time_Maca + 0.495) / total_jogos
    probabilidade_time_Tomate = (vitorias_time_Tomate + 0.495) / total_jogos
    probabilidade_Uva = (empates + 0.01) / total_jogos

    return probabilidade_time_Maca * 100, probabilidade_time_Tomate * 100, probabilidade_Uva * 100

def prever_resultado(probabilidade_time_Maca, probabilidade_time_Tomate, probabilidade_Uva):
    resultado = randint(1, 100)

    if resultado <= probabilidade_time_Maca * 100:
        return 'Time Maca', probabilidade_time_Maca
    elif resultado <= (probabilidade_time_Maca + probabilidade_time_Tomate) * 100:
        return 'Time Tomate', probabilidade_time_Tomate
    else:
        return 'Uva', probabilidade_Uva

# Exemplo de uso
jogos_anteriores = ['Maca', 'Tomate', 'Maca', 'Uva', 'Maca', 'Tomate', 'Tomate', 'Uva', 'Maca', 'Maca']
prob_time_Maca, prob_time_Tomate, prob_Uva = calcular_probabilidade(jogos_anteriores)
resultado_11_jogo, probabilidade = prever_resultado(prob_time_Maca, prob_time_Tomate, prob_Uva)

print(f"Probabilidade da Maça ganhar: {prob_time_Maca:.4f}%")
print(f"Probabilidade da Tomate ganhar: {prob_time_Tomate:.4f}%")
print(f"Probabilidade da Uva: {prob_Uva:.4f}%")
print(f"Previsão para o 11º jogo: O time vencedor será '{resultado_11_jogo}' com probabilidade de {probabilidade:.4f}%")
