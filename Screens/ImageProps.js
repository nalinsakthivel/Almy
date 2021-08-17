import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import ImageCropper from 'react-native-advance-image-cropper';
import { useRoute } from '@react-navigation/native';
const ImageProps = () => {
    const [image, setImage] = useState()
    const route = useRoute();
    const navigation = useNavigation()
    const { photo, setPhoto } = route.params;
    console.log(`photo`, photo)
    const onDone = ({ uri }) => {

        setPhoto(uri)
        navigation.goBack()
    }
    const onCancel = () => {

    }
    return (

        <ImageCropper
            onDone={onDone}
            onCancel={onCancel}
            imageUri={photo}
            imageWidth={1600}
            imageHeight={2396}
            NOT_SELECTED_AREA_OPACITY={0.3}
            BORDER_WIDTH={20}
        />

    )
}

export default ImageProps

const styles = StyleSheet.create({})
