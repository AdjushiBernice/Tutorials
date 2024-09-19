import React from 'react'
import { Button, StyleSheet, View, ViewStyle } from 'react-native'

interface ButtonComponentProps {
    title: string;
    onPress: () => void;
    color: string;
    style?: ViewStyle;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({title,onPress, color='blue', style}) => (
    <View style={[styles.button, style]}>
        <Button
        title={title}
        onPress={onPress}
        color={color}
         />
    </View>
)
const styles = StyleSheet.create({
    button: {
        margin: 0,
    }
})

export default ButtonComponent