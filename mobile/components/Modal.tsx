import React from 'react';
import { View, Text, Modal, Button } from 'react-native';
import tw from 'twrnc';

export default function CustomModal({ visible, onClose, children }: {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <Modal visible={visible} transparent>
      <View style={tw`flex-1 justify-center items-center bg-black/50`}>
        <View style={tw`bg-white p-4 rounded-lg w-80`}>
          {children}
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}