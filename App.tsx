import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Alert,
} from 'react-native';
import Form from './src/components/Form';
import PacientComponent from './src/components/PacientComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Pacient = {
  id: string;
  pacient: string;
  owner: string;
  email: string;
  date: Date;
  phone: string;
  symptoms: string;
};

const App = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewPacient, setIsViewPacient] = useState(false);
  const [pacients, setPacients] = useState<Pacient[]>([]);
  const [pacientToEdit, setPacientToEdit] = useState<Pacient>();

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleViewPacient = () => {
    setIsViewPacient(!isViewPacient);
    handleOpenModal();
  };

  const cleanPacientToEdit = () => {
    setPacientToEdit(undefined);
  };

  const deletePacient = ({id}: {id: string}) => {
    const newPacients = pacients.filter(pacient => pacient.id !== id);
    setPacients(newPacients);
    Alert.alert('Pacient has been deleted', '', [{text: 'Ok'}]);
  };

  const saveAppointments = async ({
    appointments,
  }: {
    appointments: Pacient[];
  }) => {
    try {
      await AsyncStorage.setItem('appointments', JSON.stringify(appointments));
    } catch (error) {
      console.log(error);
    }
  };

  const getAppointmentsFromStorage = async () => {
    try {
      const resp = await AsyncStorage.getItem('appointments');
      if (resp) {
        setPacients(JSON.parse(resp));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePacients = ({
    newPacient,
    action,
  }: {
    newPacient: Pacient;
    action: 'create' | 'Edit' | 'view';
  }) => {
    switch (action) {
      case 'create':
        setPacients(prevPacients => [...prevPacients, newPacient]);
        Alert.alert('Pacient has been created', '', [{text: 'Ok'}]);
        break;
      case 'Edit':
        const newPacientList = pacients.map(pacient =>
          pacient.id === newPacient.id ? newPacient : pacient,
        );
        setPacients(newPacientList);
        Alert.alert('Pacient has been edited', '', [{text: 'Ok'}]);
        break;

      default:
        break;
    }
  };

  const handlePacient = ({
    id,
    action,
  }: {
    id: string;
    action: 'edit' | 'delete' | 'view';
  }) => {
    switch (action) {
      case 'edit':
        const pacientEdited = pacients.filter(pacient => pacient.id === id);
        setPacientToEdit(pacientEdited[0]);
        handleOpenModal();
        break;
      case 'view':
        const pacientView = pacients.filter(pacient => pacient.id === id);
        setPacientToEdit(pacientView[0]);
        break;
      case 'delete':
        Alert.alert(
          '¿Do you want to delete this pacient?',
          'This action is permanent',
          [
            {text: 'Back'},
            {
              text: 'Accept',
              onPress: () => deletePacient({id}),
            },
          ],
        );
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    getAppointmentsFromStorage();
  }, []);

  useEffect(() => {
    saveAppointments({appointments: pacients});
  }, [pacients]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Appointments administrator {''}
        <Text style={styles.titleBold}>Veterinary</Text>
      </Text>
      <Pressable
        style={styles.btnNewAppointmentPressable}
        onPress={handleOpenModal}>
        <Text style={styles.btnNewAppointmentPressableText}>
          New Appointment
        </Text>
      </Pressable>

      {pacients.length === 0 ? (
        <Text style={styles.notPacients}>No hay pacientes aún</Text>
      ) : (
        <FlatList
          style={styles.list}
          data={pacients}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <PacientComponent
              item={item}
              handlePacient={handlePacient}
              handleViewPacient={handleViewPacient}
            />
          )}
        />
      )}
      <Form
        isModalOpen={isModalOpen}
        handleOpenModal={handleOpenModal}
        handlePacients={handlePacients}
        handleViewPacient={handleViewPacient}
        pacientToEdit={pacientToEdit}
        isViewPacient={isViewPacient}
        cleanPacientToEdit={cleanPacientToEdit}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 30,
    marginHorizontal: 30,
  },
  container: {
    backgroundColor: '#F3F4F6',
    flex: 1,
  },
  title: {
    textAlign: 'center',
    color: '#374151',
    fontSize: 30,
    fontWeight: 'normal',
  },
  titleBold: {
    fontWeight: '900',
    color: '#6D28D9',
  },
  btnNewAppointmentPressable: {
    backgroundColor: '#6D28D9',
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  btnNewAppointmentPressableText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 20,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  notPacients: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
});

export default App;
