/* eslint-disable prettier/prettier */
import React, {FC} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Pacient} from '../../../App';
import { formatDate } from '../../helpers/formatDate';

export type PacientComponentProps = {
  item: Pacient;
  handlePacient: ({
    id,
    action,
  }: {
    id: string;
    action: 'edit' | 'delete' | 'view';
  }) => void;
  handleViewPacient: () => void;
};

const PacientComponent: FC<PacientComponentProps> = ({
  item,
  handlePacient,
  handleViewPacient,
}) => {
  const {pacient, date, id} = item;

  const openViewPacient = () =>{
    handlePacient({id, action: 'view'});
    handleViewPacient();
  };

  return (
    <View style={styles.container}>
      <Pressable onLongPress={openViewPacient}>
      <Text style={styles.label}>Pacient:</Text>
      <Text style={styles.text}>{pacient}</Text>
      <Text style={styles.styledDate}>{formatDate({dateValue: date})}</Text>

      <View style={styles.btnContainer}>
        <Pressable
          style={[styles.btn, styles.btnEdit]}
          onLongPress={() => handlePacient({id, action: 'edit'})}>
          <Text style={styles.btnText}>Edit</Text>
        </Pressable>
        <Pressable
          style={[styles.btn, styles.btnDelete]}
          onLongPress={() => handlePacient({id, action: 'delete'})}>
          <Text style={styles.btnText}>Delete</Text>
        </Pressable>
      </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  btnEdit: {
    backgroundColor: '#F59E0B',
  },
  btnText: {
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 12,
    color: '#FFF',
  },
  btnDelete: {
    backgroundColor: '#EF4444',
  },
  container: {
    backgroundColor: '#FFF',
    padding: 20,
    borderBottomColor: '#94A3B8',
    borderBottomWidth: 1,
  },
  label: {
    color: '#374151',
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: 10,
  },
  text: {
    color: '#6D28D9',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
  },
  styledDate: {
    color: '#374151',
  },
});

export default PacientComponent;
