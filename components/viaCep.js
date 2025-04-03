import { useState } from 'react';
import { Text, ScrollView, Button, View, ActivityIndicator } from 'react-native';
import { List, TextInput } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { css } from './css/style';
import CustomModal from './modal';

export default function ViaCep() {
  const [cep, setCep] = useState('');
  const [dados, setDados] = useState({});
  const [selectedValue, setSelectedValue] = useState(null);
  const [isVisible, setVisible] = useState(false);
  const [message, setMessage] = useState('');  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
  const [cadastro, setCadastro] = useState(null); // Estado para armazenar os dados cadastrados

  const buscaCep = (arg) => {
    setIsLoading(true); // Inicia o loading

    let url = `https://viacep.com.br/ws/${arg}/json/`;

    fetch(url)
      .then((response) => response.json())
      .then((xjson) => {
        setDados(xjson);
        setSelectedValue(xjson.uf);
      })
      .catch(() => {
        setMessage('Ocorreu um erro ao buscar o CEP.');
        setVisible(true);
        setDados({});
      })
      .finally(() => {
        setIsLoading(false); // Finaliza o loading
      });
  };

  const handleSubmit = () => {
    if (!dados.logradouro || !dados.bairro || !dados.localidade || !dados.uf || !nome || !email) {
      setMessage('Preencha todos os campos!');
      setVisible(true);
    } else {
      setCadastro({ 
        nome, 
        email, 
        cep, 
        logradouro: dados.logradouro, 
        bairro: dados.bairro, 
        cidade: dados.localidade, 
        estado: dados.uf 
      });
  
      setMessage('Cadastrado com sucesso!');
      setVisible(true);
    }
  };

  return (
    <View style={css.container}>
      <CustomModal visible={isVisible} message={message} onClose={() => setVisible(false)} />

      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>

      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
  Preencha seus dados para cadastro:
</Text>

        <TextInput
          placeholder="Nome"
          style={css.textInput}
          onChangeText={setNome}
        />

        <TextInput
          placeholder="Email"
          style={css.textInput}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Digite o CEP"
          onChangeText={setCep}
          onEndEditing={() => buscaCep(cep)}
          style={css.textInput}
        />

        {isLoading ? (
          <ActivityIndicator size="large" color="#6200EE" style={{ marginVertical: 20 }} />
        ) : (
          <>            
            <TextInput label="Logradouro" value={dados.logradouro || ''} style={css.textInput} editable={false} />
            <TextInput label="Bairro" value={dados.bairro || ''} style={css.textInput} editable={false} />
            <TextInput label="Cidade" value={dados.localidade || ''} style={css.textInput} editable={false} />
            <TextInput label="Estado" value={dados.estado || ''} style={css.textInput} editable={false} />
          </>
        )}
        

        <Button title="Cadastrar" onPress={handleSubmit} />

        {/* Exibe os dados cadastrados */}
        {cadastro && (
          <View style={{ marginTop: 20, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 5 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Dados cadastrados:</Text>
            <Text>Nome: {cadastro.nome}</Text>
            <Text>Email: {cadastro.email}</Text>
            <Text>CEP: {cadastro.cep}</Text>
            <Text>Logradouro: {cadastro.logradouro}</Text>
            <Text>Bairro: {cadastro.bairro}</Text>
            <Text>Cidade: {cadastro.cidade}</Text>
            <Text>Estado: {cadastro.estado}</Text>
          </View>
        )}

        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}
