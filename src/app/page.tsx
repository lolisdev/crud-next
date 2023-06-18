'use client'

import Tabela from '@/components/Tabela'
import Layout from '../components/Layout'
import Botao from '../components/Botao'
import Cliente from '@/core/Cliente'
import Formulario from '../components/Formulario'
import { useEffect, useState } from 'react'

export default function Home() {
  
  let [clientes, setClientes] = useState<Cliente[]>([])
  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())
  const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')

  useEffect(obterTodos, [])

  function obterTodos() {
      setClientes(clientes)
      setVisivel('tabela')
  }

  function novoCliente(cliente: Cliente) {
    setCliente(Cliente.vazio())
    setVisivel('form')
  }

  function clienteSelecionado(cliente: Cliente) {
    setCliente(cliente)
    setVisivel('form')
  }

  function clienteExcluido(cliente: Cliente) {
    setClientes(clientes = clientes.filter(clienteArr => clienteArr.nome !== cliente.nome))
    obterTodos()
  }

  function salvarCliente(cliente: Cliente) {
    clientes.push(cliente)
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
