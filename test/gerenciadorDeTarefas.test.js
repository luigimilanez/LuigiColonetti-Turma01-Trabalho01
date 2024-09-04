const GerenciadorDeTarefas = require('../src/gerenciadorDeTarefas');

describe('Testando todos os métodos restantes do GerenciadorDeTarefas', () => {
    let gerenciador;

    beforeEach(() => {
        gerenciador = new GerenciadorDeTarefas();
    });

    test('Listando todas as tarefas', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa 1' };
        const tarefa2 = { id: 2, descricao: 'Tarefa 2' };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.listarTarefas()).toEqual([tarefa1, tarefa2]);
    });

    test('Listando todas as tarefas pendentes', () => {
        const tarefa1 = { id: 3, descricao: 'Tarefa pendente', concluida: false };
        const tarefa2 = { id: 4, descricao: 'Tarefa concluída', concluida: true };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.listarTarefasPendentes()).toEqual([tarefa1]);
    });

    test('Listando as tarefas de certa prioridade', () => {
        const tarefa1 = { id: 5, descricao: 'Tarefa 1', prioridade: 1 };
        const tarefa2 = { id: 6, descricao: 'Tarefa 2', prioridade: 2 };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.listarTarefasPorPrioridade(1)).toEqual([tarefa1]);
    });

    test('Listando as tarefas por tag', () => {
        const tarefa1 = { id: 7, descricao: 'Tarefa 1', tags: ['Urgente'] };
        const tarefa2 = { id: 8, descricao: 'Tarefa 2', tags: ['Importante'] };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.listarTarefasPorTag('Urgente')).toEqual([tarefa1]);
    });

    test('Ordenando as tarefas por data', () => {
        const tarefa1 = { id: 9, descricao: 'Tarefa antiga', data: '2023-07-01' };
        const tarefa2 = { id: 10, descricao: 'Tarefa recente', data: '2023-09-01' };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.ordenarTarefasPorData();
        expect(gerenciador.listarTarefas()).toEqual([tarefa1, tarefa2]);
    });

    test('Ordenando as tarefas pela prioridade corretamente', () => {
        const tarefa1 = { id: 11, descricao: 'Tarefa de baixa prioridade', prioridade: 3 };
        const tarefa2 = { id: 12, descricao: 'Tarefa de alta prioridade', prioridade: 1 };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.ordenarTarefasPorPrioridade();
        expect(gerenciador.listarTarefas()).toEqual([tarefa2, tarefa1]);
    });
    
    test('Buscando tarefas por data', () => {
        const tarefa1 = { id: 13, descricao: 'Tarefa em agosto', data: '2023-08-15' };
        const tarefa2 = { id: 14, descricao: 'Tarefa em setembro', data: '2023-09-10' };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.buscarTarefasPorData('2023-08-15')).toEqual([tarefa1]);
    });

    test('Contando as tarefas por prioridade', () => {
        const tarefa1 = { id: 15, descricao: 'Tarefa de prioridade 1', prioridade: 1 };
        const tarefa2 = { id: 16, descricao: 'Tarefa de prioridade 2', prioridade: 2 };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.contarTarefasPorPrioridade(1)).toBe(1);
        expect(gerenciador.contarTarefasPorPrioridade(2)).toBe(1);
    });

    test('Adicionando uma tag numa tarefa', () => {
        const tarefa = { id: 17, descricao: 'novaTarefa' };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.adicionarTagATarefa(17, 'Xablau');
        expect(gerenciador.buscarTarefaPorId(17).tags).toContain('Xablau');
    });

    test('Removendo uma tarefa pelo ID', () => {
        const tarefa = { id: 18, descricao: 'Tarefa a ser removida' };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.removerTarefa(18);
        expect(gerenciador.buscarTarefaPorId(18)).toBeUndefined();
    });

    test('Removendo todas as tarefas concluídas', () => {
        const tarefa1 = { id: 19, descricao: 'Tarefa pendente', concluida: false };
        const tarefa2 = { id: 20, descricao: 'Tarefa concluída', concluida: true };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.removerTarefasConcluidas();
        expect(gerenciador.listarTarefas()).toEqual([tarefa1]);
    });
});