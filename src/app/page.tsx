'use client'

import Tabela from '@/components/Tabela'
import Layout from '../components/Layout'
import Botao from '../components/Botao'
import Cliente from '@/core/Cliente'
import Formulario from '../components/Formulario'
import { useEffect, useState } from 'react'
import ClienteRepositorio from '@/core/ClienteRepositorio'
import ColecaoCliente from '@/backend/db/ColecaoCliente'

export default function Home() {

  const repo: ClienteRepositorio = new ColecaoCliente()

  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')

  useEffect(obterTodos, [])

  function obterTodos() {
    repo.obterTodos().then((clientes) => {
      setClientes(clientes)
      setVisivel('tabela')
    })
  }

  function novoCliente(cliente: Cliente) {
    setCliente(Cliente.vazio())
    setVisivel('form')
  }

  function clienteSelecionado(cliente: Cliente) {
    setCliente(cliente)
    setVisivel('form')
  }

  async function clienteExcluido(cliente: Cliente) {
    await repo.excluir(cliente)
    obterTodos()
  }

  async function salvarCliente(cliente: Cliente) {
    await repo.salvar(cliente)
    obterTodos()
  }

  return (
    <div className={`flex justify-center items-center h-screen
    bg-gradient-to-r from-blue-500 to-purple-500
    text-white w-fit md:w-full`}>

      <Layout titulo='Cadastro Simples'>
        {visivel === 'tabela' ?
          (
            <>
              <div className='flex justify-end'>
                <Botao
                  cor='blue'
                  className="mb-4"
                  onClick={novoCliente}> Novo Cliente</Botao>
              </div>
              <Tabela clientes={clientes}
                clienteSelecionado={clienteSelecionado}
                clienteExcluido={clienteExcluido}
              ></Tabela>
            </>
          ) :
          (
            <Formulario
              cliente={cliente}
              clienteMudou={salvarCliente}
              cancelado={() => setVisivel('tabela')} />
          )}
      </Layout>

    </div>
  )
}
