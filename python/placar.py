def calcular_probabilidade(placares_jogos):
    vitorias_time_A = 0
    vitorias_time_B = 0
    empates = 0

    for placar in placares_jogos:
        if placar[0] > placar[1]:
            vitorias_time_A += 1
        elif placar[0] < placar[1]:
            vitorias_time_B += 1
        else:
            empates += 1

    total_jogos = len(placares_jogos) + 2  # Somamos 2 para incluir os pesos dos empates e times A e B.

    probabilidade_time_A = (vitorias_time_A + 0.495) / total_jogos
    probabilidade_time_B = (vitorias_time_B + 0.495) / total_jogos
    probabilidade_empate = (empates + 0.01) / total_jogos

    return probabilidade_time_A * 100, probabilidade_time_B * 100, probabilidade_empate * 100

# Exemplo de uso
placares_jogos = [[2, 1], [0, 0], [1, 1], [1, 0], [3, 2], [2, 2], [0, 1], [1, 2], [2, 0], [0, 2]]
prob_time_A, prob_time_B, prob_empate = calcular_probabilidade(placares_jogos)

print(f"Probabilidade do Time A vencer: {prob_time_A:.2f}%")
print(f"Probabilidade do Time B vencer: {prob_time_B:.2f}%")
print(f"Probabilidade de empate: {prob_empate:.2f}%")

