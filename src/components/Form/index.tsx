/* eslint-disable prettier/prettier */
import React, {FC, useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Pacient} from '../../../App';
import {formatDate} from '../../helpers/formatDate';

export type FormProps = {
  isModalOpen: boolean;
  handleViewPacient: () => void;
  handleOpenModal: () => void;
  cleanPacientToEdit: () => void;
  handlePacients: ({
    newPacient,
    action,
  }: {
    newPacient: Pacient;
    action: 'create' | 'Edit';
  }) => void;
  pacientToEdit?: Pacient;
  isViewPacient: boolean;
};

const Form: FC<FormProps> = ({
  isModalOpen,
  handleOpenModal,
  handleViewPacient,
  cleanPacientToEdit,
  handlePacients,
  pacientToEdit,
  isViewPacient,
}) => {
  const [idPacient, seTidPacient] = useState('');
  const [pacient, setPacient] = useState('');
  const [owner, setOwner] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(new Date());
  const [symptoms, setSymptoms] = useState('');

  const handleAppointment = () => {
    if ([pacient, owner, email, date, symptoms].includes('')) {
      Alert.alert('Error', 'All fields are required', [
        {text: 'Cancelar'},
        {text: 'OK'},
      ]);
      return;
    }

    const newPacient: Pacient = {
      id: idPacient !== '' ? idPacient : Date.now().toString(),
      pacient,
      owner,
      email,
      date,
      phone,
      symptoms,
    };

    handlePacients({newPacient, action: idPacient !== '' ? 'Edit' : 'create'});
    cleanState();
  };

  const cleanState = () => {
    seTidPacient('');
    setPacient('');
    setOwner('');
    setEmail('');
    setDate(new Date());
    setPhone('');
    setSymptoms('');
    cleanPacientToEdit();
    isViewPacient ? handleViewPacient() : handleOpenModal();
  };

  const handlePacientToEdit = ({pacientEdit}: {pacientEdit: Pacient}) => {
    seTidPacient(pacientEdit.id);
    setPacient(pacientEdit.pacient);
    setOwner(pacientEdit.owner);
    setEmail(pacientEdit.email);
    setDate(pacientEdit.date);
    setPhone(pacientEdit.phone);
    setSymptoms(pacientEdit.symptoms);
  };

  useEffect(() => {
    if (pacientToEdit && Object.keys(pacientToEdit).length > 0) {
      handlePacientToEdit({pacientEdit: pacientToEdit});
    }
  }, [pacientToEdit, isViewPacient, isModalOpen]);

  return (
    <Modal animationType="slide" visible={isModalOpen}>
      <SafeAreaView style={isViewPacient ? styles.viewContent : styles.content}>
        <ScrollView>
          <Text style={styles.title}>
            {isViewPacient ? 'View' : idPacient !== '' ? 'Edit' : 'New'} {''}
            <Text style={styles.titlebold}>Appointment</Text>
          </Text>

          <Pressable
            style={[
              isViewPacient ? styles.viewBtn : styles.btn,
              styles.btnCancel,
            ]}
            onLongPress={cleanState}>
            <Text style={styles.btnCancelText}>Back</Text>
          </Pressable>
          {isViewPacient ? (
            <View style={styles.viewContentInfo}>
              <Text style={styles.viewLabel}>Name</Text>
              <Text style={styles.viewLabelData}>{pacient}</Text>
              <Text style={styles.viewLabel}>Owner</Text>
              <Text style={styles.viewLabelData}>{owner}</Text>
              <Text style={styles.viewLabel}>Email</Text>
              <Text style={styles.viewLabelData}>{email}</Text>
              <Text style={styles.viewLabel}>Phone</Text>
              <Text style={styles.viewLabelData}>{phone}</Text>
              <Text style={styles.viewLabel}>Discharge date</Text>
              <Text style={styles.viewLabelData}>
                {formatDate({dateValue: date})}
              </Text>
              <Text style={styles.viewLabel}>Symptoms</Text>
              <Text style={styles.viewLabelData}>{symptoms}</Text>
            </View>
          ) : (
            <>
              <View style={styles.field}>
                <Text style={styles.label}>Name of Pacient</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Name of Paciente"
                  placeholderTextColor={'#666'}
                  value={pacient}
                  onChangeText={setPacient}
                />
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Name of Owner</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Name of Owner"
                  placeholderTextColor={'#666'}
                  value={owner}
                  onChangeText={setOwner}
                />
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Email of Owner</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Email of Owner"
                  placeholderTextColor={'#666'}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Discharge date</Text>
                <View style={styles.dateContainer}>
                  <DatePicker
                    date={date}
                    onDateChange={newDate => setDate(newDate)}
                  />
                </View>
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Phone of Owner</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Phone of Owner"
                  placeholderTextColor={'#666'}
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                  maxLength={10}
                />
              </View>

              <View style={[styles.field, styles.symptomsInput]}>
                <Text style={styles.label}>Symptoms</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Symptoms"
                  placeholderTextColor={'#666'}
                  value={symptoms}
                  onChangeText={setSymptoms}
                  multiline={true}
                  numberOfLines={4}
                />
              </View>

              <Pressable
                style={styles.btnNewAppointment}
                onPress={handleAppointment}>
                <Text style={styles.btnNewAppointmentText}>
                  {idPacient !== '' ? 'Edit Pacient' : 'Add Pacient'}
                </Text>
              </Pressable>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  viewContentInfo: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    margin: 30,
  },
  btnNewAppointment: {
    marginVertical: 50,
    backgroundColor: '#F59E0B',
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  btnNewAppointmentText: {
    color: '#5827A4',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  btn: {
    backgroundColor: '#5827A4',
  },
  viewBtn: {
    backgroundColor: '#ff4400',
  },
  btnCancel: {
    marginVertical: 30,
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  btnCancelText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  content: {
    backgroundColor: '#6D28D9',
    flex: 1,
  },
  viewContent: {
    backgroundColor: '#FF8000',
    flex: 1,
  },
  field: {
    marginTop: 10,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  label: {
    color: '#FFF',
    marginBottom: 10,
    fontSize: 20,
    fontWeight: '600',
  },
  viewLabel: {
    color: '#000',
    marginBottom: 10,
    fontSize: 20,
    fontWeight: '600',
  },
  viewLabelData: {
    color: '#000',
    marginBottom: 10,
    fontSize: 24,
    fontWeight: '900',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
  },
  symptomsInput: {
    height: 100,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    color: '#FFF',
  },
  titlebold: {
    fontWeight: '900',
  },
  dateContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
});
export default Form;
